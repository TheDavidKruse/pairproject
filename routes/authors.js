var express = require('express');
var authors = require('../db/config');
var router = express.Router();

router.get('/', function(req,res){
    res.render('authors', {
        authorList: authors.find()
    });
});
router.get('/add', function(req,res){
    res.render('add');
});

router.post('/add', function(req,res){
    console.log(req.body);
    authors.insert({"author Title": req.body.authorTitle,
                "Author 1 First Name": req.body.author1FirstName,
                "Author 1 Last Name": req.body.author1LastName})

    res.redirect('/authors')
})

router.get('/delete/:id', function(req,res) {
    authors.findAndRemove({
        "ID": parseInt(req.params.id)
    });
    res.redirect('/authors');
})

router.get('/edit/:id', function(req,res){
    res.render('edit', {
        authorToEdit: authors.find({
            ID: parseInt(req.params.id)
        })[0]
    })
})
router.get('/filter', function(req,res){
    console.log("logging .filter");
    res.render('authors',{
        authorList: authors.find({
            "Author 1 First Name": req.query.author1FirstName,
            "Author 1 Last Name": req.query.author1LastName
        })
    })
})
router.get('/:id', function(req,res){
    res.render('authors', {
        authorList: authors.find({ID: parseInt(req.params.id)})
    });
});


router.post('/edit', function(req,res){
    authors.findAndUpdate({
        ID: parseInt(req.body.ID)
    },function(data){
        data['author Title'] = req.body.authorTitle;
        data['author Genre'] = req.body.authorGenre;
        data['Author 1 First Name'] = req.body.author1FirstName;
        data['Author 1 Last Name'] = req.body.author1LastName;
    })
    console.log("Redirecting");
    res.redirect('/authors');
})



module.exports = router;
