var fs = require('fs');

//Schreibt in eine datei
fs.writeFile('example.txt', 'hellop', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});