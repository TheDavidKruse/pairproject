var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = process.env.PORT || 8000;
var path = require('path');
var app = express();
var bookRoutes = require('./routes/books');
var authorRoutes = require('./routes/authors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(express.static('public'));
app.use(cors());

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port, function() {
  console.log('listening on: ', port);
})