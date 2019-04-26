/* eslint-disable no-undef */

/* eslint-disable no-console */
'use strict';

const Game = require('../../../classes/Game');

const MegaMillionsDrawing = require('../../../classes/MegaMillionsDrawing');

const mmHistoryCollection = require('../../../db/controllers/megaMillions/history');

const gamesCollection = require('../../../db/controllers/games');

const Nightmare = require('nightmare');

const nightmare = Nightmare({
  show: true
});

module.exports.scrape = () => {
  nightmare.goto('https://www.megamillions.com').wait(3000).evaluate(() => {
    let obj = {};
    obj.lastDrawing = {};
    obj.lastDrawing.big_winners = {};
    obj.lastDrawing.date = document.querySelector('#lastestDate').innerText;
    obj.lastDrawing.wb1 = document.querySelector('.winNum1').innerText;
    obj.lastDrawing.wb2 = document.querySelector('.winNum2').innerText;
    obj.lastDrawing.wb3 = document.querySelector('.winNum3').innerText;
    obj.lastDrawing.wb4 = document.querySelector('.winNum4').innerText;
    obj.lastDrawing.wb5 = document.querySelector('.winNum5').innerText;
    obj.lastDrawing.megaBall = document.querySelector('.winNumMB').innerText;
    obj.lastDrawing.megaplier = document.querySelector('.winNumMP').innerText;
    obj.estJackpot = document.querySelector('span.nextEstVal.js_estJackpot').innerText;
    obj.cashOpt = document.querySelector('span.cashOpt').innerText;
    obj.nextDrawDate = document.querySelector('span.nextDrawDate').innerText + '/' + new Date().getFullYear(); // If no big winners assign null to match_type and states

    try {
      obj.lastDrawing.big_winners.match_type = document.querySelector('#bw50 h4').innerText;
      obj.lastDrawing.big_winners.states = document.querySelector('.bwState').innerText;
    } catch (err) {
      obj.lastDrawing.big_winners = {
        match_type: null,
        states: null
      };
    }

    return obj;
  }).then(obj => {
    nightmare.goto('https://www.megamillions.com/Where-to-Play.aspx').wait(2000).evaluate(obj => {
      let optionsEls = document.querySelectorAll('.select-options ul li');
      let participating_states = [];
      optionsEls.forEach(el => {
        participating_states.push(el.querySelector('span').innerText);
      });
      obj.participating_states = participating_states;
      return obj;
    }, obj).end().then(obj => updateDb(obj)).catch(err => console.log(err));
  }).catch(err => console.log(err));
};

function updateDb(obj) {
  let lastDrawing = {
    draw_date: obj.lastDrawing.date,
    wb1: obj.lastDrawing.wb1,
    wb2: obj.lastDrawing.wb2,
    wb3: obj.lastDrawing.wb3,
    wb4: obj.lastDrawing.wb4,
    wb5: obj.lastDrawing.wb5,
    mega_ball: obj.lastDrawing.megaBall,
    multiplier: obj.lastDrawing.megaplier[0],
    big_winners: {
      match_type: obj.lastDrawing.big_winners.match_type,
      states: obj.lastDrawing.big_winners.states
    }
  };
  let game = {
    name: 'Mega Millions',
    participating_states: obj.participating_states,
    next_draw_date: obj.nextDrawDate,
    current_est_jackpot: obj.estJackpot,
    current_cash_option: obj.cashOpt
  };
  game = new Game(game);
  let existingGame = gamesCollection.get_game_by_name(game.name);

  if (existingGame.next_draw_date === gamesCollection.next_draw_date) {
    gamesCollection.upsert_game_by_name(game);
  } else {
    lastDrawing.est_jackpot = existingGame.current_est_jackpot;
    lastDrawing.cash_option = existingGame.current_cash_option;
  }

  lastDrawing = new MegaMillionsDrawing(lastDrawing);
  mmHistoryCollection.upsert_drawing_by_date(lastDrawing);
}