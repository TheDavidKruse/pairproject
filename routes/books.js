var express = require('express');
var books = require('../db/config');
var router = express.Router();

router.get('/', function(req,res){
    res.render('books', {
        bookList: books.find()
    });
});
router.get('/add', function(req,res){
    res.render('add');
});

router.post('/add', function(req,res){
    console.log(req.body);
    books.insert({"Book Title": req.body.bookTitle,
                "Author 1 First Name": req.body.author1FirstName,
                "Author 1 Last Name": req.body.author1LastName})

    res.redirect('/books')
})

router.get('/delete/:id', function(req,res) {
    books.findAndRemove({
        "ID": parseInt(req.params.id)
    });
    res.render('books');
})

router.get('/:id', function(req,res){
    res.render('books', {
        bookList: books.find({ID: parseInt(req.params.id)})
    });
});


module.exports = router;