var express = require('express');
var authors = require('../db/config');
var router = express.Router();

router.get('/', function(req,res){
    res.render('authors', {
        authorList: authors.find()
    });
});

router.get('/:id', function(req,res){
    res.render('authors', {
        authorList: authors.find({ID: parseInt(req.params.id)})
    });
});

module.exports = router;