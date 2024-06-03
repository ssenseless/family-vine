// //This file only contains 3/4 lines of code which is only going to call the database.$
// // Instead of implementing this in each seperate tablemgr.js file we do it here.
// const sqlite = require('sqlite3');
// const db = new sqlite("./tables.db-journal");
// exports.db = db; 

const sqlite3 = require('sqlite3').verbose(); // Import sqlite3 module

// Create a new database instance
const db = new sqlite3.Database('./tables.db');

// Export the database instance
module.exports.db = db;
