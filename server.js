const express = require("express");
const hbs = require("hbs");
let app = express();
const fs = require("fs");

app.set("view engine", 'hbs');
hbs.registerPartials(__dirname+"/views/partials");


app.use(express.static(__dirname+"/web-server/views"));
app.use((req,res,next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log+"\n", (err)=>{
        if(err) console.log(err);
    })
    if(req.url === "/maintenance"){
        res.render("maintenance",{
            pageTitle : "Will right back"
        })
    }else{
        next()
    }


})


hbs.registerHelper("getCurrentYear", () =>{
    return new Date().getFullYear();
})

app.get("/", (req, res)=>{
    res.render("home.hbs", {
        pageTitle : "Welcome to Home Page"
    })
});

app.get("/about", (req,res) => {
    res.render("about.hbs",{
        pageTitle : "About Page",
    })
})

app.get("/bad", (req,res) => {
    res.set("Content-Type", "application/json")
    res.send({
        error : "Not Found",
        code : 3001
    })
})

app.listen(9001);