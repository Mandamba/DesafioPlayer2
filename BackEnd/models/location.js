'use strict';
const {Model} = require('sequelize');
const empresa = require('./empresa');

module.exports = (sequelize, DataTypes) => {
  class location extends Model {

    static associate(models) {
     //this.belongsTo(empresa, {foreignKey : 'empresa_id', onUpdate:'RESTRICT', onDelete:'RESTRICT'})
    }
  };
  location.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey:true
    },
    type: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    empresa_id: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'location',
  });
  return location;
};
