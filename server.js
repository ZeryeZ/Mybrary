require('dotenv').config()

const express = require('express')


const mongoose = require('mongoose')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


const indexRouter = require('./routes/index.js')
const authorRouter = require('./routes/authors.js')

// set preferences for App/Website
app.set('view engine', 'ejs')

// where to find Views 
app.set('views', __dirname + '/views') 

// where to find Layouts
app.set('layout', 'layouts/layout')

// which layout type to use
app.use(expressLayouts)
// sets folder public to static type every file which is in there will be of type static and that way not changeable on runtime (i guess)
app.use(express.static('public'))

// extended: sets nested(verschachtelt) to false so json files cant be nested inside themselves anymore and limit sets the size of these files to 10 megabytes
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// Setups the Databank
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

// Handles error 
db.on('error', error => console.log(error))
// tells you when its connected 
db.once('open', () => console.log('connected to Mongoose'))
db.on('connected', () => console.log('working '))


// App uses / indexRouter file and for /authors the authorRouter file
app.use('/', indexRouter)
app.use('/authors', authorRouter)

// app listens to port of process.env.PORT which is a var that can be changed and if there is non in there it will take 3000 

app.listen(process.env.PORT || 3000);
