const express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
const app = express();
var serverPort = 1337;

var statusArray = [];
var teamToken = '48ce10edb6c3377e7771370a4ab3569d';

//STATUS GET REQUEST Liefert ein Object mit allen Einträgen der Status Datenbank
app.get('/api/Status', (req, res) => {
    var fs = require('fs');

        fs.readFile('./ServerStatus.txt', 'utf8', (err, data) => {
            if (err) throw err;
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

        });    

        res.send(JSON.stringify(statusArray));
    });

//STATUS GET REQUEST Liefert Array des Eintrags aus der Datenbak, wenn ID vorhanden ist.
app.get('/api/Status/:id', (req, res) => {

//TODO ID nicht vorhanden?
  var fs = require('fs');

        fs.readFile('./ServerStatus.txt', 'utf8', (err, data) => {
            if (err) throw err;
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

            for(var I =0; i < statusArray.length; i++){
               if(statusArray[i].search("\"id\" : " + req.params.id) != -1) {
                   res.send(JSON.stringify(statusArray[i]));
               }

                
            }

        });    

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
                fs.writeFile('./ServerStatus.txt', JSON.stringify(statusArray),function(error){
                    if(error) throw error;
                    console.log('Status Einträge wurden modifiziert');
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
