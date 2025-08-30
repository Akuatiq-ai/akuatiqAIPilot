const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Store extends Model {
    static associate(models) {
      // Define associations here
      Store.hasMany(models.ClothingArticle, {
        foreignKey: 'storeId',
        as: 'clothingArticles',
        onDelete: 'CASCADE'
      });
    }
  }

  Store.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    businessName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'business_name',
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20]
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    storeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'store_count',
      validate: {
        min: 1
      }
    },
    itemsPerYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'items_per_year',
      validate: {
        min: 0
      }
    },
    hoursOfOperation: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'hours_of_operation'
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
    modelName: 'Store',
    tableName: 'stores',
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['email']
      },
      {
        fields: ['business_name']
      }
    ]
  });

  return Store;
};
