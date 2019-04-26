
module.exports.date = (date, gameName) => {
  let tempDate = ''
  if (typeof date === 'string') {
    // date must parse into a date object
    try { tempDate = new Date(date) 
    } catch(err) { throw Error(`Date is not in a supported format. \n\t ${JSON.stringify(err)}`) }
  }
  if (gameName === 'Mega Millions') {
  // Mega Millions dates must fall on tuesday or friday
    if (tempDate.getDay() !== 2 && tempDate.getDay() !== 5) {
      throw Error('Date must fall on tuesday or friday')
    }
  }
  try {
    tempDate = tempDate.toDateString()
  } catch (err) {
    throw Error('tempDate not converting to date string')
  }
  return tempDate
}