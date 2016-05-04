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
				code += '<td>' + '<label class="switch'+d+'+"> <input class="switch-input" type="checkbox" /> <span class="switch-label" data-on="Start" data-off="Stopp"></span> <span class="switch-handle"></span> </label>' +'</td>';
				code += '</tr>';
			}

			content.innerHTML = code;

		} else {

			content.innerHTML = 'Failed to load :(';

		}

	};

	xhr1.send(null);

};