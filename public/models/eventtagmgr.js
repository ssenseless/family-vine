const dbmgr = require("./dbmgr");
const db = dbmgr.db;

// Function to create the EventTag table
function createEventTagTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS EventTag (
      event_id INTEGER,
      tag VARCHAR(255) PRIMARY KEY
    )`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating EventTag table', err.message);
        } else {
            console.log('EventTag table created successfully');
        }
    });
}

// Function to insert a new event tag into the EventTag table
exports.insertEventTag = (eventTag, callback) => {
    const { tag } = eventTag;
    const sql = `INSERT INTO EventTag ( tag) VALUES (?)`;

    db.run(sql, [ tag], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { tag: tag }); // The event_id is the primary key and is returned upon successful insertion
        }
    });
};
 
// Function to retrieve all event tags asynchronously
exports.getAllEventTags = (callback) => {
    const sql = "SELECT * FROM EventTag";
    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to update event info
exports.updateEvent = (tag, newTag, callback) => {
    const sql = `
        UPDATE EventTag
        SET tag = ?
        WHERE tag = ?`;

    db.run(sql, [newTag, tag], function(err) {
        if (err) {
            callback(err);
        } else {

            const sql2 = `
            UPDATE Shows
            SET tag = ?
            WHERE tag = ?`;
    
            db.run(sql2, [newTag, tag], function(err) {
                if (err) {
                    callback(err);
                } else {
                    //callback(null, { newName, newAge, newBirthplace });
                    
                    const selectSql = `
                        SELECT tag
                        FROM EventTag
                        WHERE tag = ?`;

                    db.get(selectSql, [newTag], (err, row) => {
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

// Function to delete an event from the EventTag table given tag name
exports.deleteEvent = (tag, callback) => {
    const sql =
    `DELETE FROM EventTag
     WHERE tag = ?`;

    db.run(sql, [tag], function(err) {
        if (err) {
            callback(err);
        } else {
            if (this.changes === 0) {
                callback(new Error('Event not found'));
            } else {
                callback(null, {tag});
            }
        }
    });
};

// Function to delete all events from the EventTag table
exports.deleteAllEvents = (callback) => {
    const sql =
    `DELETE FROM EventTag`;

    db.run(sql, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};



// Call the function to ensure the table is created when this script is run
createEventTagTable();
