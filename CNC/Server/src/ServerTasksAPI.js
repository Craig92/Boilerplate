var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var serverPort = 1337;

//Tasks GET REQUEST
app.get('/api/Tasks', (req, res) => {
    //TODO Request liefert Array an Auftrag Objekten
    //liest aus ServerTasks.txt
    });

app.get('/api/Tasks/:id', (req, res) => {
    //TODO Request liefert Array an Auftrag Objekten
    //liest aus ServerTasks.txt
    });
    
//Tasks POST REQUEST
app.post('/api/Tasks', (req, res) => {
    //TODO Request akzeptiert Datenobjekt ohne ID
    //liefert  {message:'OK'}  oder  {message:'NOT OK'} 
    //schreibt in ServerTasks.txt
    });
    
    //API Regeln für ID:
    //Wenn  id  gesetzt, dann wird ein vorhandenes Objekt modifiziert
    //Wenn  id  nicht gesetzt, wird ein Objekt erstellt
    //Wenn  id  nicht gefunden, gibt es einen Fehler