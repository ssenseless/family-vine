const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  createMedia: () => ipcRenderer.invoke('Media::createMedia'),
  getMedia: () => ipcRenderer.invoke('Media::getMedia'),
})
