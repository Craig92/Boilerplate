/**
 * Holt die Aufgaben Informationen von BotnetServer und fügt die Daten in eine Tabelle ein.
 */
var initializeTask = function () {

    var xhr = new XMLHttpRequest();
    var content = document.querySelector('table#task-table tbody');

    xhr.open('GET', 'http://localhost:1337/api/Tasks');
    //    xhr.open('GET', 'http://botnet.artificial.engineering:8080/api/Tasks');
    xhr.responseType = 'json';

    xhr.onload = function () {

        var tasks = xhr.response;
        if (tasks instanceof Array) {

            var code = '';

            for (var d = 0, dl = tasks.length; d < dl; d++) {

                var entry = tasks[d];

                code += '<tr>';
                code += '<td>' + entry.id + '</td>';
                code += '<td>' + entry.type + '</td>';
                code += '<td>' + entry.data.input + '</td>';
                code += '<td>' + entry.data.output + '</td>';
                code += '<td><button class="delete-button" id="' + entry.id + '" "></button></td>';
                code += '</tr>';
            }
            content.innerHTML = code;

            //Erzeugt die "Delete"-Buttons mit den entsprechenden Zustand.
            for (var d = 0, dl = data.length; d < dl; d++) {
                var entry = data[d];
                var buttonID = entry.id;

                document.getElementById(buttonID).innerHTML = "Löschen";
                document.getElementById(buttonID).style.background = "red";
                document.getElementById(buttonID).style.color = "white";

            }
        } else {
            content.innerHTML = 'LOADING ERROR :(';
        }
    };
    xhr.send(null);
};

/**
 * Sendet neue Aufgaben mit Typ und Inputtext an den Server und aktualisert anschließend die Aufgabentabelle.
 */
var sendTask = function (id, type, dataInput) {

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:1337/api/Tasks');
    //    xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Tasks');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Token', '48ce10edb6c3377e7771370a4ab3569d');

    //Prüft, ob die Eingabe vom Server angenommen wurde.
    xhr.onload = function () {
        if (this.status == 200) {
            var entry = xhr.response;
            if (entry !== null && entry.message != "OK") {
                alert("Der Auftrag vom Typ '" + type + "' wurde mit Input: ' " + dataInput + " ' NICHT an den Server übermittelt.");
            } else {
                alert("Der Auftrag vom Typ '" + type + "' wurde mit Input: ' " + dataInput + " ' an den Server übermittelt.");
            }
        } else {
            alert("Der Auftrag vom Typ '" + type + "' wurde mit Input: ' " + dataInput + " ' NICHT an den Server übermittelt.");
        }
    };

    var data;

    data = {
        "id": parseInt(id, 10),
        "type": type,
        "data": {
            'input': dataInput,
            'output': null
        }

    };
    xhr.send(JSON.stringify(data));
    initializeTask();
};

/**
 * Senden an den Server den zu löschenden Task.
 */
var deleteTask = function (id) {

    var xhr = new XMLHttpRequest();

    xhr.open('DELETE', 'http://localhost:1337/api/Tasks');
    //    xhr.open('DELETE', 'http://botnet.artificial.engineering:8080/api/Tasks');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Token', '48ce10edb6c3377e7771370a4ab3569d');

    xhr.onload = function () {
        var entry = xhr.response;
        if (entry !== null && entry.message != "OK") {
            alert("Der Auftrag ID " + id + " wurde gelöscht");
        } else {
            alert("Der Auftrag ID " + id + " wurde NICHT gelöscht");
        }
    };

    xhr.send(JSON.stringify(id));
    initializeTask();
};