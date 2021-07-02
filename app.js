const express = require('express');
const cors = require("cors");
const mainRoute = require('./routes');

const corsData = {
    origin: "http://localhost:8081"
  };

const http = require('http');
const https = require('https');
const fs = require('fs');
const httpPort = 8080;
const httpsPort = 8443;

const key = fs.readFileSync(__dirname + '/certfiles/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/certfiles/selfsigned.crt');

const credentials = {
  key: key,
  cert: cert
};

const app = express();  

app.use(cors(corsData));

// content-type - application/json
//app.use(express.json());

//  content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
mainRoute(app);

// simple route
app.get((req, res) => {
    res.json({ message: "Welcome to SEED API." });
  });


// set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


httpServer.listen(httpPort, () => {
  console.log("Http server listing on port : " + httpPort)
});

httpsServer.listen(httpsPort, () => {
  console.log("Https server listing on port : " + httpsPort)
});