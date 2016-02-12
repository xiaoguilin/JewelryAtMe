var http = require('http');
var fs = require('fs');
var url = require('url'); 
var path   = require('path');   
// var mime = require('mime').mime; 

mime = {  
    "html" : "text/html",  
    "css"  : "text/css",  
    "js"   : "text/javascript",  
    "json" : "application/json",  
    "ico"  : "image/x-icon",  
    "gif"  : "image/gif",  
    "jpeg" : "image/jpeg",  
    "jpg"  : "image/jpeg",  
    "png"  : "image/png",  
    "pdf"  : "application/pdf",  
    "svg"  : "image/svg+xml",  
    "swf"  : "application/x-shockwave-flash",  
    "tiff" : "image/tiff",  
    "txt"  : "text/plain",  
    "wav"  : "audio/x-wav",  
    "wma"  : "audio/x-ms-wma",  
    "wmv"  : "video/x-ms-wmv",  
    "xml"  : "text/xml"  
};  

// 创建服务器
http.createServer( function (request, response) {  
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
         var extname = path.extname( pathname );    
         var type = extname.slice(1);   
         console.log("extname: " + extname + " , type: " + type);

         console.log("Mine: " + mime + " , mime[type]: " + mime[type]);

         if ( type === 'html' ) {    
               // HTTP 状态码: 200 : OK
               // Content Type: text/plain
               response.writeHead(200, {'Content-Type': 'text/html'});  
               // 响应文件内容
               response.write(data.toString());  

               console.log("data: " + data.toString());          
          } else {    
               fs.readFile(pathname.substr(1), 'binary', function(err, file){    
                if ( err ) {    
                    response.writeHead(500, {'Content-Type': 'text/plain'});        
                } else {    
                    response.writeHead(200, {'Content-Type': mime[type]});    
                    response.write(file, 'binary');  

                    console.log("data: " + file.toString());   
                }    
            });   
          }    
      }
      //  发送响应数据
      response.end();

   });   
}).listen(8080);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');