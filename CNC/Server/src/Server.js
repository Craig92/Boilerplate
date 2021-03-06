var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');

var statusArray = [];
var tasksArray = [];

var teamToken = '48ce10edb6c3377e7771370a4ab3569d';

var typeArray = ['hash-md5', 'hash-sha256', 'crack-md5'];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Startet den Server auf Port 1337 und schreibt die beiden Textdateien in die entsprechenden Arrays
app.listen(1337, () => {
    console.log("SERVER gestartet");

    fs.readFile('./ServerStatus.txt', (error, data) => {
        if (error) throw error
        statusArray = JSON.parse(data.toString('utf8'));
        console.log('SERVER STATUS Einträge geladen');
    });

    fs.readFile('./ServerTasks.txt', (error, data) => {
        if (error) throw error
        tasksArray = JSON.parse(data.toString('utf8'));
        console.log('SERVER TASKS Einträge geladen');
    });

});

//Liest die ServerStatus.txt und schreibt Sie ins Status Array
var readStatus = function () {
    s.readFile('./ServerStatus.txt', 'utf8', (error, data) => {
        if (error) throw error;
        statusArray = JSON.parse(data.toString('utf8'));
        console.log('STATUS Einträge geladen');
    });
};


//Liest die ServerTasks.txt und schreibt Sie ins Tasks Array
var readTasks = function () {
    fs.readFile('./ServerTasks.txt', 'utf8', (error, data) => {
        if (error) throw error;
        tasksArray = JSON.parse(data);
        console.log('TASKS Einträge geladen');
    });
};

//Prüft, ob der übergebene Token gültig ist
var isTeamToken = function (token) {
    if (teamToken === token) {
        console.log('TOKEN akzeptiert');
        return true;
    } else {
        console.log('TOKEN angelehnt');
        return false;
    }
};

//Sucht die nächste freie Stelle im Task Array
var searchFreePositionTask = function () {

    for (var i = 1; i < tasksArray.length; i++) {

        var temptask = tasksArray.find(function (object) {
            return object.id == ++i;
        });
        if (temptask === undefined) {
            return i;
        }
    }

    return tasksArray.length;
};

//STATUS GET REQUEST Liefert ein Object mit allen Einträgen der Status Datenbank
app.get('/api/Status', (req, res) => {

    if (statusArray instanceof Array) {
        res.send(JSON.stringify(statusArray));
        console.log('GET STATUS Object wurde aufgerufen');
    }
});

//STATUS GET REQUEST Liefert ein Array des Eintrags aus der Datenbank, wenn ID vorhanden ist.
app.get('/api/Status/:id', (req, res) => {

    if (statusArray instanceof Array) {
        var id = statusArray.find(function (object) {
            return object.id == req.params.id;
        });

        if (id !== undefined) {
            res.send(JSON.stringify(id));
        } else {
            res.send(JSON.stringify('ID wurde nicht gefunden'));
        }
        console.log('GET STATUS ID wurde aufgerufen');
    }
});


//Status POST REQUEST Modifiziert Eintrag in Status Datenbank, falls der Zugriff erlaubt ist.
app.post('/api/Status', (req, res) => {

    var token = req.get('Token');

    if (isTeamToken(token)) {

        //Prüft, ob der übergebene Status eine gültige ID hat
        var findID = statusArray.find(function (object) {
            return object.id == req.body.id;;
        });

        if (findID !== null) {

            if (req.body.status !== null) {

                if (req.body.status === true) {
                    findID.workload = 1.0;
                    findID.task = 0;
                    console.log('STATUS POST ID wurde gestartet');
                } else {
                    findID.workload = 0.0;
                    findID.task = 1;
                    console.log('STATUS POST ID wurde gestopt');
                }

                //Schreibt Änderungen zurück in Status Datei.
                fs.writeFile('./ServerStatus.txt', JSON.stringify(statusArray), function (error) {
                    if (error) throw error;
                    console.log('STATUS ARRAY wurden modifiziert');
                });

                res.send(JSON.stringify({ message: 'OK' }));
            } else {
                res.send(JSON.stringify({ message: 'NOT OK' }));
            }
        } else {
            res.send(JSON.stringify({ message: 'NOT OK' }));
        }
    } else {
        res.send(JSON.stringify({ message: 'NOT OK' }));
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

    if (tasksArray instanceof Array) {
        var id = tasksArray.find(function (object) {
            return object.id == req.params.id;
        });

        //Gibt den angeforderten Task oder eine Meldung zurück
        if (id !== undefined) {
            res.send(JSON.stringify(id));
        } else {
            res.send(JSON.stringify('ID wurde nicht gefunden'));
        }
        console.log('GET TASK ID wurde aufgerufen');
    }
});


//Tasks POST REQUEST Modifiziert Eintrag in Tasks Datenbank, fall erlaubt.
app.post('/api/Tasks', (req, res) => {

    var token = req.get('Token');

    if (isTeamToken(token)) {

        //Prüft, ob der übergebene Tasks einen gültiger Type hat 
        var findType = tasksArray.find(function (object) {
            return object.type == req.body.type;
        });

        if (findType != undefined) {

            var findID = tasksArray.find(function (object) {
                return object.id == req.body.id;
            });

            if (findID != undefined) {
                //Modifiziert den Eintrag
                tasksArray[tasksArray.indexOf(findID)] = req.body;
                console.log('POST TASK ID modifiziert');
                res.send(JSON.stringify({ message: 'OK' }));
            } else {

                if (req.body.id !== undefined) {
                    //Sucht den nächsten freien Eintrag und trägt ihn ein
                    req.body.id = searchFreePositionTask();
                    tasksArray.push(req.body);
                    console.log('POST TASK ID erstellt');
                    res.send(JSON.stringify({ message: 'OK' }));
                } else {
                    res.send(JSON.stringify({ message: 'NOT OK' }));
                }
            }
        } else {
            res.send(JSON.stringify({ message: 'NOT OK' }));
        }
    } else {
        res.send(JSON.stringify({ message: 'NOT OK' }));
    }

    //Schreibt die Änderungen in die Datei
    fs.writeFile('./ServerTasks.txt', JSON.stringify(tasksArray), function (error) {
        if (error) throw error;
        console.log('TASKS ARRAY wurden modifiziert');
    });
});