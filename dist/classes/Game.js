'use strict';

module.exports = class Game {
  constructor(game) {
    this.name = game.name;
    this.participating_states = game.participating_states;
    this.next_draw_date = game.next_draw_date;
    this.current_est_jackpot = game.current_est_jackpot;
    this.current_cash_option = game.current_cash_option;
    this.validateDate();
    this.validateStates();
  }

  validateStates() {
    this.participating_states = this.participating_states.map(state => {
      if (typeof state !== 'string') {
        throw Error('State names must be a string');
      }

      state = state.trim();
      return state;
    });
  }

  validateDate() {
    if (typeof this.next_draw_date === 'string') {
      // date must parse into a date object
      try {
        this.next_draw_date = new Date(this.next_draw_date);
      } catch (err) {
        throw Error(`Date is not in a supported format. \n\t ${JSON.stringify(err)}`);
      }
    } // Mega Millions dates must fall on tuesday or friday


    if (this.next_draw_date.getDay() !== 2 && this.next_draw_date.getDay() !== 5) {
      throw Error('Date must fall on tuesday or friday');
    }

    this.next_draw_date = this.next_draw_date.toDateString();
  }

};