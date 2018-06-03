var fs = require('fs');
var https = require('https');
var express = require("express");
var bodyParser = require("body-parser");

var serverConfig = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
};

var app = express();
var HTTPS_PORT = 443;

var httpsServer = https.createServer(serverConfig, app).listen(HTTPS_PORT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
        }));

app.get(/^(.+)$/, function(req, res){ 
    switch(req.params[0]) {
        case '/prueba.html':
            res.send("prueba ok");
            break;
    default: res.sendFile( __dirname + "/index.html"); 
    }
 });

app.post(/^(.+)$/, function(req, res){
    switch(req.params[0]) {
        case '/chatbot':
		var received = (req.body.message).toLowerCase();
		console.log(received);
		if (received.includes("hola")) {
			res.send("Hola. ¿Como te puedo ayudar?");
		} else if (received.includes("temperatura") && received.includes("living")) {
		 	res.send("24 grados");
		} else {
			res.send("Perdón, no entiendo");
			}
            break;
    default: res.send("¿Podrías explicarlo de otra manera?"); 
    }
 });
console.log('Servidor corriendo');
