var http = require('http');
var fs = require('fs');
var url = require('url');
var path   = require('path');
var mime = require('./mime').mime;

http.createServer(function (request, response){
    // 解析请求，包括文件名
    var pathname = url.parse(request.url).pathname;
    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");


    // 从文件系统中读取请求的文件内容
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            // 获取文件扩展名(包含前置.)    
            var extname = path.extname(pathname);    
            var type = extname.slice(1);  
            if ( extname === '' ) {    
                response.writeHead(200, {'Content-Type':'text/html'});    
                response.write(data);   
            } else {    
                response.writeHead(200, {'Content-Type': mime[type]});    
                response.write(data, 'binary');     
            }    
        }
        // HTTP 状态码: 200 : OK
        // Content Type: text/plain
        // response.writeHead(200, {'Content-Type': 'text/html'});    

        // 响应文件内容
        // response.write(data.toString());   

        //  发送响应数据
        response.end();
    });   
}).listen(8888);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8888/');