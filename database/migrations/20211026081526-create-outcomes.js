'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('outcomes', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      amount: Sequelize.DOUBLE,
      currency: Sequelize.STRING,
      tagId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'tags'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'outcome_categories'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('outcomes');
  }
};
