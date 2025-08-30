const { ClothingArticle, ClothingImage, Store } = require('../models');
const { ValidationError } = require('../utils/errors');

class ClothingArticleService {
  /**
   * Create a new clothing article with images
   * @param {Object} articleData - The clothing article data
   * @param {Array} imageUrls - Array of image URLs (1-3 images)
   * @returns {Promise<Object>} The created clothing article with images
   */
  async createClothingArticle(articleData, imageUrls) {
    try {
      // Validate image count
      if (!Array.isArray(imageUrls) || imageUrls.length < 1 || imageUrls.length > 3) {
        throw new ValidationError('Must provide between 1 and 3 images');
      }

      // Validate image URLs
      imageUrls.forEach(url => {
        if (!this.isValidImageUrl(url)) {
          throw new ValidationError(`Invalid image URL: ${url}`);
        }
      });

      // Validate store exists
      const store = await Store.findByPk(articleData.storeId);
      if (!store) {
        throw new ValidationError('Store not found');
      }

      // Create clothing article
      const clothingArticle = await ClothingArticle.create(articleData);

      // Create images
      const imagePromises = imageUrls.map((url, index) => {
        return ClothingImage.create({
          clothingArticleId: clothingArticle.id,
          imageUrl: url,
          imageOrder: index + 1
        });
      });

      await Promise.all(imagePromises);

      // Return the created article with images
      return await this.getClothingArticleById(clothingArticle.id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a clothing article by ID with images and store information
   * @param {number} id - The clothing article ID
   * @returns {Promise<Object>} The clothing article with related data
   */
  async getClothingArticleById(id) {
    try {
      const clothingArticle = await ClothingArticle.findByPk(id, {
        include: [
          {
            model: Store,
            as: 'store',
            attributes: ['id', 'businessName', 'email', 'phone', 'address']
          },
          {
            model: ClothingImage,
            as: 'images',
            attributes: ['id', 'imageUrl', 'imageOrder'],
            order: [['imageOrder', 'ASC']]
          }
        ]
      });

      if (!clothingArticle) {
        throw new ValidationError('Clothing article not found');
      }

      return clothingArticle;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all clothing articles with optional filtering
   * @param {Object} filters - Filter options
   * @param {number} page - Page number for pagination
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Paginated clothing articles
   */
  async getClothingArticles(filters = {}, page = 1, limit = 20) {
    try {
      const whereClause = {};
      const includeClause = [
        {
          model: Store,
          as: 'store',
          attributes: ['id', 'businessName']
        },
        {
          model: ClothingImage,
          as: 'images',
          attributes: ['imageUrl', 'imageOrder'],
          order: [['imageOrder', 'ASC']]
        }
      ];

      // Apply filters
      if (filters.storeId) {
        whereClause.storeId = filters.storeId;
      }

      if (filters.brandName) {
        whereClause.brandName = {
          [require('sequelize').Op.iLike]: `%${filters.brandName}%`
        };
      }

      if (filters.condition) {
        whereClause.condition = filters.condition;
      }

      if (filters.minPrice || filters.maxPrice) {
        whereClause.price = {};
        if (filters.minPrice) {
          whereClause.price[require('sequelize').Op.gte] = filters.minPrice;
        }
        if (filters.maxPrice) {
          whereClause.price[require('sequelize').Op.lte] = filters.maxPrice;
        }
      }

      if (filters.size) {
        whereClause.size = filters.size;
      }

      if (filters.color) {
        whereClause.color = {
          [require('sequelize').Op.iLike]: `%${filters.color}%`
        };
      }

      const offset = (page - 1) * limit;

      const { count, rows } = await ClothingArticle.findAndCountAll({
        where: whereClause,
        include: includeClause,
        order: [['createdAt', 'DESC']],
        limit,
        offset
      });

      return {
        clothingArticles: rows,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a clothing article
   * @param {number} id - The clothing article ID
   * @param {Object} updateData - The data to update
   * @param {Array} imageUrls - Optional new image URLs
   * @returns {Promise<Object>} The updated clothing article
   */
  async updateClothingArticle(id, updateData, imageUrls = null) {
    try {
      const clothingArticle = await ClothingArticle.findByPk(id);
      if (!clothingArticle) {
        throw new ValidationError('Clothing article not found');
      }

      // Update article data
      await clothingArticle.update(updateData);

      // Update images if provided
      if (imageUrls) {
        if (!Array.isArray(imageUrls) || imageUrls.length < 1 || imageUrls.length > 3) {
          throw new ValidationError('Must provide between 1 and 3 images');
        }

        // Validate image URLs
        imageUrls.forEach(url => {
          if (!this.isValidImageUrl(url)) {
            throw new ValidationError(`Invalid image URL: ${url}`);
          }
        });

        // Remove existing images
        await ClothingImage.destroy({
          where: { clothingArticleId: id }
        });

        // Create new images
        const imagePromises = imageUrls.map((url, index) => {
          return ClothingImage.create({
            clothingArticleId: id,
            imageUrl: url,
            imageOrder: index + 1
          });
        });

        await Promise.all(imagePromises);
      }

      return await this.getClothingArticleById(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a clothing article
   * @param {number} id - The clothing article ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteClothingArticle(id) {
    try {
      const clothingArticle = await ClothingArticle.findByPk(id);
      if (!clothingArticle) {
        throw new ValidationError('Clothing article not found');
      }

      // Images will be automatically deleted due to CASCADE
      await clothingArticle.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get clothing articles by store ID
   * @param {number} storeId - The store ID
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} Array of clothing articles
   */
  async getClothingArticlesByStore(storeId, filters = {}) {
    try {
      const whereClause = { storeId, ...filters };

      return await ClothingArticle.findAll({
        where: whereClause,
        include: [
          {
            model: ClothingImage,
            as: 'images',
            attributes: ['imageUrl', 'imageOrder'],
            order: [['imageOrder', 'ASC']]
          }
        ],
        order: [['createdAt', 'DESC']]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validate image URL format
   * @param {string} url - The image URL to validate
   * @returns {boolean} Whether the URL is valid
   */
  isValidImageUrl(url) {
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i;
    return urlPattern.test(url);
  }

  /**
   * Get clothing article statistics
   * @param {number} storeId - Optional store ID for filtering
   * @returns {Promise<Object>} Statistics object
   */
  async getClothingArticleStats(storeId = null) {
    try {
      const whereClause = storeId ? { storeId } : {};

      const totalArticles = await ClothingArticle.count({ where: whereClause });
      const totalValue = await ClothingArticle.sum('price', { where: whereClause });
      
      const conditionStats = await ClothingArticle.findAll({
        where: whereClause,
        attributes: [
          'condition',
          [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
        ],
        group: ['condition']
      });

      const brandStats = await ClothingArticle.findAll({
        where: whereClause,
        attributes: [
          'brandName',
          [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
        ],
        group: ['brandName'],
        order: [[require('sequelize').fn('COUNT', require('sequelize').col('id')), 'DESC']],
        limit: 10
      });

      return {
        totalArticles,
        totalValue: parseFloat(totalValue || 0),
        conditionBreakdown: conditionStats,
        topBrands: brandStats
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ClothingArticleService();
