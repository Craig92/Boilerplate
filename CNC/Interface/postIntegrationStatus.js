var sendStatus = function(id, status) {
    
var xhr = new XMLHttpRequest();

xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/Status');

xhr.responseType = 'json';
xhr.responseHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Token', '48ce10edb6c3377e7771370a4ab3569d');

console.log(status);

xhr.onload = function() {

    var data = { "id" : parseInt(id), "status" : status};
    
   xhr.send(JSON.stringify(data));
   return true;
};
};