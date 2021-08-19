'use strict';
const {Model} = require('sequelize');
const location = require('../models/location')
module.exports = (sequelize, DataTypes) => {
  
  class Empresa extends Model {

    static associate(models){
     //this.hasMany(models.location, {foreignKey: 'location_id', onDelete:'CASCADE', onUpdate:'CASCADE' })
    }
  };

  Empresa.init({
    id: {
       allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    cep: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    location:DataTypes.VIRTUAL,
    street: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    service: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Empresa',
  });
  return Empresa;
};