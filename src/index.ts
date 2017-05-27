#!/usr/bin/env node --harmony

import 'colors'

import './Array'
import { augmentMovements, readMovements } from './bitcoins'
import { updateSatoshiTango } from './Rate'
import { printMovements, printTitle, printTotals } from './Printer'
import { TwirlInterval } from './TwirlInterval'

const twirl = new TwirlInterval()

async function main() {
  const satoshiTangoPromise = updateSatoshiTango()
  const movements = augmentMovements(readMovements())

  printTitle()
  printMovements(movements)

  twirl.start()
  await satoshiTangoPromise
  twirl.stop()

  const total = movements[movements.length - 1].total
  const gain = movements.map(movement => movement.gain).sum()
  printTotals(total, gain)
}

main()
