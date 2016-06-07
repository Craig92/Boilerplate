var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var serverPort = 1337;

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
   
       if ('reg/res' == 'unserToken'){
        trage Formulareingabe in datenbank ein und speichert es und gib medlung zurück
    } else
        gib meldung zurück, dass es nicht ging
    //TODO Request akzeptiert Datenobjekt ohne ID
    //liefert  {message:'OK'}  oder  {message:'NOT OK'} 
    //schreibt in ServerTasks.txt
    });
    
    //API Regeln für ID:
    //Wenn  id  gesetzt, dann wird ein vorhandenes Objekt modifiziert
    //Wenn  id  nicht gesetzt, wird ein Objekt erstellt
    //Wenn  id  nicht gefunden, gibt es einen Fehler