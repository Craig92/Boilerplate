const express = require('express');
const app = express();
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
app.use(parser.json());

//Liest die ServerTasks.txt und schreibt Sie ins tasksArray
fs.readFile('./ServerTasks.txt','utf8',(error, data) => {
    if (error) throw error;
    tasksArray = JSON.parse(data.toString());
})


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

                    if(counter == taskArray.length){
                          req.body.id = counter;
                          taskArray.push(req.body);
                          console.log('ID ' + req.body.id + ' wurde erstellt');
                          counter++;
                    } else {
                        taskArray.push(req.body);
                        console.log('ID ' + req.body.id + ' wurde erstellt');
                        counter++;
                    }
                }
            }

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