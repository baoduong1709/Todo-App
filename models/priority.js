'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Priority extends Model {}
    Priority.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Priority',
        tableName: 'priorities',
        timestamps: false 
    });
    return Priority;
};
