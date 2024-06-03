const dbmgr = require("./dbmgr");
const db = dbmgr.db;

// Function to create the Location table
function createLocationTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Location (
      locationName VARCHAR(255) PRIMARY KEY,
      address VARCHAR(255)
    )`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating Location table', err.message);
        } else {
            console.log('Location table created successfully');
        }
    });
}

// Function to insert a new location into the Location table
exports.insertLocation = (location, callback) => {
    const { locationName, address } = location;
    const sql = `INSERT INTO Location (locationName, address) VALUES (?, ?)`;

    db.run(sql, [locationName, address], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { locationName: locationName }); // The locationName is the primary key and is returned upon successful insertion
        }
    });
};

// Function to retrieve all locations asynchronously
exports.getAllLocations = (callback) => {
    const sql = "SELECT * FROM Location";
    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to retrieve address given location name
exports.getAddressWithName = (locationName2, callback) => {
    const sql = "SELECT address FROM Location where locationName = ?";
    db.all(sql, [locationName2], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to update location info
exports.updateLocation = (locationName, newLocationName, newAddress, callback) => {
    const sql = `
        UPDATE Location
        SET locationName = ?, address = ?
        WHERE locationName = ?`;

    db.run(sql, [newLocationName, newAddress, locationName], function(err) {
        if (err) {
            callback(err);
        } else {

            const sql2 = `
                UPDATE LocationTags
                SET location = ?
                WHERE location = ?`;
        
            db.run(sql2, [newLocationName, locationName], function(err) {
                if (err) {
                    callback(err);
                } else {
                    //callback(null, { newName, newAge, newBirthplace });

                    const selectSql = `
                        SELECT locationName, address
                        FROM Location
                        WHERE locationName = ?`;

                    db.get(selectSql, [newLocationName], (err, row) => {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, row); // Return the updated location information
                        }
                    });
                            
                }
            }); 
        }
    });
};

// Function to delete a location from the Location table given location name
exports.deleteLocation = (locationName, callback) => {
    const sql =
    `DELETE FROM Location
     WHERE locationName = ?`;

    db.run(sql, [locationName], function(err) {
        if (err) {
            callback(err);
        } else {
            if (this.changes === 0) {
                callback(new Error('Location not found'));
            } else {
                callback(null, {locationName});
            }
        }
    });
};

// Function to delete all locations from the Location table
exports.deleteAllLocations = (callback) => {
    const sql =
    `DELETE FROM Location`;

    db.run(sql, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};

// Call the function to ensure the table is created when this script is run
createLocationTable();
