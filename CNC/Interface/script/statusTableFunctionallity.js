/**
 * Holt die Status Informationen von BotnetServer und fügt die Daten in eine Tabelle ein.
 */
var initializeStatus = function() {

    var xhr = new XMLHttpRequest();
    var content = document.querySelector('table#status-table tbody');


    xhr.open('GET', 'http://botnet.artificial.engineering:8080/api/Status');
    xhr.responseType = 'json';

    xhr.onload = function() {

        var data = xhr.response;
        if (data instanceof Array) {

            var code = '';

            //Erzeugt die Tabelle mit den Einträgen.
            for (var d = 0, dl = data.length; d < dl; d++) {

                var entry = data[d];

                code += '<tr>';
                code += '<td>' + entry.id + '</td>';
                code += '<td>' + entry.ip + '</td>';
                code += '<td>' + entry.task + '</td>';
                code += '<td>' + entry.workload + '</td>';

                if (entry.workload === 0) {
                    code += '<td><button class="status-button" id="' + entry.id + '" onClick="toggleButton(' + entry.id + ', true);"></button></td>';
                } else {
                    code += '<td><button class="status-button" id="' + entry.id + '" onClick="toggleButton(' + entry.id + ', false);"></button></td>';
                }

                code += '</tr>';
            }

            content.innerHTML = code;

            //Erzeugt die "Start/Stop"-Buttons mit den entsprechenden Zustand.
            for (var d = 0, dl = data.length; d < dl; d++) {
                var entry = data[d];
                var buttonID = entry.id;

                if (entry.workload === 0) {
                    document.getElementById(buttonID).innerHTML = "Start";
                    document.getElementById(buttonID).style.background = "blue";
                    document.getElementById(buttonID).style.color = "white";
                } else {
                    document.getElementById(buttonID).innerHTML = "Stop";
                    document.getElementById(buttonID).style.background = "yellow";
                    document.getElementById(buttonID).style.color = "black";
                }

            }

        } else {

            content.innerHTML = 'Failed to load :(';

        }

    };

    xhr.send(null);

};

/**
 * Wechselt die Farbe und die Schrift des "Start/Stop"-Buttons jen nach Zustand und aktualisert anschließend die Status Tabelle.
 */
function toggleButton(buttonID, status) {

    if (document.getElementById(buttonID).innerHTML == "Start") {

        if (sendStatus(buttonID, true)) {
            document.getElementById(buttonID).innerHTML = "Stop";
            document.getElementById(buttonID).style.background = "yellow";
            document.getElementById(buttonID).style.color = "black";
            alert("Der Status wurde auf 'Stop' geändert!");
            initializeStatus();
        } else {
            alert("Ein Fehler beim Ändern des Status ist aufgetreten!");
            initializeStatus();
        }

    } else {

        if (sendStatus(buttonID, false)) {
            document.getElementById(buttonID).innerHTML = "Start";
            document.getElementById(buttonID).style.background = "blue";
            document.getElementById(buttonID).style.color = "white";
            alert("Der Status wurde auf 'Start' geändert!");
            initializeStatus();
        } else {
            alert("Ein Fehler beim Ändern des Status ist aufgetreten!");
            initializeStatus();
        }
    }

};

/**
 * Senden an den Server den geänderten Zusand des Buttons.
 */
var sendStatus = function(id, status) {

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Status');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Token', '48ce10edb6c3377e7771370a4ab3569d');

    var data = {
        "id": parseInt(id, 10),
        "status": status
    };

    xhr.send(JSON.stringify(data));
    return true;
};