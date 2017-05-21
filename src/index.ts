#!/usr/bin/env node --harmony

import 'colors'

import { printMovements, augmentMovements, getTotal, readMovements } from './bitcoins'

const movements = readMovements()

const currentRate = 35261
const currency = 'ARS'
const dollarRate = 1 / 16

console.log()
console.log()
console.log('Bitcoin Movement Tracker'.yellow.bold)
console.log()

printMovements(augmentMovements(movements))

const total = getTotal(movements)

console.log()
console.log('Totals'.yellow.bold)
console.log(`${total} XBT`.yellow)
console.log(`${Math.round(currentRate * total)} ${currency}`.yellow)
console.log(`${Math.round(currentRate * total * dollarRate)} USD`.yellow)

console.log()
console.log()