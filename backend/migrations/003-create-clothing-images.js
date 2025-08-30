'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clothing_images', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      clothing_article_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'clothing_articles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      image_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add indexes
    await queryInterface.addIndex('clothing_images', ['clothing_article_id']);
    await queryInterface.addIndex('clothing_images', ['image_order']);
    
    // Add unique constraint for image order per clothing article
    await queryInterface.addIndex('clothing_images', ['clothing_article_id', 'image_order'], {
      unique: true,
      name: 'unique_image_order_per_article'
    });

    // Add check constraint for image order (MySQL 8.0+)
    try {
      await queryInterface.sequelize.query(
        'ALTER TABLE clothing_images ADD CONSTRAINT chk_image_order CHECK (image_order >= 1 AND image_order <= 3)'
      );
    } catch (error) {
      console.log('Check constraint not supported or already exists');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clothing_images');
  }
};
