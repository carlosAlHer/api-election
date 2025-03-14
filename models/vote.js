'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {

    static associate(models) {
      Vote.belongsTo(models.Voter, { foreignKey: 'voter_id', onDelete: 'CASCADE' });
      Vote.belongsTo(models.Candidate, { foreignKey: 'candidate_id', onDelete: 'CASCADE' });
    }
  }
  Vote.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    voter_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Voter',
        key: 'id'
      }
    },
    candidate_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Candidate',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Vote',
    tableName: 'vote',
    timestamps: false
  });
  return Vote;
};