const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todoapp', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectToDatabase;
