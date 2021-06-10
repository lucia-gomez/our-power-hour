var audiosprite = require('audiosprite-ffmpeg');
var fs = require('fs');

let files = fs.readdirSync('../sounds/');
files = files.filter(f => f !== '.DS_Store');
files = files.map(f => "../sounds/" + f);

const opts = { output: '../sounds/result', export: "mp3", format: "howler" };

audiosprite(files, opts, function (err, obj) {
  if (err) return console.error(err);
  fs.writeFile('../sounds/sounds.json', JSON.stringify(obj, null, 2), 'utf8', function (err) {
    console.error(err);
  });
});
