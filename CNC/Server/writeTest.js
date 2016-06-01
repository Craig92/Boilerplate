var fs = require('fs');

fs.writeFile('writeTestText.txt', 'hallo !!!', (err) => {
  if (err) throw err;
  console.log('schreiben erfolgreich !');
});