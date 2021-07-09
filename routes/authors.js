
/* import = require which means this imports express and from my own project files from models/authors.js
    then it sets express.Router equal to router
*/
const express = require('express')
const router = express.Router()
const Author = require('../models/authors.js')


// All authors route
// router is a middleware same as app but one instance under app its there to handle the req and res.
router.get('/', async (req, res) => {
    
    let searchOptions = {};
//  req.query.name ist was req= nachfrage query= abfrage nach etwas name= is the self made variable which is set equal to whatever you typed in
//  RegExp creates a string with extras which allows you to search through a string and filter things youre looking for out of it 
    if (req.query.name != null && req.query.name !== '') {

        searchOptions = new RegExp(req.query.name, 'i')
        
    }
    try {
        const authors = await Author.find(searchOptions);
        // console.log(authors);  
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query 
        })
    } catch {
        // console.log("is redirecting");
        res.redirect('/')
    }
    
})


// New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
    
})

// Create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    console.log(author);
    try {
        const newAuthor = await author.save()
    //  res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router