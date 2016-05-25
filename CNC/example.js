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
