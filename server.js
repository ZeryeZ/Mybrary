require('dotenv').config()

const express = require('express')


const mongoose = require('mongoose')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


const indexRouter = require('./routes/index.js')
const authorRouter = require('./routes/authors.js')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to Mongoose'))
db.on('connected', () => console.log('working '))


app.use('/', indexRouter)
app.use('/authors', authorRouter)


app.listen(process.env.PORT || 3000);
