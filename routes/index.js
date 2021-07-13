const express = require('express')
const router = express.Router()

// will render the index.ejs file in the views when on root page
router.get('/', (req, res) => {
    res.render('index')
})


module.exports = router