var net = require('net');

var port = process.env['PORT_SERVER'] || 4242;

var server = net.createServer(function(socket){

    var data = function(chunk){
        console.log("> Data received from from ip: " + socket.remoteAddress);
        console.log("-------------------------");
        console.log(chunk.toString());
        console.log("-------------------------");
        socket.write("> " + chunk.toString());
    };

    var close = function(){
        console.log("> Connection with ip: " + socket.remoteAddress + " just closed <");
    };

    console.log("> New connection from ip: " + socket.remoteAddress);
    socket.on("data", data);
    socket.on("close", close);
});


console.log("Starting TCP server on port: " + port);
server.listen(port);



/* A HTTP server just for info purposes */

var express = require('express');
var http = express();

http.get('/', function(req, res){
    res.json({
        tcp: {
            host: process.env['DOTCLOUD_TCP_SERVER_HOST'],
            port: process.env['DOTCLOUD_TCP_SERVER_PORT'],
            help: "just: '$ telnet "+ process.env['DOTCLOUD_TCP_SERVER_HOST'] + " " + process.env['DOTCLOUD_TCP_SERVER_PORT'] +"'"
        }
        /*, env: process.env*/
    });
});

http.listen(process.env['PORT_NODEJS'] || 8080);