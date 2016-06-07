var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var serverPort = 1337;

var typeArray = ['hash-md5','hash-sha256','crack-md5'];
var taskArray = [];
var teamToken = '48ce10edb6c3377e7771370a4ab3569d';

//Tasks GET REQUEST
app.get('/api/Tasks', (req, res) => {

    liefert array mit allen Tasks
    //TODO Request liefert Array an Auftrag Objekten
    //liest aus ServerTasks.txt
    });

app.get('/api/Tasks/:id', (req, res) => {

    liefert den task mit der übergebenen id, wenn es nicht vorhanden ist gib fehlermedung (false) zurück
    //TODO Request liefert Array an Auftrag Objekten
    //liest aus ServerTasks.txt
    });
    
//Tasks POST REQUEST
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
                
               //Vorhandenen Eintrag ändern
               

            } else {
                //id festlegen und neuen eintrag hinzufügen
            }

             fs.writeFile('./ServerTasks.txt', JSON.stringify(tasksArray),function(error){
                    if(error) throw error;
                    console.log('Tasks Einträge wurden modifiziert');
             });

        } else {
            res.send(JSON.stringify({message: 'NOT OK'}));  
        }


    } else {
        res.send(JSON.stringify({message: 'NOT OK'}));
    }

    });
    
   