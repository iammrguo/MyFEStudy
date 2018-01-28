var http = require('http');
var fs = require('fs');
var url = require('url');
var path   = require('path');
var mime = require('./mime').mime;
var querystring=require("querystring");
var test = {
    a: '线索1',
    b: '线索2',
    c: '线索3'
}

http.createServer(function (request, response){
    // 解析请求，包括文件名
    var pathname = url.parse(request.url).pathname;
    var str = url.parse(request.url, true).query;  
    var arg = querystring.parse(url.parse(request.url).query);

    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");

    if (pathname == '/project/listProject') {
        // console.log(arg);
        var options = { 
            hostname: 'house-be-manage.focus-test.cn',
            path: '/project/listProject?params=' + arg.params,
            method: 'GET',
            headers: {'content-type': 'application/x-www-form-urlencoded','Cookie': 'IPLOC=CN1100; SUV=1705021551165578; FOCUS_A_UDIG=EwcdxqnaQ72xyas0GkBAezsXKWpVTChDIPnScZmaTwG6Tz9QKGbB4Hc3QZc60eo8HEFx59V4QCIDqErGEfX3q4v4Dvl5qZkUgeCp+tuZ4kUlJAhc4GcCnnP1Jh8U02bvtq5L3VPGPWYARFovxLTGKJ5L8XL6aYOo6D57xwu7WU8=; wap_ad_feed=0; focus_wap_city_p=sh; focus_city_p=sh; focus_city_s=sh; focus_city_c=310100'}
        };
        var req = http.request(options, function(res) {
            // console.log(res);
            var data = ''; 
            res.on('data', function (chunk) {
                data += chunk;
            }); 
            res.on('end', function () {
                // HTTP 状态码: 200 : OK
                // Content Type: text/plain
                // response.writeHead(200, {'Content-Type': 'text/html'});    
                // 响应文件内容
                response.setHeader('Content-Type','text/javascript;charset=UTF-8');
                response.write(data);
                //  发送响应数据
                response.end();
            }); 
        });

        req.on('error', function(e) {
            //TODO
        });

        req.end();
    } else if (pathname == '/city/list') {
        // http://house-sv-base.focus-test.cn/city/list
        var options = { 
            hostname: 'house-sv-base.focus-test.cn',
            path: '/city/list?provinceId=' + arg.provinceId,
            method: 'GET'
        };
        var req = http.request(options, function(res) {
            // console.log(res);
            var data = ''; 
            res.on('data', function (chunk) {
                data += chunk;
            }); 
            res.on('end', function () {
                // HTTP 状态码: 200 : OK
                // Content Type: text/plain
                // response.writeHead(200, {'Content-Type': 'text/html'});    
                // 响应文件内容
                response.setHeader('Content-Type','text/javascript;charset=UTF-8');
                response.write(data);
                //  发送响应数据
                response.end();
            }); 
        });

        req.on('error', function(e) {
            //TODO
        });

        req.end();
    } else if (pathname == '/test') {
        var data = 'test', indexTest;
        for (indexTest in test) {
            data = test[indexTest];
            delete test[indexTest];
            break;
        }
        console.log(test);
        response.setHeader('Content-Type','text/javascript;charset=UTF-8');
        response.write(data);
    } else {
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
            //  发送响应数据
            response.end();
        });
    }
}).listen(8883);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8888/');