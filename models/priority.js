"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Priority extends Model {
        static associate(models) {
            Priority.hasMany(models.Task, {
                foreignKey: "priority_id",
            });
        }
    }
    Priority.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Priority",
        }
    );
    return Priority;
};
