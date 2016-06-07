var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var serverPort = 1337;

var typeArray = ['hash-md5','hash-sha256','crack-md5'];
var taskArray = [];
var teamToken = '48ce10edb6c3377e7771370a4ab3569d';

//Tasks GET REQUEST Liefert ein Object mit allen Einträgen der Tasks Datenbank
app.get('/api/Tasks', (req, res) => {
    var fs = require('fs');

        fs.readFile('./ServerTasks.txt', 'utf8', (err, data) => {
            if (err) throw err;
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

        });    

        res.send(JSON.stringify(taskArray));
    });

//Tasks GET REQUEST Liefert Array des Eintrags aus der Datenbak, wenn ID vorhanden ist.
app.get('/api/Tasks/:id', (req, res) => {

//TODO ID nicht vorhanden?
     var fs = require('fs');

        fs.readFile('./ServerTasks.txt', 'utf8', (err, data) => {
            if (err) throw err;
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
                statusArray.push(taskString.slice(indexKlammerAuf[i],indexKlammerZu[i]));
            }

            for(var I =0; i < statusArray.length; i++){
               if(statusArray[i].search("\"id\" : " + req.params.id) != -1) {
                   res.send(JSON.stringify(statusArray[i]));
               }

                
            }

        });    

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
    
   