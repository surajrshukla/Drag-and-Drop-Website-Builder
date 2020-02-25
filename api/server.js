const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
var fs = require("fs");


const currentPath = path.resolve();
const basePath = currentPath + '/.env';
const envPath = basePath + '.' + process.env.NODE_ENV;
const finalPath = fs.existsSync(envPath) ? envPath : basePath;

const dotenv = require('dotenv');
const fileEnv = dotenv.config({ path: finalPath });
var port = normalizePort(process.env.PORT);

MongoClient.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`,{ useNewUrlParser: true }, function(err, db) {
    if(err) { return console.dir(err); }
    console.log("yey mongodb is up and high ")
    global.mongoCon = db;
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// declare routes here
const PageRoute = require('./routes/pageroute');
app.use('/pages', PageRoute)
app.listen(port, () => console.log('Express is running on port ' + port));

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
}