const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

const mongoURI = require("./config/keys").mongoURI;

mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("MongoDB successfully connected"))
.catch(err=>console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server is running on port: ${port}`));
