'use strict';

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true
  },
  wb1: {
    type: Number,
    required: true
  },
  wb2: {
    type: Number,
    required: true
  },
  wb3: {
    type: Number,
    required: true
  },
  wb4: {
    type: Number,
    required: true
  },
  wb5: {
    type: Number,
    required: true
  },
  megaball: {
    type: Number,
    required: true
  },
  megaplier: {
    type: Number
  },
  big_winners: {
    match_type: {
      type: String
    },
    states: {
      type: String
    }
  },
  est_jackpot: {
    type: String
  },
  cash_option: {
    type: String
  }
});