const mongoose = require('mongoose')
// imports mongoose

// sets new object authorSchema with a name of type String which is needed to create such Object
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// exports the authorSchema object under the name Author
module.exports = mongoose.model('Author', authorSchema)