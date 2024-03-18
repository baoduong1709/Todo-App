"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {
            User.hasMany(models.Task, {
                foreignKey: "user_id",
            });
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            dateOfBirth: DataTypes.DATE,
            gender: DataTypes.ENUM(["male", "female", "other"]),
            address: DataTypes.STRING,
            is_active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
