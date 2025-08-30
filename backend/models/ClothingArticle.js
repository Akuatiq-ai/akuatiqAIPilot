const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class ClothingArticle extends Model {
    static associate(models) {
      // Define associations here
      ClothingArticle.belongsTo(models.Store, {
        foreignKey: 'storeId',
        as: 'store',
        onDelete: 'CASCADE'
      });
      
      ClothingArticle.hasMany(models.ClothingImage, {
        foreignKey: 'clothingArticleId',
        as: 'images',
        onDelete: 'CASCADE'
      });
    }

    // Instance method to validate image count
    async validateImageCount() {
      const imageCount = await this.countImages();
      if (imageCount < 1) {
        throw new Error('Each clothing article must have at least one image');
      }
      if (imageCount > 3) {
        throw new Error('Each clothing article can have at most three images');
      }
      return true;
    }

    // Instance method to get image URLs as array
    async getImageUrls() {
      const images = await this.getImages({
        order: [['imageOrder', 'ASC']]
      });
      return images.map(img => img.imageUrl);
    }

    // Instance method to add images
    async addImages(imageUrls) {
      if (!Array.isArray(imageUrls)) {
        throw new Error('Image URLs must be an array');
      }
      
      if (imageUrls.length < 1 || imageUrls.length > 3) {
        throw new Error('Must provide between 1 and 3 images');
      }

      // Remove existing images
      await this.setImages([]);

      // Add new images
      const imagePromises = imageUrls.map((url, index) => {
        return this.createImage({
          imageUrl: url,
          imageOrder: index + 1
        });
      });

      await Promise.all(imagePromises);
      return this;
    }
  }

  ClothingArticle.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'store_id',
      references: {
        model: 'stores',
        key: 'id'
      },
      validate: {
        notNull: true
      }
    },
    brandName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'brand_name',
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    size: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    color: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100]
      }
    },
    condition: {
      type: DataTypes.ENUM('New', 'Like New', 'Good', 'Fair', 'Poor'),
      allowNull: false,
      defaultValue: 'Good',
      validate: {
        isIn: [['New', 'Like New', 'Good', 'Fair', 'Poor']]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
        isDecimal: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'ClothingArticle',
    tableName: 'clothing_articles',
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['store_id']
      },
      {
        fields: ['brand_name']
      },
      {
        fields: ['condition']
      },
      {
        fields: ['price']
      },
      {
        fields: ['created_at']
      }
    ],
    hooks: {
      // Validate image count before save
      beforeSave: async (clothingArticle) => {
        if (clothingArticle.changed('id')) {
          // New record, validate image count after creation
          return;
        }
        await clothingArticle.validateImageCount();
      },
      // Validate image count after create
      afterCreate: async (clothingArticle) => {
        await clothingArticle.validateImageCount();
      }
    }
  });

  return ClothingArticle;
};
