
var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

var port = process.argv[2] || 2022;

http.createServer(function(request,response){

	var uri = url.parse(request.url).pathname;
	var wwwroot_path = process.cwd() + "/../../wwwroot";
    var filename = path.join(wwwroot_path, uri);

    path.exists(filename, function(exists){
    	if(!exists){    	
    		response.writeHead(404,{"Content-Type":"text/plain"});
    		response.write("404 not found\n");
    		response.end();
    		return;
    	}

    	if(fs.statSync(filename).isDirectory()) filename += "index.html";

    	fs.readFile(filename,'binary',function(err,file){

    		if(err){
    			response.writeHead(500,{"Content-Type":"text/plain"});
    			response.write(err + "\n");
    			response.end();
    			return;
    		}


			response.writeHead(200;
			response.write(file,"binary");
			response.end();

    	});

    });
    


}).listen(parseInt(port,10));
console.log("Server is running");

