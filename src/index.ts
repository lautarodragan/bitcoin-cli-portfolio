#!/usr/bin/env node --harmony

import 'colors'

import './Array'
import { augmentMovements, getTotal, readMovements, twirlTimer } from './bitcoins'
import { satoshiTango } from './Rate'
import { clearInterval } from 'timers'
import { printMovements, printTotals } from './Printer'

const satoshiTangoRate = satoshiTango()
const movements = augmentMovements(readMovements())

console.log()
console.log()
console.log('Bitcoin Movement Tracker'.yellow.bold)
console.log()

printMovements(movements)

console.log()

const twirlInterval = twirlTimer()

satoshiTangoRate.then(_ => {
  clearInterval(twirlInterval)
  process.stdout.write('\r    \n')

  const total = getTotal(movements)
  const gain = movements.map(movement => movement.gain).sum()
  printTotals(total, gain)

})

