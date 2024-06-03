const { ipcRenderer, contextBridge } = require("electron");
//const photomgr = require("./models/personmgr");


// const get_photoNames = () => {
//   console.log("Preload > get_photoNames");
//   return photomgr.get_photoNames();
// }
// contextBridge.exposeInMainWorld("TreeApi", {

//   get_photoNames: get_photoNames

// })




/**
 * contextBridge allows us controlled, secure, two-way IPC communication
 * with the front-end through an API that becomes attached to the window
 * object.
 * bear in mind none of this api will come up on your intellisense, so
 * you will have to understand the implementations yourself.
 * i've written example code in /src/components/Tree.js of some basic
 * implementations so you're not completely on your own
 */
contextBridge.exposeInMainWorld("TreeAPI", {
  /**
   * front-end sending request for database data,
   * we process the data here (import db functions),
   * and send the information back through the
   * passed callback function
   *
   * 
   * 
   * @param {*} callback  front-end db handling function
   *                      (our means of communication back to front-end)
   * @param {*} args  some modifier, maybe sql code, so the back-end
   *                  knows what to retrieve/process in the db
   */
  //  receiveDB: (callback, args) => {
  //    args++;
  //    callback(args);
    
    receiveDB: (type, ...params) => {
      return ipcRenderer.invoke('receiveDB', [type, ...params]);
    
  },

  
  
  //New stuff (please take a look lol)
  // insertPerson: (personData, callback) => {
  //   ipcRenderer.send('insert-person', personData);
  //   ipcRenderer.once('insert-person-response', (_, arg) => {
  //     callback(arg);
  //   });
  // },

  /**
   * currently being used in the above-mentioned callback function
   * to send information back after db calls. probably unnecessary
   * but never bad to have a generic response function. logging?
   *
   * @param {*} args what is to be logged
   */
  logReply: (args) => ipcRenderer.send("log-reply", args),

  warnReply: (args) => ipcRenderer.send("warn-reply", args),

  errReply: (args) => ipcRenderer.send("err-reply", args),

  fatalReply: (args) => ipcRenderer.send("fatal-reply", args),

  /**
   * when the front-end needs to send data to be put
   * into the database, rather than retrieved from it
   *
   * @param {*} args (prob sql code) that needs to be entered into the db
   */
  sendDB: (args) => ipcRenderer.send("send-db", args)
});




