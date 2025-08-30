# Akuatiq Database Schema & Models

This directory contains the complete database schema and ORM models for the Akuatiq thrift store application.

## 📋 Database Overview

The database is designed to handle clothing articles posted by thrift stores, with proper relationships, constraints, and validation.

### Core Tables

1. **`stores`** - Business/store information
2. **`clothing_articles`** - Individual clothing items
3. **`clothing_images`** - Image storage for clothing articles

## 🗄️ Database Schema

### Stores Table
```sql
CREATE TABLE stores (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    business_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    store_count INT NOT NULL DEFAULT 1,
    items_per_year INT NOT NULL DEFAULT 0,
    hours_of_operation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Clothing Articles Table
```sql
CREATE TABLE clothing_articles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    store_id BIGINT NOT NULL,
    brand_name VARCHAR(255) NOT NULL,
    size VARCHAR(50) NOT NULL,
    color VARCHAR(100) NOT NULL,
    condition ENUM('New', 'Like New', 'Good', 'Fair', 'Poor') NOT NULL DEFAULT 'Good',
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);
```

### Clothing Images Table
```sql
CREATE TABLE clothing_images (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    clothing_article_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clothing_article_id) REFERENCES clothing_articles(id) ON DELETE CASCADE,
    CHECK (image_order >= 1 AND image_order <= 3)
);
```

## 🔗 Relationships

- **Store** → **ClothingArticle** (One-to-Many)
- **ClothingArticle** → **ClothingImage** (One-to-Many)
- **Cascade Delete**: Deleting a store deletes all its clothing articles and images
- **Cascade Delete**: Deleting a clothing article deletes all its images

## ✅ Validation Rules

### Clothing Articles
- Must have at least 1 image, maximum 3 images
- Price must be greater than 0
- All required fields must be provided
- Store must exist before creating clothing article

### Images
- Image order must be between 1 and 3
- Image order must be unique per clothing article
- Image URLs must be valid HTTP/HTTPS URLs with image extensions

## 🚀 Getting Started

### 1. Database Setup

```bash
# Create database
CREATE DATABASE akuatiq_db;

# Run schema
mysql -u username -p akuatiq_db < schema.sql
```

### 2. Install Dependencies

```bash
npm install sequelize mysql2
# or
npm install sequelize pg pg-hstore  # for PostgreSQL
```

### 3. Configure Sequelize

```javascript
// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('akuatiq_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres'
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
```

### 4. Run Migrations

```bash
# Install Sequelize CLI
npm install -g sequelize-cli

# Run migrations
npx sequelize-cli db:migrate

# Undo migrations
npx sequelize-cli db:migrate:undo
```

## 📱 ORM Models

### Store Model
```javascript
const Store = require('./models/Store');
const store = await Store.create({
  businessName: 'Vintage Vault',
  email: 'vintage@example.com',
  phone: '(555) 123-4567',
  address: '123 Main St, Downtown, CA 90210',
  storeCount: 1,
  itemsPerYear: 1000
});
```

### Clothing Article Model
```javascript
const ClothingArticle = require('./models/ClothingArticle');
const clothingArticle = await ClothingArticle.create({
  storeId: 1,
  brandName: 'Levi\'s',
  size: 'M',
  color: 'Blue',
  condition: 'Good',
  price: 24.99,
  description: 'Classic blue jeans'
});
```

### Clothing Image Model
```javascript
const ClothingImage = require('./models/ClothingImage');
const image = await ClothingImage.create({
  clothingArticleId: 1,
  imageUrl: 'https://example.com/image.jpg',
  imageOrder: 1
});
```

## 🛠️ Service Layer

The `ClothingArticleService` provides high-level operations:

```javascript
const ClothingArticleService = require('./services/ClothingArticleService');

// Create clothing article with images
const article = await ClothingArticleService.createClothingArticle(
  {
    storeId: 1,
    brandName: 'Nike',
    size: '10',
    color: 'Black',
    condition: 'Excellent',
    price: 32.99
  },
  [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
  ]
);

// Get articles with filtering
const articles = await ClothingArticleService.getClothingArticles({
  storeId: 1,
  condition: 'Good',
  minPrice: 10,
  maxPrice: 50
}, 1, 20);

// Get statistics
const stats = await ClothingArticleService.getClothingArticleStats(1);
```

## 🔍 Query Examples

### Get All Clothing Articles with Images
```sql
SELECT 
    ca.*,
    s.business_name,
    GROUP_CONCAT(ci.image_url ORDER BY ci.image_order SEPARATOR '|') as images
FROM clothing_articles ca
JOIN stores s ON ca.store_id = s.id
LEFT JOIN clothing_images ci ON ca.id = ci.clothing_article_id
GROUP BY ca.id;
```

### Get Articles by Store with Filters
```sql
SELECT * FROM clothing_articles ca
JOIN clothing_images ci ON ca.id = ci.clothing_article_id
WHERE ca.store_id = ? 
  AND ca.condition = ?
  AND ca.price BETWEEN ? AND ?
ORDER BY ca.created_at DESC;
```

## 📊 Performance Considerations

### Indexes
- Primary keys are automatically indexed
- Foreign keys are indexed for join performance
- Brand name, condition, and price are indexed for filtering
- Created date is indexed for sorting

### Optimization Tips
- Use pagination for large result sets
- Implement caching for frequently accessed data
- Consider read replicas for high-traffic applications
- Monitor query performance with slow query logs

## 🧪 Testing

### Sample Data
The schema includes sample data for testing:

```sql
-- Insert sample stores
INSERT INTO stores (business_name, email, phone, address) VALUES
('Vintage Vault', 'vintage@example.com', '(555) 123-4567', '123 Main St');

-- Insert sample clothing articles
INSERT INTO clothing_articles (store_id, brand_name, size, color, condition, price) VALUES
(1, 'Levi\'s', 'M', 'Blue', 'Good', 24.99);
```

## 🚨 Error Handling

The service layer includes comprehensive error handling:

```javascript
try {
  const article = await ClothingArticleService.createClothingArticle(data, images);
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation errors
    console.error('Validation failed:', error.message);
  } else {
    // Handle other errors
    console.error('Unexpected error:', error);
  }
}
```

## 🔧 Customization

### Adding New Fields
1. Update the schema.sql file
2. Modify the corresponding model
3. Create a new migration
4. Update the service layer if needed

### Adding New Validation Rules
1. Modify the model validation
2. Update the service layer validation
3. Add database constraints if necessary

## 📚 Additional Resources

- [Sequelize Documentation](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

When making changes to the database schema:

1. Create a new migration file
2. Update the corresponding models
3. Test the changes thoroughly
4. Update this documentation
5. Ensure backward compatibility

## 📄 License

This database schema and models are part of the Akuatiq application and follow the same license terms.
