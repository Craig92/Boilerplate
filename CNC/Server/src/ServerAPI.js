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
         console.log("Status geladen");  
    });

    fs.readFile('./ServerTasks.txt', (error, data) => {
         if (error) throw error
         tasksArray = JSON.parse(data.toString('utf8'));
         console.log("Tasks geladen");
    });

});

//var express = require('express');
// var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');

var serverPort = 1337;
var statusArray = [];
var teamToken = '48ce10edb6c3377e7771370a4ab3569d';

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Liest die ServerStatus.txt und schreibt Sie ins statusArray
fs.readFile('./ServerStatus.txt','utf8',(error, data) => {
    if (error) throw error;

/*
    var statusString = data.toString('utf8');
    var indexKlammerAuf = [];
    var indexKlammerZu = [];
            
    for(var i = 0; i < statusString.length; i++){
        if(statusString.charAt(i) == '{'){
            indexKlammerAuf.push(i);
        } else if(statusString.charAt(i) == '}'){
            indexKlammerZu.push(i);  
        }                      
    }

    for(var i = 0; i < indexKlammerAuf.length; i++){
        statusArray.push(statusString.slice(indexKlammerAuf[i],indexKlammerZu[i]));
    }
*/
    statusArray = JSON.parse(data.toString('utf8'));
});


//STATUS GET REQUEST Liefert ein Object mit allen Einträgen der Status Datenbank
app.get('/api/Status', (req, res) => {
   
    if (statusArray instanceof Array) {
        res.send(JSON.stringify(statusArray));
    }
});

//STATUS GET REQUEST Liefert Array des Eintrags aus der Datenbank, wenn ID vorhanden ist.
app.get('/api/Status/:id', (req, res) => {

    if(statusArray instanceof Array) {
        var id = statusArray.find(function(object) {return object.id == req.params.id;});

        if (id !== undefined){
            res.send(JSON.stringify(id));
        } else {
            res.send(JSON.stringify('ID ' + req.params.id + ' wurde nicht gefunden'));
        }
    }    
});

    
//Status POST REQUEST Modifiziert Eintrag in Status Datenbank, fall erlaubt.
app.post('/api/Status', (req, res) => {
    
    var request = req.body;
    var token = req.get('Token');
    var isTeamToken = false;

    //Prüft, ob der übergebene Token mit dem TeamToken übereinstimmt.
    if (token !== null){
        if(token === teamToken){
            console.log('Token akzeptiert');
            isTeamToken = true;
        } else {
            console.log('Token angelehnt');
        }
    }

    if (isTeamToken){
        var id = req.body.id;

        //Prüft, ob der übergebene Status eine gültige ID hat
        var findID = statusArray.find(function(object){
            return object.id == id;
        });

        if (findID !== null){
            var status = req.body.status;
                
            if (status !== null){

                if (status === true){
                    findID.workload = 1.0;
                    console.log('ID ' + findID + ' wurde gestartet');
                } else {
                    findID.workload = 0.0;
                    console.log('ID ' + findID + ' wurde gestopt');
                }

                //Schreibt Änderungen zurück in Datei.
                fs.writeFile('./ServerStatus.txt', JSON.stringify(statusArray),function(error){
                    if(error) throw error;
                    console.log('Status Einträge wurden modifiziert');

                    res.send(JSON.stringify({message:'OK'}));
                });
            } else {
                res.send(JSON.stringify({message: 'NOT OK'})); 
            }

        } else {
            res.send(JSON.stringify({message: 'NOT OK'})); 
        }

    } else {
            res.send(JSON.stringify({message: 'NOT OK'}));  
    }

});

//var express = require('express');
//var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');

var serverPort = 1337;

