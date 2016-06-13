var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');

var statusArray = [];
var tasksArray = [];

var teamToken = '48ce10edb6c3377e7771370a4ab3569d';

var typeArray = ['hash-md5', 'hash-sha256', 'crack-md5'];
var counter = 0;

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
fs.readFile('./ServerStatus.txt', 'utf8', (error, data) => {
    if (error) throw error;
    statusArray = JSON.parse(data.toString('utf8'));
    console.log('STATUS Einträge geladen');
});


//Liest die ServerTasks.txt und schreibt Sie ins Tasks Array
fs.readFile('./ServerTasks.txt', 'utf8', (error, data) => {
    if (error) throw error;
    tasksArray = JSON.parse(data.toString('utf8'));
    console.log('TASKS Einträge geladen');
});

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
    var freePosition;
    var isSame;

    //Geht über das Task Array und prüft ob die ID an der Stelle mit der Stellenpostion übereinstimmt
    for (var i = 0; i !== tasksArray.length; i++) {
        isSame = tasksArray.find(function (object) {
            return object.id == i;
        });

        //Wenn nicht gleich ist wird die Position als ID übergeben.
        if (isSame === false) {
            return freePosition == i;
        }
    }
    return freePosition = counter;
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
                    findID.workload = 0.5;
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

                    res.send(JSON.stringify({ message: 'OK' }));
                });
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

        if (findType !== null) {

            console.log('TASK POST Type ist gültig');

            //Prüft, ob eine ID übergeben wurde und weist eine zu, falls keine übergeben wurde
            if (req.body.id === null) {

                req.body.id = searchFreePositionTask();
                console.log('TASK POST freie Stelle gefunden');
            }

            //Fügt Task am Ende des Arrays ein, wenn ID größer ist als Länge des Arrays
            if (req.body.id >= tasksArray.length) {
                req.body.id = counter;
                tasksArray.push(req.body);
                counter++;
                console.log('TASK POST ID wurde am Ende eingefügt')
            } else {
                tasksArray[tasksArray.indexOf(req.body.id)] = req.body;
                console.log('TASK POST ID wurde an der entsprechenden Stelle eingefügt')
            }
            /*
                        //Sucht nach Eintrag zu der übergebeben ID
                        var findID = tasksArray.find(function (object) {
                            return object.id === req.body.id;
                        });
                        console.log('TASK POST Eintrag zur ID gefunden');
            
                        if (findID !== null) {
                            //Modifiziert den vorhandenen Eintrag mit den neuen Parametern 
                            tasksArray[tasksArray.indexOf(findID)] = req;
                            console.log('TASK POST ID wurde modifiziert');
                            counter++;
                        } else {
            
                            //Fügt den neuen Task am Ende ein
                            if (findID >= tasksArray.length) {
                                req.body.id = counter;
                                tasksArray.push(req);
                                console.log('TASK POST ID wurde am Ende erstellt');
                                counter++;
            
                                //Fügt den neuen Task an der nächsten freien Stelle ein
                            } else {
                                tasksArray.push(req);
                                console.log('TASK POST ID wurde dazwischen erstellt');
                                counter++;
                            }
                        }
            */
            //Schreibt die Änderungen in die Datei
            fs.writeFile('./ServerTasks.txt', JSON.stringify(tasksArray), function (error) {
                if (error) throw error;
                console.log('TASK Einträge wurden modifiziert');
                res.send(JSON.stringify({ message: 'OK' }));
            });

        } else {
            res.send(JSON.stringify({ message: 'NOT OK' }));
        }


    } else {
        res.send(JSON.stringify({ message: 'NOT OK' }));
    }

});

//Löscht Eintrag in der Task, falls vorhanden.
app.delete('/api/Tasks/:id', (req, res) => {

    var token = req.get('Token');

    if (isTeamToken(token)) {

         var id = tasksArray.find(function (object) {
            return object.id == req.params.id;
        });

        if (id !== null) {

            console.log('DELETE Gültige ID übergeben');
            tasksArray.slice(id - 1, 1);

            //Schreibt die Änderungen in die Datei
            fs.writeFile('./ServerTasks.txt', JSON.stringify(tasksArray), function (error) {
                if (error) throw error;
                console.log('TASKS Einträge wurden modifiziert');

                res.send(JSON.stringify({ message: 'OK' }));
            });
        } else {
            res.send(JSON.stringify({ message: 'NOT OK' }));
        }

    } else {
        res.send(JSON.stringify({ message: 'NOT OK' }));
    }
});