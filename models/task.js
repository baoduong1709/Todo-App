'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
    }
  }
  Task.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    due_date: DataTypes.DATE,
    priority: DataTypes.INTEGER,
    status: DataTypes.ENUM("todo","inprogress","completed","closed")
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};