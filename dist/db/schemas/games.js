'use strict';

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  participating_states: {
    type: [String]
  },
  next_draw_date: {
    type: String
  },
  current_est_jackpot: {
    type: String
  },
  current_cash_option: {
    type: String
  }
});