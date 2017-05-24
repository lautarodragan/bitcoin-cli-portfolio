#!/usr/bin/env node --harmony

import 'colors'

import './Array'
import { Configuration } from './Configuration'
import { printMovements, augmentMovements, getTotal, readMovements, twirlTimer } from './bitcoins'
import { satoshiTango } from './Rate'
import { clearInterval } from 'timers'

const movements = augmentMovements(readMovements())

const total = getTotal(movements)
const gain = movements.map(movement => movement.gain).sum()

console.log()
console.log()
console.log('Bitcoin Movement Tracker'.yellow.bold)
console.log()

printMovements(movements)

console.log()
//console.log('Retrieving current rate...')

const twirlInterval = twirlTimer()

satoshiTango().then(_ => {
  clearInterval(twirlInterval)
  process.stdout.write('\r    \n')

  //console.log()
  console.log('Current Rate'.yellow.bold)
  console.log(`1 XBT = ${Configuration.XbtRateAmount} ${Configuration.XbtRateCurrency}`.yellow)
  console.log()

  console.log('Totals'.yellow.bold)
  console.log(`${total} XBT`.yellow)
  console.log(`${Math.round(Configuration.XbtRateAmount * total)} ${Configuration.XbtRateCurrency}`.yellow)
  console.log(`${Math.round(Configuration.XbtRateAmount * total * Configuration.AlternativeRate)} ${Configuration.AlternativeCurrency}`.yellow)

  console.log()
  console.log('Gain'.yellow.bold)
  console.log(`${Math.round(gain)} ARS`.yellow)

  console.log()
  console.log()
})

