const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');

//Zum Starten des Servers
app.listen(1337, () => {
     console.log("Server gestartet...");

     fs.readFile('./ServerStatus.txt', (error, data) => {
         if (error) throw error
         statusArray = JSON.parse(data.toString('utf8'));
         colsole.log("Status geladen");  
    });

    fs.readFile('./ServerTasks.txt', (error, data) => {
         if (error) throw error
         tasksArray = JSON.parse(data.toString('utf8'));
         colsole.log("Tasks geladen");
    });

});