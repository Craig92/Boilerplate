var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');

var statusArray = [];
var tasksArray = [];

var teamToken = '48ce10edb6c3377e7771370a4ab3569d';

var typeArray = ['hash-md5','hash-sha256','crack-md5'];
var counter = 0;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Startet den Server auf Port 1337 und schreibt die beiden Textdateien in die entsprechenden Arrays
app.listen(1337, () => {
     console.log("SERVER gestartet...");

     fs.readFile('./ServerStatus.txt', (error, data) => {
         if (error) throw error
         statusArray = JSON.parse(data.toString('utf8'));
         console.log('SERVER Status Einträge geladen');  
    });

    fs.readFile('./ServerTasks.txt', (error, data) => {
         if (error) throw error
         tasksArray = JSON.parse(data.toString('utf8'));
         console.log('SERVER Tasks Einträge geladen');
    });

});

//Liest die ServerStatus.txt und schreibt Sie ins Status Array
fs.readFile('./ServerStatus.txt','utf8',(error, data) => {
    if (error) throw error;
    statusArray = JSON.parse(data.toString('utf8'));
    console.log('STATUS Einträge geladen');
});

//Liest die ServerTasks.txt und schreibt Sie ins Tasks Array
fs.readFile('./ServerTasks.txt','utf8',(error, data) => {
    if (error) throw error;
    tasksArray = JSON.parse(data.toString('utf8'));
    console.log('TASKS Einträge geladen');
});


//STATUS GET REQUEST Liefert ein Object mit allen Einträgen der Status Datenbank
app.get('/api/Status', (req, res) => {
   
    if (statusArray instanceof Array) {
        res.send(JSON.stringify(statusArray));
        console.log('GET STATUS Object wurde aufgerufen');
    }
});

//STATUS GET REQUEST Liefert ein Array des Eintrags aus der Datenbank, wenn ID vorhanden ist.
app.get('/api/Status/:id', (req, res) => {

    if(statusArray instanceof Array) {
        var id = statusArray.find(function(object) {return object.id == req.params.id;});

        if (id !== undefined){
            res.send(JSON.stringify(id));
        } else {
            res.send(JSON.stringify('ID ' + req.params.id + ' wurde nicht gefunden'));
        }
        console.log('GET STATUS ID '+ new Number(req.params.id + '') + ' wurde aufgerufen');
    }    
});

    
//Status POST REQUEST Modifiziert Eintrag in Status Datenbank, falls der Zugriff erlaubt ist.
app.post('/api/Status', (req, res) => {
    
    var request = req.body;
    var token = req.get('Token');
    var isTeamToken = false;

    //Prüft, ob der übergebene Token mit dem TeamToken übereinstimmt.
    if (token !== null){
        if(token === teamToken){
            console.log('STATUS Token akzeptiert');
            isTeamToken = true;
        } else {
            console.log('STATUS Token angelehnt');
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
                    findID.task = 0;
                    console.log('ID ' + findID + ' wurde gestartet');
                } else {
                    findID.workload = 0.0;
                    findID.task = 1;
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

//Tasks GET REQUEST Liefert ein Object mit allen Einträgen der Tasks Datenbank
app.get('/api/Tasks', (req, res) => {

    if (tasksArray instanceof Array) {
        res.send(JSON.stringify(tasksArray));
        console.log('GET TASKS Object wurde aufgerufen');
    }
});


//Tasks GET REQUEST Liefert Array des Eintrags aus der Datenbak, wenn ID vorhanden ist.
app.get('/api/Tasks/:id', (req, res) => {

  if(tasksArray instanceof Array) {
        var id = tasksArray.find(function(object) {return object.id == req.params.id;});

        //Gibt den angeforderten Task oder eine Meldung zurück
        if (id !== undefined){
            res.send(JSON.stringify(id));
        } else {
            res.send(JSON.stringify('ID ' + req.params.id + ' wurde nicht gefunden'));
        }
        console.log('GET TASK ID '+ new Number(req.params.id + '')  + ' wurde aufgerufen');
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
            console.log('TASK Token akzeptiert');
            isTeamToken = true;
        } else {
            console.log('TASK Token abgelehnt');
        }
    }

    if (isTeamToken){
        var type = req.body.type;

        //Prüft, ob der übergebene Tasks einen gültiger Type hat 
        var findType = tasksArray.find(function(object){
            return object.type == type;
        });

        if(findType !== null){

            console.log('TASK Type gültig');
            var id = req.body.id;

            //Prüft, ob der übergebene Tasks eine gültige ID hat
            var findID = tasksArray.find(function(object){
                return object.id == id;
            });

            if (findID !== null){

               //Modifiziert den vorhandenen Eintrag mit den neuen Parametern 
               tasksArray[tasksArray.indexOf(id)] = request;
               console.log('ID ' + req.body.id +  ' wurde modifiziert');
               counter++;

            } else {
                
                //Sucht die nächste freie Stelle im tasksArray
                for(var i = 0; i != tasksArray.length; i++){
                    if(tasksArray[i].id != i){
                        counter = i;
                    }

                    //Fügt den neuen Task am Ende ein
                    if(counter == tasksArray.length){
                          req.body.id = counter;
                          tasksArray.push(req.body);
                          console.log('ID ' + req.body.id + ' wurde erstellt');
                          counter++;
                          
                    //Fügt den neuen Task an der nächsten freien Stelle ein
                    } else {
                        tasksArray.push(req.body);
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

//Löscht Eintrag in der Task, falls vorhanden.
app.delete('/api/Tasks/:id', (req, res) => {
    
    var request = req.body;
    var token = req.get('Token');
    var isTeamToken = false;

    //Prüft, ob der übergebene Token mit dem TeamToken übereinstimmt.
    if (token !== null){
        if(token === teamToken){
            console.log('DELETE Token akzeptiert');
            isTeamToken = true;
        } else {
            console.log('DELETE Token abgelehnt');
        }

        if(isTeamToken){
            var id = req.body.id;

            //Prüft, ob der übergebene Tasks eine gültige ID hat
            var findID = tasksArray.find(function(object){
                return object.id == id;
            });

            if (findID !== null){

                console.log('DELETE Gültige ID');
                tasksArray.slice(findID,1);

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
    } else {
        res.send(JSON.stringify({message: 'NOT OK'})); 
    }
});