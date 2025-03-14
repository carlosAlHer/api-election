'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    static associate(models) {
      Candidate.hasMany(models.Vote, { foreignKey: 'candidate_id', onDelete: 'CASCADE' });
    }
  }
  Candidate.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    party: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Candidate',
    tableName: 'candidate',
    timestamps: false,
    hooks: {

      async beforeCreate(candidate, options) {
        try {
          // Verifica si el name ya existe en la tabla Voter
          const existVoter = await sequelize.models.Voter.findOne({ where: { name: candidate.name } });
          if (existVoter) throw new Error('This candidate is already registered as a voter.');

        } catch (error) {
          throw new Error(`Validation error: ${error.message}`);
        }

      }
    }
  });
  return Candidate;
};