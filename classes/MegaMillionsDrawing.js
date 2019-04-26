'use strict'
const validate = require('./utils/validate')

module.exports = class MegaMillionsDrawing {
  static wbMax = 70
  static mbMax = 25
  static tempDate
  static temp
  
  constructor(drawing) {
    this.date = drawing.draw_date
    this.wb1 = drawing.wb1
    this.wb2 = drawing.wb2
    this.wb3 = drawing.wb3
    this.wb4 = drawing.wb4
    this.wb5 = drawing.wb5
    this.megaball = drawing.mega_ball
    this.megaplier = drawing.multiplier
    this.id = drawing.id
    this.big_winners = drawing.big_winners
    this.est_jackpot = drawing.est_jackpot
    this.cash_option = drawing.cash_option

    if (drawing.winning_numbers) { this.setWinningNumbers(drawing.winning_numbers) }
    this.validate()
  }

  setWinningNumbers(winningNumbers) {
    try { winningNumbers = winningNumbers.trim().split(' ') }
    catch(err) { `Error in MegaMillsionsDrawing class setWinningNumbers(): ${JSON.stringify(err)}` }
    this.wb1 = winningNumbers[0]
    this.wb2 = winningNumbers[1]
    this.wb3 = winningNumbers[2]
    this.wb4 = winningNumbers[3]
    this.wb5 = winningNumbers[4]
  }

  validate() {
    try {
      this.date = validate.date(this.date, 'Mega Millions')
    } catch (err) {
      throw Error(`Date ${this.date} will not validate ${err}`)
    }
    try {
      this.wb1 = this.validateWb(this.wb1)
    } catch (err) {
      throw Error('WB1 number will not validate')
    }
    try {
      this.wb2 = this.validateWb(this.wb2)
    } catch (err) {
      throw Error('WB2 number will not validate')
    }
    try {
      this.wb3 = this.validateWb(this.wb3)
    } catch (err) {
      throw Error('WB3 number will not validate')
    }
    try {
      this.wb4 = this.validateWb(this.wb4)
    } catch (err) {
      throw Error('WB4 number will not validate')
    }
    try {
      this.wb5 = this.validateWb(this.wb5)
    } catch (err) {
      throw Error('WB5 number will not validate')
    }
    try {
      this.megaball = this.validateMB(this.megaball)
    } catch (err) {
      throw Error('MB will not validate')
    }
    try {
      this.megaplier = this.validateMB(this.megaplier)
    } catch (err) {
      throw Error('MP will not validate')
    }
  }

  // Static Methods
  validateMB(num) {
    let tempNum
    // MB must be a number
    try {
      tempNum = Number(num)
    } catch (err) {
      throw Error('MB is not a number')
    }
    // MB must be from 1 to maxMB value
    if (tempNum < 1 || tempNum > MegaMillionsDrawing.mbMax) {
      throw Error(`megaball number must be a number from 1 to ${MegaMillionsDrawing.mbMax}`)
    }
    return tempNum
  }
  validateWb(num) {
    let tempNum
    // WB must be a number
    try {
      tempNum = Number(num)
    } catch (err) {
      throw Error('WB is not a number')
    }
    // WB must be from 1 to maxWB value
    if (tempNum < 1 || tempNum > MegaMillionsDrawing.wbMax) {
      throw Error(`Whiteball number must be a number from 1 to ${MegaMillionsDrawing.wbMax}`)
    }
    return tempNum
  }
}