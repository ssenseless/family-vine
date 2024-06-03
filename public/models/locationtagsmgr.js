const dbmgr = require("./dbmgr");
const db = dbmgr.db; 

// Function to create the LocationTags table
function createLocationTagsTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS LocationTags (
      photo_name VARCHAR(255),
      location VARCHAR(255),
      PRIMARY KEY (photo_name, location),
      FOREIGN KEY (photo_name) REFERENCES Photo(photo_name) ON DELETE CASCADE,
      FOREIGN KEY (location) REFERENCES Location(location) ON DELETE CASCADE
    )`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating LocationTags table', err.message);
        } else {
            console.log('LocationTags table created successfully');
        }
    });
}

// Function to insert a new location tag into the LocationTags table
exports.insertLocationTag = (locationTag, callback) => {
    const { photo_name, location } = locationTag;
    const sql = `INSERT INTO LocationTags (photo_name, location) VALUES (?, ?)`;

    db.run(sql, [photo_name, location], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { photo_name: photo_name, location: location }); // Return the composite key upon successful insertion
        }
    });
};

// Function to retrieve all location tags asynchronously
exports.getAllLocationTags = (callback) => {
    const sql = "SELECT * FROM LocationTags";
    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to retrieve all location tags asynchronously
exports.getPhotoLocation = (photo_name, callback) => {
    const sql = "SELECT location FROM LocationTags WHERE photo_name = ?";
    db.all(sql, [photo_name], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to retrieve all location tags asynchronously
exports.getPhotoNameWithLocation = (location1, callback) => {
    const sql = "SELECT photo_name FROM LocationTags WHERE location = ?";
    db.all(sql, [location1], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to update locationTag info
exports.updateLocationTag = (photo_name, location, newPhoto_name, newLocation, callback) => {
    const sql = `
        UPDATE LocationTags
        SET photo_name = ?, location = ?
        WHERE photo_name = ? AND  location = ?`;
  
    db.run(sql, [newPhoto_name, newLocation, photo_name, location], function(err) {
        if (err) {
            callback(err);
        } else {
             const selectSql = `
             SELECT photo_name, location
             FROM LocationTags
             WHERE photo_name = ? AND  location = ?`;
  
            db.get(selectSql, [newPhoto_name, newLocation], (err, row) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, row); // Return the updated LocationTags information
                }
            });
        }
    });
  };

// Function to delete a location tag from the Tags table given photo name and location name
exports.deleteLocationTag = (photo_name, locationName, callback) => {
    const sql =
    `DELETE FROM Locationtags
     WHERE photo_name = ? AND location = ?`;

    db.run(sql, [photo_name, locationName], function(err) {
        if (err) {
            callback(err);
        } else {
            if (this.changes === 0) {
                callback(new Error('LocationTag not found'));
            } else {
                callback(null, { photo_name, locationName });
            }
        }
    });
};

// Function to delete all location tags from the locationTags table
exports.deleteAllLocationTags = (callback) => {
    const sql =
    `DELETE FROM locationTags`;

    db.run(sql, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};



// Call the function to ensure the table is created when this script is run
createLocationTagsTable();
