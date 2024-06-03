const dbmgr = require('./dbmgr');
const db = dbmgr.db;

// Function to create the Person table
function createPersonTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Person (
        person_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255),
        age INTEGER,
        birthplace VARCHAR(255),
        UNIQUE (name, age, birthplace)
    )`;

    

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating Person table', err.message);
        } else {
            console.log('Person table created successfully');
        }
    });
}

// Export the function so it can be called from elsewhere in the application
// exports.createPersonTable = createPersonTable;

// Exporting as an async function
exports.createPersonTable = async () => {
    try {
        await createPersonTable();
        console.log('Person table creation confirmed');
    } catch (err) {
        console.error('Error during Person table creation', err);
    }
};

// Function to add a new person to the Person table
exports.addPerson = (person, callback) => {
    const { name, age, birthplace } = person;
    const sql = `INSERT INTO Person (name, age, birthplace) VALUES (?, ?, ?)`;

    db.run(sql, [name, age, birthplace], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { person_id: this.lastID }); // Return the id of the newly inserted person
        }
    });
};
 
// Function to retrieve all persons from the Person table
exports.getAllPersons = (callback) => {
    const sql = "SELECT * FROM Person";

    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to retrieve all persons from the Person table given a name
exports.getPersonsbyName = (name, callback) => {
    const sql = "SELECT * FROM Person WHERE name = ?";
    console.log(`Executing SQL: ${sql} with name: ${name}`);  // Log the SQL and parameter

    db.all(sql, [name], (err, rows) => {
        if (err) {
            console.logReply("Query result:", rows);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to retrieve a person from the Person table given a name and birthday
exports.getPersonsbyNameAndBirthplace = (name, birthplace, callback) => {
    const sql = "SELECT * FROM Person WHERE name = ? AND birthplace = ?";

    db.all(sql, [name, birthplace], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to retrieve a person from the Person table given a name and birthday
exports.getPersonsbyNameAgeBirthplace = (name, age, birthplace, callback) => {
    const sql = "SELECT * FROM Person WHERE name = ? AND age = ? AND birthplace = ?";

    db.all(sql, [name, age, birthplace], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to update a person's information by name, age, and birthplace
exports.updatePersonByNameAgeAndBirthplace = (name, age, birthplace, newName, newAge, newBirthplace, callback) => {
    //const { newName, newAge, newBirthplace } = updatedAttributes;
    const sql = `
        UPDATE Person
        SET name = ?, age = ?, birthplace = ?
        WHERE name = ? AND age = ? AND birthplace = ?`;

    db.run(sql, [newName, newAge, newBirthplace, name, age, birthplace], function(err) {
        if (err) {
            callback(err);
        } else {
            if (this.changes === 0) {
                //callback(new Error('Person not found'));
                callback(err);
            } else {
                const sql2 = `
                    UPDATE Tags
                    SET name = ?, age = ?, birthplace = ?
                    WHERE name = ? AND age = ? AND birthplace = ?`;
                
                    db.run(sql2, [newName, newAge, newBirthplace, name, age, birthplace], function(err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, { newName, newAge, newBirthplace });
                        }
                    });
            }
        }
    });
};

// Function to delete a person from the Person table given name, age, and birthplace
exports.deletePerson = (name, age, birthplace, callback) => {
    const sql =
    `DELETE FROM Person
     WHERE name = ? AND age = ? AND birthplace = ?`;

    db.run(sql, [name, age, birthplace], function(err) {
        if (err) {
            callback(err);
        } else {
            if (this.changes === 0) {
                // No rows were affected, meaning no person matched the given criteria
                callback(new Error('Person not found'));
            } else {
                // Successfully deleted the person
                callback(null, { name, age, birthplace });
            }
        }
    });
};

// Function to delete all persons from the Person table
exports.deleteAllPersons = (callback) => {
    const sql =
    `DELETE FROM Person`;

    db.run(sql, function(err) {
        if (err) {
            callback(err);
        } else {
            // Successfully deleted all persons
            callback(null);
        }
    });
};


// Call the function to ensure the table is created when this script is run
createPersonTable();
