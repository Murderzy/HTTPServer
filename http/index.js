const http = require("http");  //  подключаем модуль http
const fs = require("fs");  //  подключаем модуль fs


http.createServer((req, res)=>{
    res.setHeader("Content-Type", "text/html; charset=utf-8;");
    
    const pathReq = req.url;  //  получаем маршрут 
    console.log(pathReq);
    
    if(req.method="GET" && pathReq == "/")  //  get - запрос
    {
        
        fs.readFile("./index.html", function(error, data){  //  отдаем index.html
              
            if(error){
                      
                res.statusCode = 404;
                res.end("Resourse not found!");
            }   
            else{
                res.end(data);
            }
        });
        
    }
    else if(req.method="POST" && pathReq=="/login")  //  post - запрос
    {
        let body = "";
        req.on("data", (chunk)=>{body += chunk});
        req.on("end",()=>{
            const query = parse(body);
            console.log("Login: ${query.login} Password: ${query.password}");  //  выводим в консоль
            res.write("<h1>Авторизация успешна</h1>");  //  выводим текст для пользоателя
            res.end();
        })
    }
    else{
        res.end();
    }

}).listen(3000,()=>{console.log("Server works")});


