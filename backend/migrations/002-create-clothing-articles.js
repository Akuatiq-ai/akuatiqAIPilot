'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clothing_articles', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      store_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'stores',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      brand_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      size: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      condition: {
        type: Sequelize.ENUM('New', 'Like New', 'Good', 'Fair', 'Poor'),
        allowNull: false,
        defaultValue: 'Good'
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Add indexes
    await queryInterface.addIndex('clothing_articles', ['store_id']);
    await queryInterface.addIndex('clothing_articles', ['brand_name']);
    await queryInterface.addIndex('clothing_articles', ['condition']);
    await queryInterface.addIndex('clothing_articles', ['price']);
    await queryInterface.addIndex('clothing_articles', ['created_at']);

    // Add check constraint for price (MySQL 8.0+)
    try {
      await queryInterface.sequelize.query(
        'ALTER TABLE clothing_articles ADD CONSTRAINT chk_price CHECK (price > 0)'
      );
    } catch (error) {
      console.log('Check constraint not supported or already exists');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clothing_articles');
  }
};
