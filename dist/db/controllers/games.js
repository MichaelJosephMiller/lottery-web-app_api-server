'use strict';

const mongoose = require('mongoose');

const gamesSchema = require('../schemas/games');

const Games = mongoose.model('Games', gamesSchema, 'Games');

exports.get_all_games = () => {
  return new Promise((resolve, reject) => {
    Games.find({}, (err, games) => {
      err ? reject(err) : resolve(games);
    });
  });
};

exports.upsert_game_by_name = game => {
  return new Promise((resolve, reject) => {
    Games.findOneAndUpdate({
      name: game.name
    }, game, {
      upsert: true
    }, err => {
      err ? reject(err) : resolve('{"success": true}');
    });
  });
};

exports.get_game_by_name = name => {
  return new Promise((resolve, reject) => {
    Games.find({
      name: name
    }, (err, game) => {
      err ? reject(err) : resolve(game);
    });
  });
};

exports.create_new_game = game => {
  return new Promise((resolve, reject) => {
    Games.create(game, (err, game) => {
      err ? reject(err) : resolve(game);
    });
  });
};