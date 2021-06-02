require('dotenv').config() //using .env variables
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED");
}).catch((err)=>console.log('SOME ERROR: ', err));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is running at ${port}`);
})