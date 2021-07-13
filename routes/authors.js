
/* import = require which means this imports express and from my own project files from models/authors.js
    then it sets express.Router equal to router
*/
const express = require('express')
const router = express.Router()
const Author = require('../models/author.js')


// All authors route
// router is a middleware same as app but one instance under app its there to handle the req and res.
router.get('/', async (req, res) => {
    
    let searchOptions = {}
   
//  req.query.name ist was req= nachfrage query= abfrage nach etwas name= is the self made variable which is set equal to whatever you typed in
//  RegExp creates a string (\input\i in this case) with extras which allows you to search through a string and filter things youre looking for out of it 
    if (req.query.name != null && req.query.name !== '') {
        
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
//  tries this block of code with try and if code gets error it will get to the catch section
    try {
/*  Creates an array of the authors searched for
    await is stopping the async function and waits for the operations to finish before it will go on.
    Then renders the index.ejs file in authors folder. This takes the input of the authors array and the searchOptions of the input youre looking for
    if not it redirects you to the main page
*/
        const authors = await Author.find(searchOptions); 
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query 
        })
    } catch {
        res.redirect('/') 
    }
    
})

// New Author Route
// if you get send to the /new route this will render the new.ejs file and sets the author equal to a new Author object 
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
    
})

// Create Author Route
/* if youre on the creating site and then hit create you will send a POST request to the main .../authors page 
   and this router.post will catch this POST request and first set author equal to the input you just send and then will tty to save the input into the DB 
   and will redirect to the normal authors page if this doesnt work the catch will get you back to the creating page and will throw you an error
*/
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    // console.log(author);
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