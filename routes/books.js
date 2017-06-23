var express = require('express');
var books = require('../db/config');
var router = express.Router();

router.get('/', function(req,res){
    res.render('books', {
        bookList: books.find()
    });
});

router.get('/:id', function(req,res){
    res.render('books', {
        bookList: books.find({ID: parseInt(req.params.id)})
    });
});

router.get('/add', function(req,res){
    res.render('add');
});

module.exports = router;
