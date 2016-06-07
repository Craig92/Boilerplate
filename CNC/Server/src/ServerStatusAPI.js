var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var serverPort = 1337;

//STATUS GET REQUEST
app.get('/api/Status', (req, res) => {
    @Julian & Alexander
    liefert Arra mit allen Status einträgen
    //TODO Request liefert Array an Bot Status Objekten
    //liest aus ServerStatus.txt
    });

app.get('/api/Status/:id', (req, res) => {

    liefert objekt der übergebenen id
    gibt fehlermedlung wenn id nicht vorhanden
    //TODO Request liefert Array an Bot Status Objekten
    //liest aus ServerStatus.txt
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
