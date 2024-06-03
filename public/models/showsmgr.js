const dbmgr = require("./dbmgr");
const db = dbmgr.db;

// Function to create the Shows table
function createShowsTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Shows (
      photo_name VARCHAR(255),
      tag VARCHAR(255),
      PRIMARY KEY (photo_name, tag),
      FOREIGN KEY (photo_name) REFERENCES Photo(photo_name) ON DELETE CASCADE,
      FOREIGN KEY (tag) REFERENCES EventTag(tag) ON DELETE CASCADE
    )`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating Shows table', err.message);
        } else {
            console.log('Shows table created successfully');
        }
    });
}

// Function to insert a new show into the Shows table
exports.insertShow = (show, callback) => {
    const { photo_name, tag } = show;
    const sql = `INSERT INTO Shows (photo_name, tag) VALUES (?, ?)`;

    db.run(sql, [photo_name, tag], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { photo_name: photo_name, tag: tag }); // Return the composite key upon successful insertion
        }
    });
};

// Function to retrieve all shows asynchronously
exports.getAllShows = (callback) => {
    const sql = "SELECT * FROM Shows";
    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to update Shows info
exports.updateShows = (photo_name, tag, newPhoto_name, newTag, callback) => {
    const sql = `
        UPDATE Shows
        SET photo_name = ?, tag = ?
        WHERE photo_name = ? AND  tag = ?`;
  
    db.run(sql, [newPhoto_name, newTag, photo_name, tag], function(err) {
        if (err) {
            callback(err);
        } else {
             const selectSql = `
             SELECT photo_name, tag
             FROM Shows
             WHERE photo_name = ? AND  tag = ?`;
  
            db.get(selectSql, [newPhoto_name, newTag], (err, row) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, row); // Return the updated LocationTags information
                }
            });
        }
    });
  };

// Function to delete shows from the Shows table given photo name and tag
exports.deleteShows = (photo_name, tag, callback) => {
    const sql =
    `DELETE FROM Shows
     WHERE photo_name = ? AND tag = ?`;

    db.run(sql, [photo_name, tag], function(err) {
        if (err) {
            callback(err);
        } else {
            if (this.changes === 0) {
                callback(new Error('Shows not found'));
            } else {
                callback(null, { photo_name, tag });
            }
        }
    });
};

// Function to delete all shows from the Shows table
exports.deleteAllShows = (callback) => {
    const sql =
    `DELETE FROM Shows`;

    db.run(sql, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};


// Call the function to ensure the table is created when this script is run
createShowsTable();
