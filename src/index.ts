#!/usr/bin/env node --harmony

import 'colors'

import './Array'
import { augmentMovements, getTotal, readMovements } from './bitcoins'
import { satoshiTango } from './Rate'
import { printMovements, printTitle, printTotals } from './Printer'
import { TwirlInterval } from './TwirlInterval'

const twirl = new TwirlInterval()

async function main() {
  const movements = augmentMovements(readMovements())

  printTitle()
  printMovements(movements)

  twirl.start()
  await satoshiTango()
  twirl.stop()

  const total = getTotal(movements)
  const gain = movements.map(movement => movement.gain).sum()
  printTotals(total, gain)
}

main()
