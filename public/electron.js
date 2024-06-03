const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const personmgr = require("./models/personmgr");
const locationmgr = require("./models/locationmgr");
const eventtagmgr = require("./models/eventtagmgr");
const photomgr = require("./models/photomgr");
const locationtagsmgr = require("./models/locationtagsmgr");
const persontagsmgr = require("./models/persontagsmgr");
const showsmgr = require("./models/showsmgr");
const relationshipmgr = require("./models/relationshipmgr");


//basic window boilerplate function
function createStartWindow() {
  //these settings are incredibly stupid and incredibly important so no touchy lmao
  const startWindow = new BrowserWindow({
    title: "Family Vine",
    height: "800",
    width: "1000",
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#2c2c2c",
      symbolColor: "#bc9e82",
      height: 29
    },
    webPreferences: {
      preload: isDev
        ? path.join(app.getAppPath(), "./public/preload.js") //pub folder for dev
        : path.join(app.getAppPath(), "./build/preload.js"), //build folder for prod
      worldSafeExecuteJavaScript: true, //should be bundled with Electron 12+ but just in case
      contextIsolation: true //not exposing our app to random javascript executions (see preload.js for ipc implementation)
    }
  });

  //remove application menu
  Menu.setApplicationMenu(null);

  //dev mode vs pack-app/build mode. it will run the same either way
  startWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  startWindow.setIcon(path.join(__dirname, "images/favicon.ico"));

  if (isDev) {
    startWindow.webContents.on("did-frame-finish-load", () => {
      startWindow.webContents.openDevTools({ mode: "detach" });
    });
  }
}

//promise to deliver electron app
app.whenReady().then(() => {
  createStartWindow();

  //ensure window is active
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createStartWindow();
    }
  });
});

//windows and linux exit handling
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * both of the below IPC handlers just log for now
 * but once some of the sqlite3 stuff gets packaged
 * I/we can come back and actually implement this
 */

