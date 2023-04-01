const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-practice','root','Abhay@123', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;