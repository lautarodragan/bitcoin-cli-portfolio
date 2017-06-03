#!/usr/bin/env node --harmony

import 'colors'
import * as commandLineCommands from 'command-line-commands'

import './Array'
import { augmentMovements, readMovements } from './bitcoins'
import { updateSatoshiTango } from './Rate'
import { printMovements, printTitle, printTotals } from './Printer'
import { TwirlInterval } from './TwirlInterval'
import { Configuration } from './Configuration'
const packageJson = require('../package.json')

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

function which(file: string) {
  switch (file) {
    case 'configuration':
      console.log(__dirname + '/configuration.json')
      break
    case 'bitcoins':
      console.log(Configuration.MovementsPath)
      break
    default:
      console.log('Configuration'.bold)
      console.log(__dirname + '/configuration.json')
      console.log('bitcoins.json file'.bold)
      console.log(Configuration.MovementsPath)
  }
}

function version() {
  console.log('bitcoins version ' + packageJson.version)
}

const { command, argv } = commandLineCommands([null, '--version', 'which'])

switch (command) {
  case 'which':
    which(argv[0])
    break
  case 'version':
    version()
    break
  case null:
    console.log('main', argv)
    main()
}
