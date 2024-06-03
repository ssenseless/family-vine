import React, { Component } from "react";
import "./Tree.css"; // Assuming you will create this CSS file

class Tree extends Component {
  state = {
    images: [],
    selectedImage: null
  };

  selectImage = (image) => {
    this.setState({ selectedImage: image });
  };

  closeLightbox = () => {
    this.setState({ selectedImage: null });
  };

  componentDidMount() {
    /**
     * for now, sends a value that goes all the way
     * back to the main electron.js file. it looks like
     * it just logs but this will allow us to handle/save
     * all of our user-entered info on the main back-end
     * and into the db
     */
    
    // const args = ["name1", "age", "birthplace" ];
    // window.TreeAPI.sendDB(args);
    


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
    // window.TreeAPI.receiveDB((value) =>
    // {
    //   window.TreeAPI.logReply("value before is 4");


    //   window.TreeAPI.logReply(
    //     "value after value++ in preload.js is " + value.toString()
    //   );
    // },
   
    // 4);
    // window.TreeAPI.receiveDB((val4) => {});

    //let responses = [];

    //GET PHOTO NAMES
// Fetch photo names from the database
 const fetchPhotoNames = 'getPhotoNames';
    window.TreeAPI.receiveDB(fetchPhotoNames)
      .then(value => {
        if (value.success && value.data) {
          const photoNames = value.data.map(photo => photo.photo_name);
          return Promise.all(photoNames.map(photoName =>
            Promise.all([
              window.TreeAPI.receiveDB('getPhotoDetailsWithName', photoName),
              window.TreeAPI.receiveDB('getAllNamesTaggedGivenPNAME', photoName),
              window.TreeAPI.receiveDB('getPhotoLocation', photoName) // Fetch location tags
            ]).then(([detailsResponse, namesResponse, locationResponse]) => {
              if (detailsResponse.success && namesResponse.success && locationResponse.success) {
                return {
                  src: `images/${photoName}`,
                  alt: photoName,
                  key: photoName,
                  details: detailsResponse.data[0],
                  who: namesResponse.data.map(person => person.name),
                  locationTags: locationResponse.data.map(loc => loc.location) // Location tags array
                };
              } else {
                return null; // or handle errors more gracefully
              }
            })
          ));
        } else {
          console.log("Failed to fetch photo names or no data available");
          return [];
        }
      })
      .then(images => {
        this.setState({ images: images.filter(image => image !== null) });
      })
      .catch(error => {
        console.error("Error in fetching photo data:", error);
      });
  }
    // //GET Person NAMES
    // const { photoNames } = this.state;
    // // const pName2 = this.state.selectedImage?.src; // Adjust according to your state structure
    // // const pName3 = this.state.images.length > 0 ? this.state.images[0].src : null;
    // window.TreeAPI.receiveDB('getAllNamesTaggedGivenPNAME', pName).then(value => {
    //   if (value.success && value.data) {
    //     // Map over the data array to extract only the photo names
    //     const persons = value.data.map(person => person.name);
    //     this.setState({ persons }, () => {
    //       console.log("Person Names:", this.state.persons); // Now you have an array of names
    //     });
    //   } else {
    //     // Handle the case where no data is returned, or success is false
    //     console.log("Failed to fetch photo names or no data available");
    //   }
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });


    


      
    


    //Get Location Names
    // window.TreeAPI.receiveDB('getPhotoLocation', ).then(value => {
    //   if (value.success && value.data) {
    //     // Map over the data array to extract only the photo names
    //     const Names = value.data.map(photo => photo.photo_name);
    //     this.setState({ photoNames }, () => {
    //       console.log("Photo names2:", this.state.photoNames); // Now you have an array of names
    //     });
    //     window.TreeAPI.logReply("Front-end sends: " + val4);
    //     window.TreeAPI.logReply("Back-end responds: " + JSON.stringify(photoNames));
    //   } else {
    //     // Handle the case where no data is returned, or success is false
    //     console.log("Failed to fetch photo names or no data available");
    //   }
    // }).catch(error => {
    //   window.TreeAPI.logReply("Error: " + error.message);
    // });

    
  

    render() {
      const { images, selectedImage } = this.state;
      return (
        <div>
          <h2>Tree</h2>
          <div className="image-grid">
            {images.map((image) => (
              <div key={image.key} className="image-container" onClick={() => this.selectImage(image)}>
                <img src={image.src} alt={`This is ${image.alt}`} />
                <div className="text-box top-left">{image.details.when_taken}</div>
                <div className="text-box top-right">{image.locationTags.join(", ")}</div>  {/* Display location tags */}
                <div className="text-box bottom-left">{image.who.join(", ")}</div>
                <div className="text-box bottom-right">{image.details.what}</div>
              </div>
            ))}
          </div>
          {selectedImage && (
            <div className="lightbox" onClick={this.closeLightbox}>
              <div className="image-content">
                <img src={selectedImage.src} alt="Selected" />
                <div className="details">
                  <p>Who: {selectedImage.who.join(", ")}</p>
                  <p>When: {selectedImage.details.when_taken}</p>
                  <p>Where: {selectedImage.locationTags.join(", ")}</p>  {/* Display location tags */}
                  <p>What/Why: {selectedImage.details.what}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }
  
  export default Tree;