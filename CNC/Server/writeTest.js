var fs = require('fs');

fs.writeFile('writeTestText.txt', 'test test bla', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});