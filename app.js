const express = require("express");
const app = express();
const allRoutes = require('./routes/allRoutes')
const addUserRoute = require('./routes/addUser')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(express.static('public'));

require("dotenv").config({ debug: true });



const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "/views");
liveReloadServer.watch(__dirname + "/public");

//moment 
const moment = require("moment");
app.locals.moment = moment; // makes it available inside EJS
//add method override 
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//active cookie parser
var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use((req, res, next) => {
  res.locals.user = null;
  next();
});


const port = process.env.PORT;
//DB 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    app.listen(port, "0.0.0.0 " ,() => {
      console.log(`Server running at http://localhost:${port}/`);
    });

  })
  .catch((err) => { console.log(err) });
  
  app.use(allRoutes)
  app.use('/user',addUserRoute)
