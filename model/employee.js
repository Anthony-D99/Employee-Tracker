const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Role = require('./role')

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: 'role',
      referencesKey:'id',
    },
    manager_id: {
      type: DataTypes.INTEGER,
    },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee',
  }
);

module.exports = Employee;