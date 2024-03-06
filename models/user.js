'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
    }
  }
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    gender: DataTypes.ENUM("Male", "Female", "Other"),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};