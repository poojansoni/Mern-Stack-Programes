const express = require("express");
const app = express();

const port = 8000;

app.get('/',(req,res)=>{
    res.send("Welcome to the home page");
});

app.get('/login',(req,res)=>{
    res.send("You are logging in");
});

app.get('/poojan',(req,res)=>{
    res.send("about the author");
});

app.get('/signout',(req,res)=>{
    res.send("Bye! visit us once again");
});

app.listen(port,()=>{
    console.log("Server is up and running...");
})
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })