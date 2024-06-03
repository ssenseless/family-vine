import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
//import { getAllPersons } from "../../public/models/personmgr";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState(["birthday", "wedding", "selfie"]); // Initialize with default tags
  // Updated state structure to reflect the required information
  const [values, setValues] = useState({
    who: "",
    when: "",
    where: "",
    tags: [], // This will hold our 'What' and 'Why' tags
    newTag: '',
    age: '', // Add age field
    birthplace: '', // Add birthplace field
    parent: '', // Add parent field
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all tags from the backend on component mount
    window.TreeAPI.receiveDB('getAllEventTags')
      .then(response => {
        if (response.success && response.data) {
          const allTags = response.data.map(tag => tag.tag); // Assuming 'tag' is the property holding the tag name
          const uniqueTags = Array.from(new Set(allTags.flatMap(tag => tag.split(',').map(t => t.trim())))); // Split strings at comma and get unique tags
          setTags((prevTags) => [...new Set([...prevTags, ...uniqueTags])]); // Combine with pre-existing tags and remove duplicates
        }
      })
      .catch(error => {
        console.error("Failed to fetch event tags:", error);
      });
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Initialize values here if necessary, or leave it to user input
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };


  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      formData.append("who", values.who);
      formData.append("when", values.when);
      formData.append("where", values.where);
      formData.append("tags", values.tags.join(", "));
      formData.append("address", values.where2);
      formData.append("age", values.age);
      formData.append("birthplace", values.birthplace);
      formData.append("parent", values.parent);

      //IPC call to backend to handle the file upload:
      //Adds Photo
      window.TreeAPI.sendDB(['addPhoto', selectedFile.name, formData.get("tags"), formData.get("when")]);

      //Adds Location
      window.TreeAPI.sendDB(['addLocation', formData.get("where"), formData.get("when")]);
      
      // Add person 
      // const args1 = ["addPerson", "name2", "age1", "birthplace1" ];
      window.TreeAPI.sendDB(['addPerson', formData.get("who"), formData.get("age"), formData.get("birthplace")]);

      //Add event
      window.TreeAPI.sendDB(['addEventTag', formData.get("tags")]);

      //Location Tag Relationship
      // const locationTag1 = ["addLocationTag", "photoName1", "House5"];
      window.TreeAPI.sendDB(["addLocationTag", selectedFile.name, formData.get("where") ]);

      // SHOWS relationsip
      // const shows1 = ["addShows", "photoName1", "tag1"];
      window.TreeAPI.sendDB(["addShows", selectedFile.name, formData.get("tags") ]);

      //Person Tag Relationship
      //const personTag = ;
      window.TreeAPI.sendDB(["addPersonTag", selectedFile.name, formData.get("who"), formData.get("age"), formData.get("birthplace")])
      
      console.log("Uploading", selectedFile);
      console.log("With values", values);
    } 
};
 
  const communicationShowcase = () => {
    /**
     * for now, sends a value that goes all the way
     * back to the main electron.js file. it looks like
     * it just logs but this will allow us to handle/save
     * all of our user-entered info on the main back-end
     * and into the db
     */
    //window.TreeAPI.sendDB("hi i want to send this to the database");


    //DO NOT DELETE ***************************************
    //For now: just uncomment any desired insertion block below 
    //Because: It basically mimics user inputting values manually

    //MANUAL DUMMMY INSERTIONS:
    //Insertions to entities
    // const args1 = ["addPerson", "name2", "age1", "birthplace1" ];
    // window.TreeAPI.sendDB(args1);
  
    // const location1 = ["addLocation", "House5", "100 W Brooke St"];
    // window.TreeAPI.sendDB(location1);

    //  const photo1 = ["addPhoto", "photoName1", "what 1", "Jan 1, 1900"];
    //  window.TreeAPI.sendDB(photo1);

    // //Needs to be modified to where tag is primary key
    // const event1 = ["addEventTag", "tag1"];
    // window.TreeAPI.sendDB(event1);
 

    // // //Insertions to relationships
    // const locationTag1 = ["addLocationTag", "photoName1", "House5"];
    // window.TreeAPI.sendDB(locationTag1);
 
    // //Needs to be modified to where it uses a person's name,age, birthplace to create tag to photo
    // const personTag1 = ["addPersonTag", "photoName1", "name2", "age1", "birthplace1"];
    // window.TreeAPI.sendDB(personTag1);

    // //Needs to be modified to event's tag attribute is used to create shows relationship between a photo and event
    // const shows1 = ["addShows", "photoName1", "tag1"];
    // window.TreeAPI.sendDB(shows1);

    /*---------------------------------------------------------- 
    
     

    //NEED TO DISCUSS HOW WE ARE GOING TO DO THIS
    /*I have an idea: We could assign each person a 'generation' 
    *which, as the name suggests, that person's generation in a family.
    *So the oldest member: gen 0, their kids: gen 1, so on...
    *
    * This information can be stored in person/relationship and can be helpful
    * in displaying the family tree. For example, if a user wants to just look at
    * his/her family tree starting from their grandparents, we could just do something
    * where we subtract the number of his/her generation(let's say 5) by 2, to start 
    * displaying a family tree from their granparents. Idea may be incomplete but I think
    * it's worth discussing. 
    *
    *
    // const relationship1 = ["addRelationship", "photoName1", "12"];
    // window.TreeAPI.sendDB(personTag1);
    */


    //UPDATE DUMMY FUNCTIONS:

    //for now: once app runs, then uncomment any update black below for desired member update.
    //reason: because if these are left uncommented, once app is running and when "show IPC..." is clicked, app will add member
    //and immediately update the member, making it difficult to see if a desired member is even updated.


    //****************DO NOT DELETE: ***************************************
    //Updating Entities

    //Update Person
    // const updatedAttributes = ["name10", "age2", "birtplace10"];
    // const personUpdate1 = ["updatePerson", updatedAttributes, "name2", "age1", "birthplace1"];
    // window.TreeAPI.sendDB(personUpdate1); 

    //Update Location
    // const updatedLocationAttributes = ["House7", "5000 W Brooke St"];
    // const locationUpdate1 = ["updateLocation", updatedLocationAttributes, "House5"];
    // window.TreeAPI.sendDB(locationUpdate1);  

    //Update Photo
    // const updatedPhotoAttributes = ["photoName1-1", "what2", "Jan 1, 2049"];
    // const photoUpdate1 = ["updatePhoto", updatedPhotoAttributes, "photoName1"];
    // window.TreeAPI.sendDB(photoUpdate1);  

    //Update Event
    // const updatedeEventAttributes = ["tag3"];
    // const eventUpdate1 = ["updateEvent", updatedeEventAttributes, "tag1"];
    // window.TreeAPI.sendDB(eventUpdate1); 

    //Updating Relationships
    //DO NOT USE THESE******************
    //Update locationTag
    // const updatededLocationTagAttributes = ["photoName1", "House3-1"];
    // const locationTagUpdate1 = ["updateLocationTag", updatededLocationTagAttributes, "photoName1", "House3"];
    // window.TreeAPI.sendDB(locationTagUpdate1);

    //Update personTag
    // const updatededPersonTagAttributes = ["photo_name1", "name3", "age4", "birthplace3"];
    // const personTagUpdate1 = ["updatePersonTag", updatededPersonTagAttributes, "photoName1", "name2", "age2", "birthplace2"];
    // window.TreeAPI.sendDB(personTagUpdate1);

    //Update shows
    // const updatededShowsAttributes = ["photo_name1", "tag2"];
    // const showsUpdate1 = ["updateShows", updatededShowsAttributes, "photoName1", "tag1"];
    // window.TreeAPI.sendDB(showsUpdate1);
 



    //DELETE FUNCTIONS**********************

    //Delete Person
    // const deletePerson = ["deletePerson", "name10", "age2", "birtplace10" ];
    // window.TreeAPI.sendDB(deletePerson);

    //Delete all Persons
    // const deleteAllPersons = ["deleteAllPersons"];
    // window.TreeAPI.sendDB(deleteAllPersons);

    //Delete Location
    // const deleteLocation = ["deleteLocation", "House1"];
    // window.TreeAPI.sendDB(deleteLocation);

    //Delete all locations
    // const deleteAllLocations = ["deleteAllLocations"];
    // window.TreeAPI.sendDB(deleteAllLocations);

    //Delete Photo
    // const deletePhoto = ["deletePhoto", "photoName4"];
    // window.TreeAPI.sendDB(deletePhoto);

    //Delete all photos
    // const deleteAllPhotos = ["deleteAllPhotos"];
    // window.TreeAPI.sendDB(deleteAllPhotos);

    //Delete Event
    // const deleteEvent = ["deleteEvent", "tag2"];
    // window.TreeAPI.sendDB(deleteEvent);

    //Delete all events
    // const deleteAllEvents = ["deleteAllEvents"];
    // window.TreeAPI.sendDB(deleteAllEvents);

    //Delete PersonTag
    // const deletePersonTag = ["deletePersonTag", "photoName5", "name3", "age4", "birthplace3"];
    // window.TreeAPI.sendDB(deletePersonTag);

    //Delete all persontags
    // const deleteAllPersonTags= ["deleteAllPersonTags"];
    // window.TreeAPI.sendDB(deleteAllPersonTags);

    //Delete LocationTag
    // const deleteLocationTag = ["deleteLocationTag", "photoName2", "House7"];
    // window.TreeAPI.sendDB(deleteLocationTag);

    //Delete all locationTags
    // const deleteAllLocationTags= ["deleteAllLocationTags"];
    // window.TreeAPI.sendDB(deleteAllLocationTags);

    //Delete LocationTag
    // const deleteShows = ["deleteShows", "photoName2", "tag3"];
    // window.TreeAPI.sendDB(deleteShows);

    //Delete all Shows
    // const deleteAllShows= ["deleteAllShows"];
    // window.TreeAPI.sendDB(deleteAllShows);



    










     
    
  
    /**
     * this one is a tad more complicated (bordering on hacky)
     *
     * the first parameter of this function is a callback function
     * that we utilize AFTER we process what we need from the db
     *
     * the second is the actual parameter (probably will be SQL code)
     * that we want the db to process and send back the information from
     *
     * the actual generic workflow of this will be that you will fill this
     * with:
     * (1) a function that will execute as if it has the SQL data it desires,
     * and (2) SQL code for the back-end to process and put the result into (1)
     *
     * I hope that makes sense, it took me forever to understand this myself so
     * just dm me if u need
     */



    /*
    * READ DUMMY FUNCTIONS
    *
    * *
    * 
    * 
    */

    /* PERSON TABLE */ 
    // //no1-- Working
    // let val = 'getAllPersons';
    // window.TreeAPI.receiveDB(val).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });
    
     
    // //no2 -- WORKING
    //  let val3 = 'getPersonsbyName';
    //  let personName = 'Baseer'; // Example person name to fetch
    //  window.TreeAPI.receiveDB(val3, personName).then(value => {
    //    window.TreeAPI.logReply("Front-end sends: " + val3 + " for " + personName);
    //    window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    //  }).catch(error => {
    //    window.TreeAPI.logReply("Error: (Home.js) (getPersonsbyName) " + error.message);
    //  });
 
    // //no2.b -- WORKING
    // let val22 = 'getPersonsbyNameAndBirthplace';
    // let personName2 = 'Baseer'; // Example person name to fetch
    // let birthplace = 'India';
    // window.TreeAPI.receiveDB(val22, personName2, birthplace).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val22 + " for name: " + personName2 + " & birthplace: " + birthplace);
    //   //window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    //   if (value.success) {
    //     window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value.data));
    //   } else {
    //     window.TreeAPI.logReply("No data or error: " + value.message);
    //   }}).catch(error => {
    //   window.TreeAPI.logReply("Error (home.js) (getPersonsbyNameAndBirthday): " + error.message);
    // });

    // //no2.c -- WORKING
    // let val23 = 'getPersonsbyNameAgeBirthplace';
    // let personName3 = 'Baseer'; // Example person name to fetch
    // let birthplace3 = 'India';
    // let age3 = 22;
    // window.TreeAPI.receiveDB(val23, personName3, age3, birthplace3).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val23 + " for name: " + personName3 + ", age: " + age3 + " & birthplace: " + birthplace);
    //   //window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    //   if (value.success) {
    //     window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value.data));
    //   } else {
    //     window.TreeAPI.logReply("No data or error: " + value.message);
    //   }}).catch(error => {
    //   window.TreeAPI.logReply("Error (home.js) (getPersonsbyNameAgeBirthday): " + error.message);
    // });


    /* PHOTO TABLE */ 

    // //no 3 - WORKING
    // let val2 = 'getPhotoDetails';
    // window.TreeAPI.receiveDB(val2).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val2);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });

    
    //no 4 --WORKING
    let val4 = 'getPhotoNames';
    window.TreeAPI.receiveDB(val4).then(value => {
      window.TreeAPI.logReply("Front-end sends: " + val4);
      window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    }).catch(error => {
      window.TreeAPI.logReply("Error: " + error.message);
    });

    // // --WORKING
    // let val41 = 'getPhotoWhat';
    // window.TreeAPI.receiveDB(val41).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val41);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });

    // // --WORKING
    // let val42 = 'getPhotoDetailsWithName';
    // let photo_name2 = 'photoName2'
    // window.TreeAPI.receiveDB(val42, photo_name2).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val42);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });


    /* LOCATION TABLE */ 

    // // no 5 -- WORKING
    // let val6 = 'getAllLocations';
    // window.TreeAPI.receiveDB(val6).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val6);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });

    //  // no 5 -- WORKING
    // let val61 = 'getAddressWithName';
    // let locationName = 'House2';
    // window.TreeAPI.receiveDB(val61, locationName ).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val61);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });



    /* EVENTTAG TABLE */ 

    // // No 6 -- WORKING
    // let val7 = 'getAllEventTags';
    // window.TreeAPI.receiveDB(val7).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val7);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });

    /* Location Tags TABLE */ 

    // // No7 -- WORKING
    // let val81 = 'getAllLocationTags';
    // window.TreeAPI.receiveDB(val81).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val81);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });

    // //  -- WORKING
    // let val82 = 'getPhotoLocation';
    // let photoName4 = 'photoName1';
    // window.TreeAPI.receiveDB(val82, photoName4).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val82);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });

    // //  -- WORKING
    // let val83 = 'getPhotoNameWithLocation';
    // let location4 = 'House3-1';
    // window.TreeAPI.receiveDB(val83, location4).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val83);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });
    

    /* RELATIONSHIP TABLE */ 

    // // No7 -- WORKING
    // let val8 = 'getAllRelationships';
    // window.TreeAPI.receiveDB(val8).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val8);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });

    
    /* PESRSONTAGS TABLE */ 

    // // No 8 -- Working
    // let val9 = 'getAllTags';
    // window.TreeAPI.receiveDB(val9).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val9);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });

    // -- Working
    let val91 = 'getAllNamesTaggedGivenPNAME';
    let pname = '1.jpg'
    window.TreeAPI.receiveDB(val91, pname).then(value => {
      window.TreeAPI.logReply("Front-end sends: " + val91);
      window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    }).catch(error => {
      window.TreeAPI.logReply("Error: " + error.message);
    });

    //  // -- Working
    // let val92 = 'getAllTaggedDetailsGivenPNAME';
    // let pname2 = 'photoName2'
    // window.TreeAPI.receiveDB(val92, pname2).then(value => {
    //   window.TreeAPI.logReply("Front-end sends: " + val92);
    //   window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(value));
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });

  };

  const loggerShowcase = () => {
    window.TreeAPI.logReply("This is a log");
    window.TreeAPI.warnReply("This is a warning");
    window.TreeAPI.errReply("This is an error");
    window.TreeAPI.fatalReply("This is a fatal error");
  };
  const handleTagChange = (event) => {
    setValues({ ...values, newTag: event.target.value });
  };

  const handleSelectTag = (event) => {
    const newTag = event.target.value;
    if (newTag && !values.tags.includes(newTag)) {
      setValues(prevValues => ({ ...prevValues, tags: [...prevValues.tags, newTag] }));
    }
  };

  const handleAddNewTag = () => {
    const newTag = values.newTag.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags(prevTags => [...prevTags, newTag]); // Add new tag to global list
      setValues(prevValues => ({
        ...prevValues,
        tags: [...prevValues.tags, newTag],
        newTag: '',
      }));
      // IPC call to add new tag to the database might be needed here
    }
  };
  
  const preExistingTags = ["birthday", "wedding", "selfie"]; // Define pre-existing tags here
  return (
    <div>
      <div>
        <h1>Home</h1>
        <button onClick={communicationShowcase}>
          Click me to show IPC communication
        </button>
        <button onClick={loggerShowcase}>
          Click me to show logging functionality
        </button>
      </div>
      <input
        type="file"
        onChange={handleFileSelect}
      />
      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Selected"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
      <div>
        <input
          name="who"
          placeholder="Who is in the photo?"
          onChange={handleInputChange}
        />
        <input
          name="when"
          placeholder="When was this taken?"
          onChange={handleInputChange}
        />
        <input
          name="where"
          placeholder="Where was this taken?"
          onChange={handleInputChange}
        />
        <input
          name="where2"
          placeholder="Where was this taken2?"
          onChange={handleInputChange}
        />
        <input
          name="age" // Add input for age
          placeholder="Age of the person"
          onChange={handleInputChange}
        />
        <input
          name="birthplace" // Add input for birthplace
          placeholder="Birthplace of the person"
          onChange={handleInputChange}
        />
        <input
          name="parent" // Add input for parent
          placeholder="Parent of the person"
          onChange={handleInputChange}
        />
        <div>
          <select onChange={handleSelectTag}>
            <option value="">Select Tag</option>
            {tags.map((tag, index) => (
            <option key={index} value={tag}>{tag}</option>
          ))}
          </select>
          <input
            type="text"
            value={values.newTag}
            placeholder="New Tag"
            onChange={handleTagChange}
          />
          <button onClick={handleAddNewTag}>Add</button>
        </div>
        <div>
          <h3>Selected Tags:</h3>
          <ul>
            {values.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
        <button onClick={handleUpload}>Upload and Go to Tree</button>
      </div>
    </div>
  );
};


export default Home;