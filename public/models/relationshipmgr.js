const dbmgr = require("./dbmgr");
const db = dbmgr.db;

// Function to create the Relationship table
function createRelationshipTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Relationship (
      parent_id INTEGER,
      PRIMARY KEY (parent_id),
      FOREIGN KEY (parent_id) REFERENCES Person(person_id)
    )`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating Relationship table', err.message);
        } else {
            console.log('Relationship table created successfully');
        }
    });
}

// Function to insert a new relationship into the Relationship table
exports.insertRelationship = (relationship, callback) => {
    const { parent_id } = relationship;
    const sql = `INSERT INTO Relationship (parent_id) VALUES (?)`;

    db.run(sql, [parent_id], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { parent_id: parent_id }); // Return the parent_id upon successful insertion
        }
    });
};

// Function to retrieve all relationships asynchronously
exports.getAllRelationships = (callback) => {
    const sql = "SELECT * FROM Relationship";
    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Call the function to ensure the table is created when this script is run
createRelationshipTable();
