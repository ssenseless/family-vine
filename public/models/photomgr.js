var dbmgr = require("./dbmgr");
var db = dbmgr.db;


// Function to create the Photo table
function createPhotoTable() {
    // FIXME - is location redundant?
    const sql = `
    CREATE TABLE IF NOT EXISTS Photo (
      photo_name VARCHAR(255) PRIMARY KEY,
      what VARCHAR(255),
      when_taken VARCHAR(255)
    )`;
  
    db.run(sql, (err) => {
      if (err) {
        console.error('Error creating Photo table', err.message);
      } else {
        console.log('Photo table created successfully');
      }
    });
  }

// Function to insert a new event tag into the EventTag table
exports.insertPhoto = (photo, callback) => {
  const { photo_name, what, when_taken } = photo;
  const sql = `INSERT INTO Photo (photo_name, what, when_taken) VALUES (?, ?, ?)`;

  db.run(sql, [photo_name, what, when_taken], function(err) {
      if (err) {
          callback(err);
      } else {
          callback(null, { photo_name: this.photo_name }); // The photo name is the primary key and is returned upon successful insertion
      }
  });
};

/*GET FUNCTIONS*/ 
// Function to retrieve all photo ndetails
exports.getPhotoDetails = (callback) => {
  const sql = "SELECT * FROM Photo";
  db.all(sql, [], (err, rows) => { // Use db.all to execute an SQL query and retrieve all results
      if (err) {
          callback(err, null);
      } else {
          callback(null, rows);
      }
  });
};

// Function to retrieve all photo names asynchronously
exports.getPhotoNames = (callback) => {
    const sql = "SELECT photo_name FROM Photo";
    db.all(sql, [], (err, rows) => { // Use db.all to execute an SQL query and retrieve all results
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to retrieve all photo names asynchronously
exports.getPhotoWhat = (callback) => {
    const sql = "SELECT what FROM Photo";
    db.all(sql, [], (err, rows) => { // Use db.all to execute an SQL query and retrieve all results
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to retrieve all photo names asynchronously
exports.getPhotoDetailsWithName = (photo_name, callback) => {
    const sql = "SELECT what, when_taken FROM Photo WHERE photo_name = ?";
    db.all(sql, [photo_name], (err, rows) => { // Use db.all to execute an SQL query and retrieve all results
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};


// Function to update a photo's info
exports.updatePhoto = (photo_name, newPhoto_name, newWhat, newWhen_taken, callback) => {
  const sql = `
      UPDATE Photo
      SET photo_name = ?, what = ?, when_taken = ?
      WHERE photo_name = ?`;

  checkCount = 0;

  db.run(sql, [newPhoto_name, newWhat, newWhen_taken, photo_name], function(err) {
      if (err) {
          callback(err);
      } else {
        const sql2 = `
            UPDATE LocationTags
            SET photo_name = ?
            WHERE photo_name = ?`;
        
        db.run(sql2, [newPhoto_name, photo_name], function(err) {
            if (err) {
                callback(err);
            } else {
                //callback(null, { newName, newAge, newBirthplace });
                checkCount += 1;
            }
        });

        const sql3 = `
            UPDATE Tags
            SET photo_name = ?
            WHERE photo_name = ?`;
        
        db.run(sql3, [newPhoto_name, photo_name], function(err) {
            if (err) {
                callback(err);
            } else {
                //callback(null, { newName, newAge, newBirthplace });
                checkCount += 1;
            }
        });

        const sql4 = `
            UPDATE Shows
            SET photo_name = ?
            WHERE photo_name = ?`;
        
        db.run(sql4, [newPhoto_name, photo_name], function(err) {
            if (err) {
                callback(err);
            } else {
                //callback(null, { newName, newAge, newBirthplace });
                checkCount += 1;

            }
        });



        const selectSql = `
            SELECT photo_name, what, when_taken
            FROM Photo
            WHERE photo_name = ?`;

        db.get(selectSql, [newPhoto_name], (err, row) => {
            if (err) {
                callback(err);
            } else {
                callback(null, row); // Return the updated Photo information
            }
        });
    }
  });
};

// Function to delete a photo from the Photo table given photo name
exports.deletePhoto = (photo_name, callback) => {
    const sql =
    `DELETE FROM Photo
     WHERE photo_name = ?`;

    db.run(sql, [photo_name], function(err) {
        if (err) {
            callback(err);
        } else {
            if (this.changes === 0) {
                callback(new Error('Photo not found'));
            } else {
                callback(null, {photo_name});
            }
        }
    });
};

// Function to delete all photos from the Photo table
exports.deleteAllPhotos = (callback) => {
    const sql =
    `DELETE FROM Photo`;

    db.run(sql, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};


// Call the function to ensure the table is created when this script is run
createPhotoTable();