var typeArray = ['hash-md5','hash-sha256','crack-md5'];
var taskArray = [];
var teamToken = '48ce10edb6c3377e7771370a4ab3569d';
var counter = 0;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//Liest die ServerTasks.txt und schreibt Sie ins tasksArray
fs.readFile('./ServerTasks.txt','utf8',(error, data) => {
    if (error) throw error;
/*
    var taskString = data.toString('utf8');
    var indexKlammerAuf = [];
    var indexKlammerZu = [];
            
    for(var i = 0; i < taskString.length; i++){
        if(taskString.charAt(i) == '{'){
            indexKlammerAuf.push(i);
        } else if(taskString.charAt(i) == '}'){
            indexKlammerZu.push(i);  
        }                      
    }

    for(var i = 0; i < indexKlammerAuf.length; i++){
         taskArray.push(taskString.slice(indexKlammerAuf[i],indexKlammerZu[i]));
    }
*/
    tasksArray = JSON.parse(data.toString('utf8'));
});


//Tasks GET REQUEST Liefert ein Object mit allen Einträgen der Tasks Datenbank
app.get('/api/Tasks', (req, res) => {

    if (taskArray instanceof Array) {
        res.send(JSON.stringify(taskArray));
    }
});


//Tasks GET REQUEST Liefert Array des Eintrags aus der Datenbak, wenn ID vorhanden ist.
app.get('/api/Tasks/:id', (req, res) => {

  if(taskArray instanceof Array) {
        var id = taskArray.find(function(object) {return object.id == req.params.id;});

        //Gibt den angeforderten Task oder eine Meldung zurück
        if (id !== undefined){
            res.send(JSON.stringify(id));
        } else {
            res.send(JSON.stringify('ID ' + req.params.id + ' wurde nicht gefunden'));
        }
    }    
});
 
    
//Tasks POST REQUEST Modifiziert Eintrag in Tasks Datenbank, fall erlaubt.
app.post('/api/Tasks', (req, res) => {
   
    var request = req.body;
    var token = req.get('Token');
    var isTeamToken = false;

    //Prüft, ob der übergebene Token mit dem TeamToken übereinstimmt.
    if (token !== null){
        if(token === teamToken){
            console.log('Token akzeptiert');
            isTeamToken = true;
        } else {
            console.log('Token angelehnt');
        }
    }

    if (isTeamToken){
        var type = req.body.type;

        //Prüft, ob der übergebene Tasks einen gültiger Type hat 
        var findType = tasksArray.find(function(object){
            return object.type == type;
        });

        if(findType !== null){
            var id = req.body.id;

            //Prüft, ob der übergebene Tasks eine gültige ID hat
            var findID = tasksArray.find(function(object){
                return object.id == id;
            });

            if (findID !== null){

               //Modifiziert den vorhandenen Eintrag mit den neuen Parametern 
               taskArray[taskArray.indexOf(id)] = request;
               console.log('ID ' + req.id +  ' wurde modifiziert');
               counter++;


            } else {
                
                //Sucht die nächste freie Stelle im taskArray
                for(var i = 0; i != taskArray.length; i++){
                    if(taskArray[i].id != i){
                        counter = i;
                    }

                    //Fügt den neuen Task am Ende ein
                    if(counter == taskArray.length){
                          req.body.id = counter;
                          taskArray.push(req.body);
                          console.log('ID ' + req.body.id + ' wurde erstellt');
                          counter++;
                          
                    //Fügt den neuen Zask an der nächsten freien Stelle ein
                    } else {
                        taskArray.push(req.body);
                        console.log('ID ' + req.body.id + ' wurde erstellt');
                        counter++;
                    }
                }
            }

             //Schreibt die Änderungen in die Datei
             fs.writeFile('./ServerTasks.txt', JSON.stringify(tasksArray),function(error){
                    if(error) throw error;
                    console.log('Tasks Einträge wurden modifiziert');

                    res.send(JSON.stringify({message:'OK'}));
             });

        } else {
            res.send(JSON.stringify({message: 'NOT OK'}));  
        }


    } else {
        res.send(JSON.stringify({message: 'NOT OK'}));
    }

});