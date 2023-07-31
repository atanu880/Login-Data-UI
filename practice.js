
// want the data as object(using parse)

const http=require("http")
const fs=require("fs")
const {parse}=require("querystring") //we get the data in string format ..for convert in to object need this line,,

let server=http.createServer((req,res)=>{
    if(req.method==="POST"){  //if not post method enter into a else block
        if(req.headers["content-type"]==="application/x-www-form-urlencoded"){
            let body=""
            req.on("data",(chunk)=>{
                body+=chunk;
                console.log(body) //terminal a data show korbe log korle
            })
            req.on("end",()=>{
                let data=parse(body) //body convrt into object format
                res.end(JSON.stringify(data)) // without this im not get yhe answer server revolving,,,used only when data send 

            })
        }
        else{
            res.end(null)
        }

    }
    else{ 
       if(req.url==="/" || req.url==="/home"){
        res.writeHead(200,"okey",{"content-type":"text/html"})
        let html=fs.readFileSync("./index.html","utf-8") //read the data from html
        res.end(html)
       }
       else if(req.url==="/style"){
        res.writeHead(200,"okey",{"content-type":"text/css"})
        let css=fs.readFileSync("./style.css","utf-8")
        res.end(css)
       }
        
       else{
        res.end("page not found")
       }
    }

})
server.listen(5000,(err)=>{
    if(err){
        throw err
    }
    console.log("server is running on port 5000");
})