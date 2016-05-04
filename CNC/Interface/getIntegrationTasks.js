var initializeTask = function() {

	var xhr1    = new XMLHttpRequest();
	var content = document.querySelector('table#task-table tbody');


	xhr1.open('GET', 'http://botnet.artificial.engineering:8080/api/Tasks');
	xhr1.responseType = 'json';

	xhr1.onload = function() {

		var tasks = xhr1.response;
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

	xhr1.send(null);

};