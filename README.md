## Update (2024-04-28) - from DB branch
Database mgr files are complete and set up. The Database works smoothly.
The Create operations are complete in electron.js, and tested in home.js.
RUD Operations are still being worked on, some are already written but need to be tested.
## Database Update (2024-03-09) 

Started implementation for database:

-Created  'models' folder which contains manager files for the entities. 
    -Each manager file basically manages query code for its respective entity

-Added some new code for 'insert-person' query in electron.js and preload.js. However, it really needs to be looked at before moving on for other queries. 

- The following files/tables reference foreign keys, which means we need to ensure chorological creation 
so that nothing gets messed up. persontagsmgr.js , loactiontagsmgr.js

## Update (2024-02-26)

I have updated all of the below and automated the .json so all you need to get the dev enviro up and running are the following

- git clone the repo

- npm i

- npm run dev (opens react on port 3000, then waits for that to be available before launching electron concurrently)

if the above doesn't work, check your node version is the latest, and if not ask me specifically (carson) and I can potentially help because it is probably just a version control issue with one of the dependencies

## dependencies (running list) [depr]

- npm i electron

- npm i electron-builder

- npm i electron-is-dev@2.0.0

- npm i nodemon

- npm i concurrently

- npm i wait-on

- npm i sqlite3@5.1.6

- npm i --save-dev cross-env

- everything from react

## possible dependencies [depr]

- npm i resize-img

## need to run [depr]

- npm run postinstall



