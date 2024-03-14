"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            Task.belongsTo(models.User, {
                foreignKey: "user_id"
            });
        }
    }
    Task.init(
        {
            user_id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            due_date: DataTypes.DATE,
            priority_id: DataTypes.INTEGER,
            status_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Task",
        }
    );
    return Task;
};
