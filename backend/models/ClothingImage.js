const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class ClothingImage extends Model {
    static associate(models) {
      // Define associations here
      ClothingImage.belongsTo(models.ClothingArticle, {
        foreignKey: 'clothingArticleId',
        as: 'clothingArticle',
        onDelete: 'CASCADE'
      });
    }

    // Instance method to validate image URL format
    validateImageUrl() {
      const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i;
      if (!urlPattern.test(this.imageUrl)) {
        throw new Error('Invalid image URL format. Must be a valid HTTP/HTTPS URL ending with an image extension.');
      }
      return true;
    }
  }

  ClothingImage.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    clothingArticleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'clothing_article_id',
      references: {
        model: 'clothing_articles',
        key: 'id'
      },
      validate: {
        notNull: true
      }
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'image_url',
      validate: {
        notEmpty: true,
        len: [1, 500],
        isUrl: true
      }
    },
    imageOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'image_order',
      validate: {
        min: 1,
        max: 3
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    }
  }, {
    sequelize,
    modelName: 'ClothingImage',
    tableName: 'clothing_images',
    underscored: true,
    timestamps: false, // Only created_at, no updated_at
    indexes: [
      {
        fields: ['clothing_article_id']
      },
      {
        fields: ['image_order']
      },
      {
        fields: ['clothing_article_id', 'image_order'],
        unique: true
      }
    ],
    hooks: {
      // Validate image URL before save
      beforeSave: (clothingImage) => {
        clothingImage.validateImageUrl();
      },
      // Ensure image order is unique per clothing article
      beforeCreate: async (clothingImage) => {
        const existingImage = await ClothingImage.findOne({
          where: {
            clothingArticleId: clothingImage.clothingArticleId,
            imageOrder: clothingImage.imageOrder
          }
        });
        
        if (existingImage) {
          throw new Error(`Image order ${clothingImage.imageOrder} already exists for this clothing article`);
        }
      }
    }
  });

  return ClothingImage;
};
