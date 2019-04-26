'use strict'
const express = require('express')
const router = express.Router()
const games = require('../db/controllers/games')
const Game = require('../classes/Game')

router.get('/', (req, res) => {
  games.get_all_games()
    .then(result => res.json(result))
    .catch(err => res.send(err))
})
router.post('/', (req, res, next) => {
  let game
  try { game = new Game(req.body) } catch(err) { next(err) }
  games.create_new_game(game)
    .then(result => res.json(result))
    .catch(err => res.send(err))
})
router.get('/id=:id', (req, res) => {
  games.get_game_by_id(req.body.id)
    .then(result => res.json(result))
    .catch(err => res.send(err))
})
router.put('/', (req, res, next) => {
  let game
  try { game = new Game(req.body) } catch(err) { next(err) }
  games.update_game_by_id(game)
    .then(result => res.json(result))
    .catch(err => res.send(err))
})

module.exports = router
