const { ipcRenderer, contextBridge } = require("electron");

/**
 * contextBridge allows us controlled, secure, two-way IPC communication
 * with the front-end through an API that becomes attached to the window
 * object.
 * bear in mind none of this api will come up on your intellisense, so
 * you will have to understand the implementations yourself.
 * examples of general implementations in Home.js
 */
contextBridge.exposeInMainWorld("TreeAPI", {
  /**
   * front-end sending request for database data,
   * we process the data here (import db functions),
   * and send the information back through the
   * passed callback function
   *
   * @param {*} callback  front-end db handling function
   *                      (our means of communication back to front-end)
   * @param {*} args      some modifier, maybe sql code, so the back-end
   *                      knows what to retrieve/process in the db
   */
  receiveDB: (callback, args) => {
    //TODO: use args to get requested data, store it, send it back via callback
  },

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
   * when the front-end needs to send data to be put into/removed
   * from the database, rather than retrieved from it
   *
   * (in electron.js it will just run SQL code, insertion/deletion are the same)
   *
   * @param {*} args (prob sql code) that needs to be entered into the db
   */
  sendDB: (args) => ipcRenderer.send("send-db", args)
});
