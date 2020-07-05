var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var movieresults;



//Connect to MySQL
var connection = mysql.createConnection({
  host: '******',
  user: '****',
  password: '******',
  database: 'nodelogin'
});

var app = express();


app.use(express.static(__dirname)); //Apply CSS



app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});



var table = ''; //to store html table for search result


//Search by name
app.post('/search', function (request, response) {
  var handlename = request.body.handlename;
  if (handlename) {
    connection.query('SELECT moviename, yearshown, yearseen, rating FROM movielist WHERE handlename = ? ORDER BY yearseen desc', [handlename], function (error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = handlename;
        console.log(JSON.stringify(results));
        movieresults = JSON.stringify(results);

        //convert JSON to table

        //create html table with data from res.
        for (var i = 0; i < results.length; i++) {
          table += '<tr><td style="border-bottom: 1px solid #ddd; padding-right:10px; padding-top:15px; padding-bottom:15px; font-size:20px; color: #808080; line-height: 1.4;">' + results[i].moviename + '</td><td style="border-bottom: 1px solid #ddd; padding-right:10px; padding-top:15px; padding-bottom:15px; font-size:20px; color: #808080; line-height: 1.4;">' + results[i].yearshown + '</td><td style="border-bottom: 1px solid #ddd; padding-right:10px; padding-top:15px; padding-bottom:15px; font-size:20px; color: #808080; line-height: 1.4;">' + results[i].yearseen + '</td><td style="border-bottom: 1px solid #ddd; padding-right:10px; padding-top:15px; padding-bottom:15px; font-size:20px; color: #808080; line-height: 1.4;">' + results[i].rating + '</td></tr>';
        }
        table = '<table style="width:80%;  margin:auto; padding-top:50px;"><tr><th style="width: 30%; padding-top:18px; padding-bottom:18px; font-family: Lato-Bold; font-size:25px; color:#333; line-height:1.4; background: url(../images/bg3.jpg) repeat center top;">Name of Movie</th><th style="width: 20%;padding-top:18px; padding-bottom:18px; font-family: Lato-Bold; font-size:25px; color:#333; line-height:1.4; background: url(../images/bg3.jpg) repeat center top;">Release Year</th><th style="width: 20%; padding-top:18px; padding-bottom:18px; font-family: Lato-Bold; font-size:25px; color:#333; line-height:1.4; background: url(../images/bg3.jpg) repeat center top;">When You Watched</th><th style="width: 10%; padding-right:20px; padding-left: 15px; padding-top:18px; padding-bottom:18px; font-family: Lato-Bold; font-size:25px; color:#333; line-height:1.4; background: url(../images/bg3.jpg) repeat center top;">Rating</th></tr>' + table + '</table>';


        response.redirect('/result');
      } else {
        response.send('Incorrect Handlename');
      }
      response.end();
    });
  } else {
    response.send('Please enter handlename!');
    response.end();
  }
});


//add a new movie in list
app.post('/add', function (request, response) {
  //  var handlename = request.body.handlename;
  var addname = request.body.addname;
  var addmoviename = request.body.addmoviename;
  var addyearshown = request.body.addyearshown;
  var addyearseen = request.body.addyearseen;
  var addrating = request.body.addrating;
  if (addname) {
    connection.query('INSERT INTO movielist (handlename, moviename, yearshown, yearseen, rating) values (?, ?, ?, ?, ?)', [addname, addmoviename, addyearshown, addyearseen, addrating], function (error, results, fields) {
      request.session.loggedin = true;

      addmessage = '<h1 style="text-align:center; color: #333; margin: 25% 20%; padding: 10px 0;background: url(../images/menu_instagram.png);">新しい映画が追加されました</h1>';


      response.redirect('/success');
      response.end();
    });
  } else {
    response.send('Please enter all field!');
    response.end();
  }
});



//show table of results
app.get('/result', function (request, response) {
  if (request.session.loggedin) {
    response.send(table);
  } else {
    response.send('Please login to view this page!');
  }
  response.end();
});

//when adding a new movie works
app.get('/success', function (request, response) {
  if (request.session.loggedin) {
    response.send(addmessage);
  } else {
    response.send('');
  }
  response.end();
});


app.listen(8080);
