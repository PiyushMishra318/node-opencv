var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var http = require("http").createServer(app);
var exec = require('child_process').execFile;
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/assets', express.static(__dirname));
app.get("/", function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});
app.get("/opencv/:blockSize/:edgeSize", function (req, res, next) {
    res.sendFile(__dirname + '/opencv.html');
});
app.get("/effect/:effectName/:filename/:blocksize1/:blocksize2", function (req, res, next) {
    var { blocksize1, blocksize2, effectName, filename } = req.params;
    //effectNAme == WaterColorEffect
    exec(`./execs/${effectName}/ConsoleApplication1.exe`, [`${filename}`, blocksize1, blocksize2], function (err, stdout, stderr) {
        console.log(err, stdout, stderr);
        res.sendFile(__dirname + "/Final.jpg");
    });
});

http.listen(port, function () {
    console.log(" REST API server Started on " + port);
});
