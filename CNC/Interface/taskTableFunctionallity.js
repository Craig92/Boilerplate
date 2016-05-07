/**
 * Holt die Aufgaben Informationen von BotnetServer und fügt die Daten in eine Tabelle ein.
 */

var initializeTask = function() {

	var xhr    = new XMLHttpRequest();
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

var sendTask = function(id, type, data) { 
    var xhr = new XMLHttpRequest(); 
 
 
    alert("Die ID " + id + " vom Typ '" + type + "' wurde mit Input: ' " + data + " ' an den Server übermittelt."); 
 
    xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Tasks'); 
   
    xhr.responseType = 'json'; 
    xhr.setRequestHeader('Content-Type', 'application/json'); 
    xhr.setRequestHeader('Token', '48ce10edb6c3377e7771370a4ab3569d'); 
 
    var data; 
        xhr.onload = function() { 
            console.log("Response: ", xhr.response); 
        }; 

 
    data = {  
        "id": parseInt(id, 10), 
        "type": type, 
   	    "data": { 
 		    'input': data, 
            'output': null  
        } 
    }; 
  
    xhr.send(JSON.stringify(data)); 
    }; 
