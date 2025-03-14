'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Voter extends Model {
    
  
    static associate(models) {
      
      Voter.hasMany(models.Vote, { foreignKey: 'voter_id', onDelete: 'CASCADE' });
    }
  }
  Voter.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    has_voted:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Voter',
    tableName: 'voter',
    timestamps: false,
    hooks: {

      async beforeCreate(voter, options) {
        try {
          // Verifica si el name ya existe en la tabla Candidate
        const existCandidate = await sequelize.models.Candidate.findOne({ where: { name: voter.name } });
        if (existCandidate) throw new Error('This user is already registered as a candidate.');

        } catch (error) {
           throw new Error(`Validation error: ${error.message}`);
        }
        
      }
    }
  });
  return Voter;
};