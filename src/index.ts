#!/usr/bin/env node --harmony

import 'colors'

import { printMovements, augmentMovements, getTotal, readMovements } from './bitcoins'
import { Configuration } from './Configuration'

const movements = readMovements()

console.log()
console.log()
console.log('Bitcoin Movement Tracker'.yellow.bold)
console.log()

printMovements(augmentMovements(movements))

const total = getTotal(movements)

console.log()
console.log('Current Rate'.yellow.bold)
console.log(`1 XBT = ${Configuration.XbtRateAmount} ${Configuration.XbtRateCurrency}`.yellow)
console.log()
console.log('Totals'.yellow.bold)
console.log(`${total} XBT`.yellow)
console.log(`${Math.round(Configuration.XbtRateAmount * total)} ${Configuration.XbtRateCurrency}`.yellow)
console.log(`${Math.round(Configuration.XbtRateAmount * total * Configuration.AlternativeRate)} ${Configuration.AlternativeCurrency}`.yellow)

console.log()
console.log()