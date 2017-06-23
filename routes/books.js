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
    res.redirect('/books');
})

router.get('/edit/:id', function(req,res){
    res.render('edit', {
        bookToEdit: books.find({
            ID: parseInt(req.params.id)
        })[0]
    })
})
router.get('/filter', function(req,res){
    console.log("logging .filter");
    res.render('books',{
        bookList: books.find({
            "Author 1 First Name": req.query.author1FirstName,
            "Author 1 Last Name": req.query.author1LastName
        })
    })
})
router.get('/authbooks', function(req,res){
    res.render('/authbooks',{
        
    });
})
router.get('/:id', function(req,res){
    res.render('books', {
        bookList: books.find({ID: parseInt(req.params.id)})
    });
});


router.post('/edit', function(req,res){
    books.findAndUpdate({
        ID: parseInt(req.body.ID)
    },function(data){
        data['Book Title'] = req.body.bookTitle;
        data['Book Genre'] = req.body.bookGenre;
        data['Author 1 First Name'] = req.body.author1FirstName;
        data['Author 1 Last Name'] = req.body.author1LastName;
    })
    console.log("Redirecting");
    res.redirect('/books');
})



module.exports = router;
