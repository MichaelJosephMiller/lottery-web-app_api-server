/* eslint-disable indent */
/* eslint-disable node/no-extraneous-require */
/* eslint-disable no-console */
const express = require('express')
const app = express()
const routes = require('./routes/')
const mongoose = require('mongoose')
const db = mongoose.connection
const cron = require('node-cron')
const scraper = require('./modules/scraper')
require('custom-env').env('dev')

const mongoURL = process.env.MONGO_URL,
      port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || '8080',
      ip = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

mongoose.connect(mongoURL, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Mongoose connected to LotteryWebAppDb')
})

cron.schedule('0 3,15 * * *', () => { scraper.megaMillions.website.scrape() }, { scheduled: true })

// Uncomment to reload Mega Millions history on next restart
// const scraper = require('./modules/scraper')
// scraper.megaMillions.history.get()
// scraper.megaMillions.website.scrape()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/games', routes.games)
app.use('/mega_millions/', routes.megaMillions)

app.listen(port, ip)
console.log(`Server running on http://${ip}:${port}`)