//Not using this currently. Instead, the if/else block below is used.
ipcMain.on("send-db", (event, args) => {
  //const { name, age, birthplace } = args;
  const type = args[0];
  args.shift();

  //INSERTION OPERATIONS:
  if (type == "addPerson") {
    const [ name, age, birthplace ] = args;

    // Call the addPerson function with the person details
    personmgr.addPerson({ name, age, birthplace }, (err, result) => {
        if (err) {
            console.error('Error adding person:', err);
            // Handle the error as needed, perhaps send an error message back to the front-end
        } else {
            console.log('Person added successfully:', result);
            // Handle the successful addition of the person, perhaps send a success message back to the front-end
        }
    });
  }

  else if (type == "addLocation") {
    const [locationName, address] = args;
    // Call the addPerson function with the person details
    locationmgr.insertLocation({ locationName, address }, (err, result) => {
      if (err) {
          console.error('Error adding location:', err);
          // Handle the error as needed, perhaps send an error message back to the front-end
      } else {
          console.log('Location added successfully:', result);
          // Handle the successful addition of the location, perhaps send a success message back to the front-end
      }
    });
  }

  else if (type == "addEventTag") {
    const [tag] = args;
    eventtagmgr.insertEventTag({tag }, (err, result) => {
      if (err) {
          console.error('Error adding event tag:', err);
          // Handle the error as needed, perhaps send an error message back to the front-end
      } else {
          console.log('Event added successfully:', result);
          // Handle the successful addition of the event, perhaps send a success message back to the front-end
      }
    });
  }

  else if (type == "addPhoto") {
    const [photo_name, what, when_taken] = args;
    // Call the addPhoto function with the person details
    photomgr.insertPhoto({ photo_name, what, when_taken }, (err, result) => {
      if (err) {
          console.error('Error adding photo:', err);
          // Handle the error as needed, perhaps send an error message back to the front-end
      } else {
          console.log('Photo added successfully:', result);
          // Handle the successful addition of the photo, perhaps send a success message back to the front-end
      }
    });
  }

  else if (type == "addLocationTag") {
    const [photo_name, location] = args;

    locationtagsmgr.insertLocationTag({photo_name, location}, (err, result) => {
      if (err) {
        console.error('Error adding location tag:', err);
      }
      else {
        console.log('Location tag added successfully:', result);
      }
    });
  }
  else if (type == "addPersonTag") {
    const [photo_name, name, age, birthplace] = args;

    persontagsmgr.insertTag(photo_name, name, age, birthplace, (err, result) => {
      if (err) {
        console.error('Error adding person tag:', err);
      }
      else {
        console.log('Person tag added successfully:', result);
      }
    });
  }

  else if (type == "addShows") {
    const [photo_name, tag] = args;

    showsmgr.insertShow({photo_name, tag}, (err, result) => {
      if (err) {
        console.error('Error adding shows', err);
      }
      else {
        console.log('Shows added successfully:', result);
      }
    });
  }

  //UPDATE OPERATIONS
  else if (type == "updatePerson") {
    //sets first element of remaining args to passed array of updated attributes and then removes that array from args
    const updatedAttributes = args[0];
    const [newName, newAge, newBirthplace] = updatedAttributes;
    args.shift();
    const [name, age, birthplace] = args;

    personmgr.updatePersonByNameAgeAndBirthplace(name, age, birthplace, newName, newAge, newBirthplace, (err, result) => {
      if (err) {
        console.error('Error updating Person', err);
      }
      else {
        console.log('Person updated successfully:', result); 
      }
    });
  } 

  else if (type == "updateLocation") {
    //sets first element of remaining args to passed array of updated attributes and then removes that array from args
    const updatedLocationAttributes = args[0];
    const [newLocationName, newAddress] = updatedLocationAttributes;
    args.shift();
    const [locationName] = args;

    locationmgr.updateLocation(locationName, newLocationName, newAddress, (err, result) => {
      if (err) {
        console.error('Error updating Location', err);
      }
      else {
        console.log('Location updated successfully:', result); 
      }
    });
  }

  else if (type == "updatePhoto") {
    //sets first element of remaining args to passed array of updated attributes and then removes that array from args
    const updatedPhotoAttributes = args[0];
    const [newPhoto_name, newWhat, newWhen_taken] = updatedPhotoAttributes;
    args.shift();
    const [photo_name] = args;

    photomgr.updatePhoto(photo_name, newPhoto_name, newWhat, newWhen_taken, (err, result) => {
      if (err) {
        console.error('Error updating Photo', err);
      }
      else {
        console.log('Photo updated successfully:', result); 
      }
    });
  } 

  else if (type == "updateEvent") {
    //sets first element of remaining args to passed array of updated attributes and then removes that array from args
    const updatedeEventAttributes = args[0];
    const [newTag] = updatedeEventAttributes;
    args.shift();
    const [tag] = args;

    eventtagmgr.updateEvent(tag, newTag, (err, result) => {
      if (err) {
        console.error('Error updating Event', err);
      }
      else {
        console.log('Event updated successfully:', result); 
      }
    });
  } 

  else if (type == "updateLocationTag") {
    //sets first element of remaining args to passed array of updated attributes and then removes that array from args
    const updatededLocationTagAttributes = args[0];
    const [newPhoto_name, newLocation] = updatededLocationTagAttributes;
    args.shift();
    const [photo_name, location] = args;

    locationtagsmgr.updateLocationTag(photo_name, location, newPhoto_name, newLocation, (err, result) => {
      if (err) {
        console.error('Error updating LocationTag', err);
      }
      else {
        console.log('LocationTag updated successfully:', result); 
      }
    });
  }
  
  else if (type == "updatePersonTag") {
    //sets first element of remaining args to passed array of updated attributes and then removes that array from args
    const updatededPersonTagAttributes = args[0];
    const [newPhoto_name, newName, newAge, newBirthplace] = updatededPersonTagAttributes;
    args.shift();
    const [photo_name, name, age, birthplace] = args;

    persontagsmgr.updatePersonTag(photo_name, name, age, birthplace, newPhoto_name, newName, newAge, newBirthplace, (err, result) => {
      if (err) {
        console.error('Error updating PersonTag', err);
      }
      else {
        console.log('PersonTag updated successfully:', result); 
      }
    });
  }  

  else if (type == "updateShows") {
    //sets first element of remaining args to passed array of updated attributes and then removes that array from args
    const updatededShowsAttributes = args[0];
    const [newPhoto_name, newTag] = updatededShowsAttributes;
    args.shift();
    const [photo_name, tag] = args;

    showsmgr.updateShows(photo_name, tag, newPhoto_name, newTag, (err, result) => {
      if (err) {
        console.error('Error updating Shows', err);
      }
      else {
        console.log('Shows updated successfully:', result); 
      }
    });
  }  

  //DELETE OPERATIONS:

  else if (type == "deletePerson") {
    const [ name, age, birthplace ] = args;

    // Call the deletePerson function with the person details
    personmgr.deletePerson( name, age, birthplace , (err, result) => {
        if (err) {
            console.error('Error deleting person:', err);
            // Handle the error as needed, perhaps send an error message back to the front-end
        } else {
            console.log('Person deleted successfully:', result);
        }
    });
  }

  else if (type == "deleteAllPersons") {
    personmgr.deleteAllPersons((err, result) => {
        if (err) {
            console.error('Error deleting all persons:', err);
            // Handle the error as needed, perhaps send an error message back to the front-end
        } else {
            console.log('All persons deleted successfully:', result);
        }
    });
  }

  else if (type == "deleteLocation") {
    const [locationName] = args;

    locationmgr.deleteLocation(locationName, (err, result) => {
        if (err) {
            console.error('Error deleting location:', err);
            // Handle the error as needed, perhaps send an error message back to the front-end
        } else {
            console.log('Location deleted successfully:', result);
        }
    });
  }

  else if (type == "deleteAllLocations") {
    locationmgr.deleteAllLocations((err, result) => {
        if (err) {
            console.error('Error deleting all locations:', err);
            // Handle the error as needed, perhaps send an error message back to the front-end
        } else {
            console.log('All locations deleted successfully:', result);
        }
    });
  }

  else if (type == "deletePhoto") {
    const [photo_name] = args;

    photomgr.deletePhoto(photo_name, (err, result) => {
        if (err) {
            console.error('Error deleting photo:', err);
        } else {
            console.log('Photo deleted successfully:', result);
        }
    });
  }

  else if (type == "deleteAllPhotos") {
    photomgr.deleteAllPhotos((err, result) => {
        if (err) {
            console.error('Error deleting all photos:', err);
            // Handle the error as needed, perhaps send an error message back to the front-end
        } else {
            console.log('All photos deleted successfully:', result);
        }
    });
  }

  else if (type == "deleteEvent") {
    const [tag] = args;

    eventtagmgr.deleteEvent(tag, (err, result) => {
        if (err) {
            console.error('Error deleting event:', err);
        } else {
            console.log('Event deleted successfully:', result);
        }
    });
  }

  else if (type == "deleteAllEvents") {
    eventtagmgr.deleteAllEvents((err, result) => {
        if (err) {
            console.error('Error deleting all events:', err);
        } else {
            console.log('All events deleted successfully:', result);
        }
    });
  }

  else if (type == "deletePersonTag") {
    const [photo_name, name, age, birthplace] = args;

    persontagsmgr.deletePersonTag(photo_name, name, age, birthplace, (err, result) => {
        if (err) {
            console.error('Error deleting person tag:', err);
        } else {
            console.log('Person tag deleted successfully:', result);
        }
    });
  }

  else if (type == "deleteAllPersonTags") {
    persontagsmgr.deleteAllPersonTags((err, result) => {
        if (err) {
            console.error('Error deleting all person tags:', err);
        } else {
            console.log('All person tags deleted successfully:', result);
        }
    });
  }

  else if (type == "deleteLocationTag") {
    const [photo_name, locationName] = args;

    locationtagsmgr.deleteLocationTag(photo_name, locationName, (err, result) => {
        if (err) {
            console.error('Error deleting location tag:', err);
        } else {
            console.log('Location tag deleted successfully:', result);
        }
    });
  }

  else if (type == "deleteAllLocationTags") {
    locationtagsmgr.deleteAllLocationTags((err, result) => {
        if (err) {
            console.error('Error deleting all location tags:', err);
        } else {
            console.log('All location tags deleted successfully:', result);
        }
    });
  }

  else if (type == "deleteShows") {
    const [photo_name, tag] = args;

    showsmgr.deleteShows(photo_name, tag, (err, result) => {
        if (err) {
            console.error('Error deleting shows:', err);
        } else {
            console.log('Shows deleted successfully:', result);
        }
    });
  }

  else if (type == "deleteAllShows") {
    showsmgr.deleteAllShows((err, result) => {
        if (err) {
            console.error('Error deleting all shows:', err);
        } else {
            console.log('All shows deleted successfully:', result);
        }
    });
  }


  
   
  /* 
   
  READ OPERATIONS 
  
  */

  
  /* Table 1: Person Table */

  // Get all persons
  else if (type == "getAllPersons") {
    // IPC Listener to fetch a person by name
    personmgr.getAllPersons( (error, data) => {
        if (error) {
          console.error('Error fetching all persons:', err)
          event.reply('getAllPersons response', { success: false, message: error.message });
        } else {
            event.reply('getAllPersons response', { success: true, data: data });
        }
      });
  }

  // get person by Name
  else if (type == "getPersonbyName") {
    const [name] = args
    // IPC Listener to fetch a person by name
    personmgr.getAllPersons(name, (error, data) => {
        if (error) {
          console.error('Error fetching persons by name:', error)
          event.reply('getPersonsbyName response', { success: false, message: error.message });
        } else {
            event.reply('getPersonsbyName response', { success: true, data: data });
        }
      });
  }

  /* Table 2:Photo Table */

  // Get all photo details 
  else if( type == "getPhotoDetails") {
    //IPC listener
    photomgr.getPhotoDetails((error, data) => {
      if(error) {
        console.error('Error fetching photo details:', error)
        event.reply('getPhototDetails response', { success: false, message: error.message});
      } else {
          event.reply('getPhotoDetails response', { success: true, data: data });
      }
    });
  }

  else if (type == "getPhotoNames"){
    //IPC Listener to get Photo Names
    photomgr.getPhotoNames((error,data) => {
      if (error) {
        console.error('Error fetching Photo names:', err)
        event.reply('getPhotoNames response', { success: false, message: error.message });
      } else {
          event.reply('getPhotoNames response', { success: true, data: data });
      }
    })
  }

  
  /* Table 3: Location Table */

  // Read all locations
  else if (type == "getAllLocations"){
    //IPC Listener to get all locations
    locationmgr.getAllLocations((error,data) => {
      if (error) {
        console.error('Error fetching Locations:', err)
        event.reply('getAllLocation response', { success: false, message: error.message });
      } else {
          event.reply('getAllLocation response', { success: true, data: data });
      }
    })
  } 
  
  // DO WE NEED MORE GET Functions? Get locationAddress?


  /* Table 4: EventTag Table */

  // Read all eventtags
  else if (type == "getAllEventTags"){
    //IPC Listener to get all locations
    eventtagmgr.getAllEventTags((error,data) => {
      if (error) {
        console.error('Error fetching all event tags:', err)
        event.reply('getAllEventTags response', { success: false, message: error.message });
      } else {
          event.reply('getAllEventTags response', { success: true, data: data });
      }
    })
  } 

  // DO WE NEED MORE GET Functions for this table? Get eventID?


  // RELATIONSHIP TABLES
  /* Table 5: location tags Table */

  // Read all Location Tags
  else if (type == "getLocationTags"){
    //IPC Listener to get all locations
    locationmgr.getAllEventTags((error,data) => {
      if (error) {
        console.error('Error fetching all locaton tags:', err)
        event.reply('getAllLocationTags response', { success: false, message: error.message });
      } else {
          event.reply('getAllLocationTags response', { success: true, data: data });
      }
    })
  } 


  /* Table 6: Relationship Table */

  // Read all Relationships
  else if (type == "getAllRelationships"){
    //IPC Listener to get all relationships
    relationshipmgr.getAllRelationships((error,data) => {
      if (error) {
        console.error('Error fetching all relationships:', err)
        event.reply('getAllRelationships response', { success: false, message: error.message });
      } else {
          event.reply('getAllRelationships response', { success: true, data: data });
      }
    })
  } 

  // DO WE NEED MORE GET Functions for this table?


  /* Table 7: Person Tags Table */

  else if (type == "getAllTags"){
    //IPC Listener to get all person tags
    persontagsmgr.getAllTags((error,data) => {
      if (error) {
        console.error('Error fetching all person tags:', err)
        event.reply('getAllTags (person) response', { success: false, message: error.message });
      } else {
          event.reply('getAllTags (person) response', { data });
      }
    })
  } 

  


  


  //console.log("front-end sent:", args);
   
},

/*
* READ OPERATIONS USING recieveDB
*
*
*/

ipcMain.handle("receiveDB", async (event, args) => {
  const type = args[0];
  args.shift();

  try {
    /* Table 1: Person Table */

    // Handle getting all persons
    if (type === "getAllPersons") {
      return new Promise((resolve, reject) => {
        personmgr.getAllPersons((error, data) => {
          if (error) {
            reject(new Error('Error fetching all persons: ' + error.message));
          } else {
            //window.TreeAPI.logReply("Success gettingAllPersons")
            resolve({ success: true, data: data });
          }
        });
      });
    }

    // Handle getting a person by name
    else if (type === "getPersonsbyName") {
      
      return new Promise((resolve, reject) => {
        //window.TreeAPI.logReply("Hi 1");
        const name = args[0];
        //window.TreeAPI.logReply("Hi 2");
        personmgr.getPersonsbyName(name, (error, data) => {
          if (error) {
            window.TreeAPI.logReply("NO");
            reject(new Error('Error fetching persons by name: ' + error.message));
          } else {
            //window.TreeAPI.logReply("HEY YES");
            resolve({ success: true, data: data });
          }
        });
      });
    }
    // Handle getting a person by name, birthplace
    else if (type === "getPersonsbyNameAndBirthplace") {
      const name = args[0];
      const birthplace = args[1];
      return new Promise((resolve, reject) => {
        personmgr.getPersonsbyNameAndBirthplace(name, birthplace, (error, data) => {
          if (error) {
            reject(new Error('Error fetching persons by name and birthplace: ' + error.message));
          } else {
              if (data) {
                resolve({ success: true, data: data });
              } else {
                // If data is empty but not an error, handle this case
                resolve({ success: false, message: "No data found for the given criteria." });
              }
          }
        });
      });
    }

    // Get person by name, age, birthplace
    else if (type === "getPersonsbyNameAgeBirthPlace") {
      const name = args[0];
      const age = args[1];
      const birthplace = args[2];
      return new Promise((resolve, reject) => {
        personmgr.getPersonsbyNameAgeBirthplace(name, age, birthplace, (error, data) => {
          if (error) {
            reject(new Error('Error fetching persons by name, age and birthplace: ' + error.message));
          } else {
              if (data) {
                resolve({ success: true, data: data });
              } else {
                // If data is empty but not an error, handle this case
                resolve({ success: false, message: "No data found for the given criteria." });
              }
          }
        });
      });
    }


    /* Table 2:Photo Table */

    // Handle getting all photo details
    else if (type === "getPhotoDetails") {
      return new Promise((resolve, reject) => {
        photomgr.getPhotoDetails((error, data) => {
          if (error) {
            reject(new Error('Error fetching photo details: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    // Handle getting photo names
    else if (type === "getPhotoNames") {
      return new Promise((resolve, reject) => {
        photomgr.getPhotoNames((error, data) => {
          if (error) {
            reject(new Error('Error fetching photo names: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    // Handle getting photo what
    else if (type === "getPhotoWhat") {
      return new Promise((resolve, reject) => {
        photomgr.getPhotoWhat((error, data) => {
          if (error) {
            reject(new Error('Error fetching photo what: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    // Handle getting photo details given photo name
    else if (type === "getPhotoDetailsWithName") {
      const name = args[0];
      return new Promise((resolve, reject) => {
        photomgr.getPhotoDetailsWithName(name, (error, data) => {
          if (error) {
            reject(new Error('Error fetching photo what: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    /* Table 3: Location Table */

    // Handle getting all locations
    else if (type === "getAllLocations") {
      return new Promise((resolve, reject) => {
        locationmgr.getAllLocations((error, data) => {
          if (error) {
            reject(new Error('Error fetching locations: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    // Handle getting all locations
    else if (type === "getAddressWithName") {
      locationName = args[0];
      return new Promise((resolve, reject) => {
        locationmgr.getAddressWithName(locationName, (error, data) => {
          if (error) {
            reject(new Error('Error fetching address with location name: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    /* Table 4: EventTag Table */

    // Handle getting all event tags
    else if (type === "getAllEventTags") {
      return new Promise((resolve, reject) => {
        eventtagmgr.getAllEventTags((error, data) => {
          if (error) {
            reject(new Error('Error fetching all event tags: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    // RELATIONSHIP TABLES
    /* Table 5: location tags Table */

    // Handle getting all location tags
    else if (type === "getAllLocationTags") {
      return new Promise((resolve, reject) => {
        locationtagsmgr.getAllLocationTags((error, data) => {
          if (error) {
            reject(new Error('Error fetching all location tags: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    // Handle getting all location of a photo given photo name
    else if (type === "getPhotoLocation") {
      const photoName = args[0];
      return new Promise((resolve, reject) => {
        locationtagsmgr.getPhotoLocation(photoName, (error, data) => {
          if (error) {
            reject(new Error('Error fetching location of photo given its name: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    // Handle getting photo name of a photo given location
    else if (type === "getPhotoNameWithLocation") {
      const location2 = args[0];
      return new Promise((resolve, reject) => {
        locationtagsmgr.getPhotoNameWithLocation(location2, (error, data) => {
          if (error) {
            reject(new Error('Error fetching name of photo given its location: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    /* Table 6: Relationship Table */

    // Handle getting all relationships
    else if (type === "getAllRelationships") {
      return new Promise((resolve, reject) => {
        relationshipmgr.getAllRelationships((error, data) => {
          if (error) {
            reject(new Error('Error fetching all relationships: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

      /* Table 7: Person Tags Table */

    // Handle getting all person tags
    else if (type === "getAllTags") {
      return new Promise((resolve, reject) => {
        persontagsmgr.getAllTags((error, data) => {
          if (error) {
            reject(new Error('Error fetching all person tags: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    // Handle getting all names of tagged person given photoname
    else if (type === "getAllNamesTaggedGivenPNAME") {
      const photo_name = args[0];
      return new Promise((resolve, reject) => {
        persontagsmgr.getAllNamesTaggedGivenPNAME(photo_name, (error, data) => {
          if (error) {
            reject(new Error('Error fetching all names tagged given a photo name: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

    // Handle getting all tagged person details given pname
    else if (type === "getAllTaggedDetailsGivenPNAME") {
      const photo_name = args[0];
      return new Promise((resolve, reject) => {
        persontagsmgr.getAllTaggedDetailsGivenPNAME(photo_name, (error, data) => {
          if (error) {
            reject(new Error('Error fetching all tagged person details given a photo name: ' + error.message));
          } else {
            resolve({ success: true, data: data });
          }
        });
      });
    }

  } catch (error) {
    console.error('Error fetching:', error);
    return { success: false, message: error.message };
  }
}));


//this one is just a logger anyways
ipcMain.on("log-reply", (event, args) => {
  console.log("\x1b[4m\x1b[34m%s\x1b[0m", "BACKEND-LOG:", args);
});

ipcMain.on("warn-reply", (event, args) => {
  console.log("\x1b[4m\x1b[33m%s\x1b[0m", "BACKEND-WARN:", args);
}); 

ipcMain.on("err-reply", (event, args) => {
  console.log("\x1b[4m\x1b[31m%s\x1b[0m", "BACKEND-ERR:", args);
});

ipcMain.on("fatal-reply", (event, args) => {
  console.log("\x1b[41m\x1b[4m\x1b[30m%s\x1b[0m", "BACKEND-FATAL:", args);
});



//New stuff (please take a look lol)
  ipcMain.on('insert-person', (event, personData) => {
  personmgr.addPerson(personData, (error, data) => {
    if (error) {
      event.reply('insert-person-response', { success: false, message: error.message });
    } else {
      event.reply('insert-person-response', { success: true, data: data });
    }
  });
});


ipcMain.handle('database-query', async (event, { type, params }) => {
  try {
    switch (type) {
      case 'getAllPersons':
        return await new Promise((resolve, reject) => {
          personmgr.getAllPersons((error, data) => {
            if (error) reject(error);
            else resolve(data);
          });
        });
      // Add more cases for different types of queries as needed
      default:
        throw new Error('Unknown query type');
    }
  } catch (error) {
    console.error('Error processing database query:', error);
    throw error;
  }
});