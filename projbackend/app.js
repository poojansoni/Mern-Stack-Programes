require('dotenv').config() //using .env variables
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//middlewares
const bodyParser = require('body-parser'); //access data from frontend eg)name, email etc
const cookieParser = require('cookie-parser'); //access cookie data seperatly 
const cors = require('cors'); //access/supply cross platform data 

//Routes variables
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//SETTING DB CONNECTION
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED");
}).catch((err)=>console.log('SOME ERROR: ', err));

//USING MIDDLEWARE in app
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

//MY ROUTES
app.use('/api', authRoutes);
app.use('/api', userRoutes);

//Port
const port = process.env.PORT;

//Starting a server
app.listen(port, () => {
    console.log(`App is running at ${port}`);
})