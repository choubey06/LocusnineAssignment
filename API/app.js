const express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');

var users = require('./routes/users'); 
var app = express();
app.use(cors());

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
}));


app.get('/users', users.list);
app.post('/getuser',users.getuser);
app.post('/adduser', users.add);
//app.post('/edituser', (req, res) => {console.log(req.body)});
app.post('/edituser',users.update);
app.post('/deleteuser', users.delete);

app.listen(8080, function () {
    console.log('Server is running.. on Port 8080');
});