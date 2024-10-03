const { app } = require('electron');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './example.db',   // FIXME: This will eventually be dynamic
  logging: false,
})

// Create models (i.e. tables)
const Media  = sequelize.define('Media', {
  filepath: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

// Sync the database (i.e. create the tables if not already made)
sequelize.sync({alter: true})
  .then(() => console.log("Databse & tables created!"))
  .catch(err => console.log("Error syncing database, ", err))

module.exports = { sequelize, Media }
