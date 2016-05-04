var sendTask = function() {
	
	var xhr1    = new XMLHttpRequest();
	
	xhr1.open('POST', 'http://botnet.artificial.engineering:8080/api/Tasks');
	xhr1.responseType = 'json';
	xhr1.setRequestHeader('Content-Type', 'application/json');
	xhr1.setRequestHeader('Token', '48ce10edb6c3377e7771370a4ab3569d');
	
	xhr.onload = function() {
	
	var gettype = document.getElementById("type");
	var getinput = document.getElementById("input");
	
	
	
	var data = {
    type: gettype,
		data: {
			input: getinput,
		}
	};
	
	
	
	};
	
	xhr1.send(JSON.stringify(data));

};