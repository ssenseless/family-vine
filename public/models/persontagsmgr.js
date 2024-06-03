const dbmgr = require("./dbmgr");
const db = dbmgr.db;

// Function to create the Tags table
function createTagsTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Tags (
      photo_name VARCHAR(255),
      name VARCHAR(255),
      age INTEGER,
      birthplace VARCHAR(255),

      PRIMARY KEY (photo_name, name, age, birthplace),
      FOREIGN KEY (photo_name) REFERENCES Photo(photo_name) ON DELETE CASCADE,
      FOREIGN KEY (name) REFERENCES Person(name) ON DELETE CASCADE,
      FOREIGN KEY (age) REFERENCES Person(age) ON DELETE CASCADE,
      FOREIGN KEY (birthplace) REFERENCES Person(birthplace) ON DELETE CASCADE
    )`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating Tags table', err.message);
        } else {
            console.log('Person tags table created successfully');
        }
    });
}

// Function to insert a new tag into the Tags table
exports.insertTag = (photo_name, name, age, birthplace, callback) => {
   // const {photo_name, name, age, birthplace} = tag;
    const sql = `INSERT INTO Tags (photo_name, name, age, birthplace) VALUES (?, ?, ?, ?)`;

    db.run(sql, [photo_name, name, age, birthplace], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { photo_name: photo_name, name: name, age: age, birthplace: birthplace }); // Return the composite key upon successful insertion
        }
    });
};

// Function to retrieve all tags asynchronously
exports.getAllTags = (callback) => {
    const sql = "SELECT * FROM Tags";
    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to retrieve all names of tags given Photo Name asynchronously
exports.getAllNamesTaggedGivenPNAME = (photo_name, callback) => {
    const sql = "SELECT name FROM Tags where photo_name = ?";
    db.all(sql, [photo_name], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to retrieve all details of tagged person given Photo Name asynchronously
exports.getAllTaggedDetailsGivenPNAME = (photo_name, callback) => {
    const sql = "SELECT name, age, birthplace FROM Tags where photo_name = ?";
    db.all(sql, [photo_name], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to update a photo's info
exports.updatePersonTag = (photo_name, name, age, birthplace, newPhoto_name, newName, newAge, newBirthplace, callback) => {
    const sql = `
        UPDATE Tags
        SET photo_name = ?, name = ?, age = ?, birthplace = ?
        WHERE photo_name = ? AND name = ? AND age = ? AND birthplace = ?`;
  
    db.run(sql, [newPhoto_name, newName, newAge, newBirthplace, photo_name, name, age, birthplace], function(err) {
        if (err) {
            callback(err);
        } else {
             const selectSql = `
             SELECT photo_name, name, age, birthplace
             FROM Tags
             WHERE photo_name = ? AND name = ? AND age = ? AND birthplace = ?`;
  
            db.get(selectSql, [ newPhoto_name, newName, newAge, newBirthplace], (err, row) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, row); // Return the updated Photo information
                }
            });
        }
    });
  };

// Function to delete a person tag from the Tags table given photo name, name, age, and birthplace
exports.deletePersonTag = (photo_name, name, age, birthplace, callback) => {
    const sql =
    `DELETE FROM Tags
     WHERE photo_name = ? AND name = ? AND age = ? AND birthplace = ?`;

    db.run(sql, [photo_name, name, age, birthplace], function(err) {
        if (err) {
            callback(err);
        } else {
            if (this.changes === 0) {
                callback(new Error('PersonTag not found'));
            } else {
                callback(null, { name, age, birthplace });
            }
        }
    });
};

// Function to delete all person tags from the Tags table
exports.deleteAllPersonTags = (callback) => {
    const sql =
    `DELETE FROM Tags`;

    db.run(sql, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};


// Call the function to ensure the table is created when this script is run
createTagsTable();
