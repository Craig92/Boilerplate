const express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
const app = express();
var serverPort = 1337;

//STATUS GET REQUEST
app.get('/api/Status', (req, res) => {
    var fs = require('fs');
    var statusArray = [];

        fs.readFile('ServerStatus.txt', 'utf8', (err, data) => {
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

app.get('/api/Status/:id', (req, res) => {

  var fs = require('fs');
    var statusArray = [];

        fs.readFile('ServerStatus.txt', 'utf8', (err, data) => {
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
               if(statusArray[i].search("\"id\": " + req.params.id) != -1) {
                   res.send(JSON.stringify(statusArray[i]));
               }

                
            }

        });    

    });

    
//Status POST REQUEST
app.post('/api/Status', (req, res) => {
    wehcselt den status der übergebenen id in den übergebenen status
    gibt fehlermedlung wenn id nicht vorhanden
    //TODO POST Requests werden nur mit validem Token akzeptiert
    //Request akzeptiert status Flag
    //liefert  {message:'OK'}  oder  {message:'NOT OK'} 
    //schreibt ServerStatus.txt
    });
    
    //API Regeln für ID:
    //Wenn  id  gesetzt, dann wird ein vorhandenes Objekt modifiziert
    //Wenn  id  nicht gesetzt, wird ein Objekt erstellt
    //Wenn  id  nicht gefunden, gibt es einen Fehler
