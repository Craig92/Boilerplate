var express = require('express');
var app     = express();
var parser  = require('body-parser');
var cors    = require('cors');

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/api/Tasks', (req, res) => {
    res.send('No Task id given');
});

app.get('/api/Tasks/:id', (req, res) =>{
    res.send('task id was' + req.params.id)
});

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// Other middlewares and routes

app.post('/Tasks/:id', (req, res) => {
    console.log('Received data', req.body);
    res.json({ message: 'UPDATE Task ' + req.params.id });
});

//fehlerbehandunlung
app.use(function(err, req, res, next) {
    res.json({message: 'NOT OK'});
})


app.listen(3000, () => {
    console.log('Example listening on http://localhost:3000');
});

var fs = require('fs');
//Schreibt in eine datei
fs.writeFile('./example.txt', 'Hallo', (err) => {
   
    if (err) throw err;
    console.log('Geschrieben!');
});

//Liest eine datei
fs.readFile('./example.txt', 'utf8',  (err, data) => {
    
    if (err) throw err;
    console.log(data);
   
});

var fizz = function* () {
    let i = 0;
    while (++i) {
        var is_fizz = i % 3 === 0;
        var is_buzz = i % 5 === 0;
        var is_fizzbuzz = i % 15 ===0;
        if (is_fizzbuzz){
            yield 'n00b1337';        
        } else if (is_fizz) {
            yield 'N00b';
        } else if (is_buzz) {
            yield '1337';
        } else {
            yield '' + i;
        }
    }
};


var generator = fizz();
for (let i = 0; i < 100; i++) {
    console.log(generator.next().value);
}