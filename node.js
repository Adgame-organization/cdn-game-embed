var express = require('express');
var app = express();
var fs = require('fs')
//setting middleware
app.use(express.static(__dirname + 'dist')); //Serves resources from public folder

app.get('/', (req, res) => {
    fs.readFile(__dirname +'/dist/'+ 'sdk-adgame.js', function (err,data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
})
var server = app.listen(5000);