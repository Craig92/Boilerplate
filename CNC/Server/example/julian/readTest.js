var fs = require('fs');

fs.readFile('writeTestText.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});