const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const fs = require('fs');
const PORT = 4000

app.use(express.static(__dirname + "/public"))
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded());


// Login route
app.get("/login", (req, res) => {
    res.cookie("token", true, {
        sameSite: "None", secure: true, expires: new Date(Date.now() + 900000)
    })
    res.status(200).json({message: "Logged in"})
})

app.get("/page/:page", (req, res) => {
    let page = req.params.page;
    let path = __dirname + "/public/" + page + ".html";
    if(!fs.existsSync(path)){
        res.status(404).sendFile(__dirname + "/public/404.html");
    } else {
        if(req.cookies.token){
        res.sendFile(path);
        } else {
            res.sendFile(__dirname + "/public/index.html")
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})