/* eslint-disable node/no-extraneous-require */
/* eslint-disable no-console */
const express = require('express')
const routes = require('./routes/')
const mongoose = require('mongoose')
const db = mongoose.connection
const app = express()
require('custom-env').env('dev')
const cron = require('node-cron')
const scraper = require('./modules/scraper')

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

mongoose.connect(`${DB_HOST}${DB_USER}:${DB_PASS}@cluster0-xkja0.mongodb.net/lottery-web-app?retryWrites=true`, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Mongoose connected to LotteryWebAppDb')
})

cron.schedule('0 3,15 * * *', () => { scraper.megaMillions.website.scrape() }, { scheduled: true })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/games', routes.games)
app.use('/mega_millions/', routes.megaMillions)

// Uncomment to reload Mega Millions history on next restart
// const scraper = require('./modules/scraper')
// scraper.megaMillions.history.get()
// scraper.megaMillions.website.scrape()

module.exports = app
