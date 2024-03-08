"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {}
    }
    Task.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            due_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            priority_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Task",
        }
    );
    return Task;
};

