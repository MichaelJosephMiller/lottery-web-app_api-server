/* eslint-disable no-console */
'use strict'
const mongoose = require('mongoose')
const megaMillionsDrawingSchema = require('../../schemas/megaMillions/drawing')
const MegaMillionsHistory = mongoose.model('MegaMillionsHistory', megaMillionsDrawingSchema, 'MegaMillionsHistory')

module.exports.create_new_drawing = (drawing) => {
  return new Promise((resolve, reject) => {
    MegaMillionsHistory.create(drawing, (err, response) => {
      err ? reject(err) : resolve(response)
    })
  })
}
module.exports.delete_drawing_by_id = (id) => {
  return new Promise((resolve, reject) => {
    MegaMillionsHistory.remove({ _id: id }, (err, response) => {
      err ? reject(err) : resolve(response)
    })
  })
}

module.exports.upsert_drawing_by_date = (drawing) => {
  return new Promise((resolve, reject) => {
    MegaMillionsHistory.findOneAndUpdate({ date: drawing.date }, drawing, { upsert: true }, (err) => {
      err ? reject(err) : resolve('{"success": true}')
    })
  })
}
module.exports.get_all_drawings = () => {
  return new Promise((resolve, reject) => { 
    MegaMillionsHistory.find({}, (err, drawings) => {
      err ? reject(err) : resolve(drawings)
    })
  })
}
module.exports.get_drawings_by_date_range = (from, to) => {
  return new Promise((resolve, reject) => {
    let query = { date: { $gte: from, $lte: to } }
    MegaMillionsHistory.find(query, (err, drawings) => {
      err ? reject(err) : resolve(drawings)
    })
  })
}
module.exports.get_drawing_by_date = (date) => {
  return new Promise((resolve, reject) => {
    MegaMillionsHistory.findOne({ date: date }, (err, drawing) => {
      err ? reject(err) : resolve(drawing)
    })
  })
}
module.exports.insert_multiple_drawings = async (drawingsArray) => {
  let docs = await MegaMillionsHistory.insertMany(drawingsArray,  { ordered: false })
    .then(docs => docs)
    .catch(err => console.log(err))
  console.log(`Docs returned from insertMany(): ${docs}`)
  return docs
}
