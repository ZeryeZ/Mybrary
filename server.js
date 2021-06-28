require('dotenv').config()

const express = require('express')


const mongoose = require('mongoose')
const app = express()
const expressLayouts = require('express-ejs-layouts')


const indexRouter = require('./routes/index.js')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to Mongoose'))
db.on('connected', () => console.log('working '))


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000);
