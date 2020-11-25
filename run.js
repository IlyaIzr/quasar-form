var fs = require('fs')

// Update vendor
const vendor = fs.readdirSync('./dist/spa/js').filter(fn => fn.startsWith('vendor'));
fs.readFile('./dist/spa/js/' + vendor[0], 'utf8', function (err, data) {

  fs.writeFile('./library/vendor.js', data, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

// Update app
const app = fs.readdirSync('./dist/spa/js').filter(fn => fn.startsWith('app'));

let appMinified = fs.readFileSync('./dist/spa/js/' + app[0], 'utf8');


fs.readFile('./library/test.js', 'utf8', function (err, data) {

  let newData = data.replace(/renderer\(.*{(.|\n)*}\n{2,}/, appMinified)
  console.log(data.renderer)

  fs.writeFile('./library/test.js', newData, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});