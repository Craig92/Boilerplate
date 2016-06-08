const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');

var serverPort = 1337;
var statusArray = [];
var teamToken = '48ce10edb6c3377e7771370a4ab3569d';

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(parser.json());

//Liest die ServerStatus.txt und schreibt Sie ins statusArray
fs.readFile('./ServerStatus.txt','utf8',(error, data) => {
    if (error) throw error;

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

    statusArray = JSON.parse(data.toString());
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
