"use strict";

/* eslint-disable node/no-unpublished-require */

/* eslint-disable no-console */
const axios = require('axios');

const history = require('../../../db/controllers/megaMillions/history');

const MegaMillionsDrawing = require('../../../classes/MegaMillionsDrawing');

module.exports.get = async (limit = 5000) => {
  let response = await axios.get('https://data.ny.gov/resource/5xaw-6ayf.json', {
    params: {
      $limit: limit
    }
  }).then(response => response).catch(err => console.log(err));
  let docs = formatted(response.data);
  let docsSaved = await history.insert_multiple_drawings(docs);
  return docsSaved;
};

function formatted(drawingsArray) {
  let newDrawingsArray = drawingsArray.map(drawing => {
    let newDrawing;

    try {
      newDrawing = new MegaMillionsDrawing(drawing);
    } catch (err) {
      /**Return empty object for drawings that fail validation */
      return {};
    }

    return JSON.parse(JSON.stringify(newDrawing));
  }); // Filter out failed entries

  newDrawingsArray.filter(drawing => {
    drawing !== {};
  });
  return newDrawingsArray;
}