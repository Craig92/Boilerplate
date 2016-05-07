/**
 * Holt die Aufgaben Informationen von BotnetServer und fügt die Daten in eine Tabelle ein.
 */
var initializeTask = function() {

    var xhr = new XMLHttpRequest();
    var content = document.querySelector('table#task-table tbody');


    xhr.open('GET', 'http://botnet.artificial.engineering:8080/api/Tasks');
    xhr.responseType = 'json';

    xhr.onload = function() {

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

                code += '</tr>';
            }

            content.innerHTML = code;

        } else {

            content.innerHTML = 'Failed to load :(';

        }

    };

    xhr.send(null);

};

var sendTask = function(id, type, dataInput) {

    var xhr = new XMLHttpRequest();

    

    xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Tasks');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Token', '48ce10edb6c3377e7771370a4ab3569d');


    xhr.onload = function(){
        if (this.status == 200){
            var entry = xhr.response;
            if (entry !== null && entry.message != "OK"){
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