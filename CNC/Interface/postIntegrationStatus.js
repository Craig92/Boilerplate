/*
 Start/Stop Button mit  /api/Status  POST Integration
•Anwendung des  token  Headers
•Senden der Daten mit  XHR Version 2 
*/

var button = document.getElementById('button'+d+'');

button.addEventListener('click', stopTask);

function stopTask(event){
    event.target.innerHTML='Stop';
}

// 

var action = function() {

	var xhr1    = new XMLHttpRequest();
	xhr1.responseType = 'json';
    
    var data = '';


    var id = //ID der Tabellenzeile holen;
    var action = //Action (start oder stop) von der Tabellenzeile holen;
    
    data =//id und action an data senden;
 
    xhr1.send(data);
};