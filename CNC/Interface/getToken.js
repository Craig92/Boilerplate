var getToken = function() {

	var xhr   = new XMLHttpRequest();
    
    xhr.open('GET', 'http://botnet.artificial.engineering:8080/api/Pfad');
	xhr.responseType = 'json';
    
	xhr.setRequestHeader('Token','48ce10edb6c3377e7771370a4ab3569d');

    
    xhr.onload = funktion() {

        var data = xhr.respnose;
        
        if (data != null){
           
           if (data instanceof Array){
               console.log(data.id);
               var id = data.id;
           }
		}

	};

	xhr.send(null);

};