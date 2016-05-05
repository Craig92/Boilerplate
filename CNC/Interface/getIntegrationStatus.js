var initializeStatus = function() {

	var xhr1    = new XMLHttpRequest();
	var content = document.querySelector('table#status-table tbody');


	xhr1.open('GET', 'http://botnet.artificial.engineering:8080/api/Status');
	xhr1.responseType = 'json';

	xhr1.onload = function() {

		var data = xhr1.response;
		if (data instanceof Array) {

			var code = '';

			for (var d = 0, dl = data.length; d < dl; d++) {

				var entry = data[d];

				code += '<tr>';
				code += '<td>' + entry.id + '</td>';
				code += '<td>' + entry.ip + '</td>';
				code += '<td>' + entry.task + '</td>';
				code += '<td>' + entry.workload + '</td>';
				code += '<td><button class="status-button" id="' + entry.id + '" onClick="toggleButton(this.id);"></button></td>';
				code += '</tr>';
			}

			content.innerHTML = code;
			
						for (var d = 0, dl = data.length; d < dl; d++) { 
 				var entry = data[d]; 
 				var buttonID = entry.id; 
 				if(entry.workload === 0) { 
 					document.getElementById(buttonID).innerHTML = "Start"; 
 					document.getElementById(buttonID).style.background = "blue";
					document.getElementById(buttonID).style.color="white"; 
 				} else { 
 					document.getElementById(buttonID).innerHTML = "Stop"; 
					document.getElementById(buttonID).style.background = "yellow"; 
					document.getElementById(buttonID).style.color="black"; 
 				} 
 				 
		} 


		} else {

			content.innerHTML = 'Failed to load :(';

		}

	};

	xhr1.send(null);

};