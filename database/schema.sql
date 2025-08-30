-- Database Schema for Akuatiq Thrift Store App
-- This schema includes tables for stores, clothing articles, and images

-- Enable UUID extension for PostgreSQL (if using PostgreSQL)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Stores table
CREATE TABLE stores (
    id BIGINT PRIMARY KEY AUTO_INCREMENT, -- or UUID PRIMARY KEY DEFAULT uuid_generate_v4() for PostgreSQL
    business_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    store_count INT NOT NULL DEFAULT 1,
    items_per_year INT NOT NULL DEFAULT 0,
    hours_of_operation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_business_name (business_name)
);

-- Clothing articles table
CREATE TABLE clothing_articles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT, -- or UUID PRIMARY KEY DEFAULT uuid_generate_v4() for PostgreSQL
    store_id BIGINT NOT NULL, -- or UUID for PostgreSQL
    brand_name VARCHAR(255) NOT NULL,
    size VARCHAR(50) NOT NULL,
    color VARCHAR(100) NOT NULL,
    condition ENUM('New', 'Like New', 'Good', 'Fair', 'Poor') NOT NULL DEFAULT 'Good',
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    
    -- Indexes for performance
    INDEX idx_store_id (store_id),
    INDEX idx_brand_name (brand_name),
    INDEX idx_condition (condition),
    INDEX idx_price (price),
    INDEX idx_created_at (created_at)
);

-- Images table (separate table for better normalization)
CREATE TABLE clothing_images (
    id BIGINT PRIMARY KEY AUTO_INCREMENT, -- or UUID PRIMARY KEY DEFAULT uuid_generate_v4() for PostgreSQL
    clothing_article_id BIGINT NOT NULL, -- or UUID for PostgreSQL
    image_url VARCHAR(500) NOT NULL,
    image_order INT NOT NULL DEFAULT 1, -- To maintain order of images
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    FOREIGN KEY (clothing_article_id) REFERENCES clothing_articles(id) ON DELETE CASCADE,
    
    -- Ensure image_order is between 1 and 3
    CHECK (image_order >= 1 AND image_order <= 3),
    
    -- Indexes
    INDEX idx_clothing_article_id (clothing_article_id),
    INDEX idx_image_order (image_order)
);

-- Trigger to ensure each clothing article has at least 1 and at most 3 images
DELIMITER $$

-- Trigger before insert to check image count
CREATE TRIGGER before_clothing_article_insert
BEFORE INSERT ON clothing_articles
FOR EACH ROW
BEGIN
    -- This will be enforced by the application layer
    -- as we can't check related table constraints in this trigger
END$$

-- Trigger after delete to clean up orphaned images
CREATE TRIGGER after_clothing_article_delete
AFTER DELETE ON clothing_articles
FOR EACH ROW
BEGIN
    DELETE FROM clothing_images WHERE clothing_article_id = OLD.id;
END$$

DELIMITER ;

-- Insert sample data for testing
INSERT INTO stores (business_name, email, phone, address, store_count, items_per_year, hours_of_operation) VALUES
('Vintage Vault', 'vintage@example.com', '(555) 123-4567', '123 Main St, Downtown, CA 90210', 1, 1000, 'Mon-Fri 9AM-6PM, Sat 10AM-4PM'),
('Retro Revival', 'retro@example.com', '(555) 987-6543', '456 Oak Ave, Westside, CA 90211', 2, 1500, 'Mon-Sat 10AM-8PM'),
('Thrift & Thrive', 'thrift@example.com', '(555) 456-7890', '789 Pine St, Eastside, CA 90212', 1, 800, 'Tue-Sun 11AM-7PM');

-- Insert sample clothing articles
INSERT INTO clothing_articles (store_id, brand_name, size, color, condition, price, description) VALUES
(1, 'Levi\'s', 'M', 'Blue', 'Good', 24.99, 'Classic blue jeans in good condition'),
(1, 'Ralph Lauren', 'L', 'White', 'Very Good', 18.99, 'Oxford button-down shirt'),
(2, 'Nike', '10', 'Black', 'Excellent', 32.99, 'Running sneakers like new'),
(2, 'Free People', 'M', 'Floral', 'Good', 28.99, 'Summer dress with floral pattern'),
(3, 'Stetson', 'One Size', 'Brown', 'Fair', 15.99, 'Vintage fedora hat');

-- Insert sample images
INSERT INTO clothing_images (clothing_article_id, image_url, image_order) VALUES
(1, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop', 1),
(2, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop', 1),
(3, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop', 1),
(4, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop', 1),
(5, 'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=300&h=400&fit=crop', 1);

-- View to get clothing articles with their images
CREATE VIEW clothing_with_images AS
SELECT 
    ca.id,
    ca.store_id,
    s.business_name as store_name,
    ca.brand_name,
    ca.size,
    ca.color,
    ca.condition,
    ca.price,
    ca.description,
    ca.created_at,
    ca.updated_at,
    GROUP_CONCAT(ci.image_url ORDER BY ci.image_order SEPARATOR '|') as image_urls,
    COUNT(ci.id) as image_count
FROM clothing_articles ca
JOIN stores s ON ca.store_id = s.id
LEFT JOIN clothing_images ci ON ca.id = ci.clothing_article_id
GROUP BY ca.id;

-- Stored procedure to add a new clothing article with validation
DELIMITER $$

CREATE PROCEDURE AddClothingArticle(
    IN p_store_id BIGINT,
    IN p_brand_name VARCHAR(255),
    IN p_size VARCHAR(50),
    IN p_color VARCHAR(100),
    IN p_condition ENUM('New', 'Like New', 'Good', 'Fair', 'Poor'),
    IN p_price DECIMAL(10,2),
    IN p_description TEXT,
    IN p_image_urls TEXT -- Pipe-separated URLs
)
BEGIN
    DECLARE v_article_id BIGINT;
    DECLARE v_image_count INT;
    DECLARE v_image_url VARCHAR(500);
    DECLARE v_image_order INT DEFAULT 1;
    DECLARE v_delimiter_pos INT;
    
    -- Validate store exists
    IF NOT EXISTS (SELECT 1 FROM stores WHERE id = p_store_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Store does not exist';
    END IF;
    
    -- Validate price
    IF p_price <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Price must be greater than 0';
    END IF;
    
    -- Count images
    SET v_image_count = (LENGTH(p_image_urls) - LENGTH(REPLACE(p_image_urls, '|', '')) + 1);
    
    -- Validate image count
    IF v_image_count < 1 OR v_image_count > 3 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Must have between 1 and 3 images';
    END IF;
    
    -- Insert clothing article
    INSERT INTO clothing_articles (store_id, brand_name, size, color, condition, price, description)
    VALUES (p_store_id, p_brand_name, p_size, p_color, p_condition, p_price, p_description);
    
    SET v_article_id = LAST_INSERT_ID();
    
    -- Insert images
    WHILE v_image_order <= v_image_count DO
        SET v_delimiter_pos = LOCATE('|', p_image_urls);
        
        IF v_delimiter_pos > 0 THEN
            SET v_image_url = LEFT(p_image_urls, v_delimiter_pos - 1);
            SET p_image_urls = SUBSTRING(p_image_urls, v_delimiter_pos + 1);
        ELSE
            SET v_image_url = p_image_urls;
        END IF;
        
        INSERT INTO clothing_images (clothing_article_id, image_url, image_order)
        VALUES (v_article_id, v_image_url, v_image_order);
        
        SET v_image_order = v_image_order + 1;
    END WHILE;
    
    SELECT v_article_id as new_article_id;
END$$

DELIMITER ;
