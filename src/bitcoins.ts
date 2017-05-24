import './Array'

import * as fs from 'fs'
import { Configuration } from './Configuration'

export interface Movement {
  readonly date: Date
  readonly amount: number
  readonly price: number
}

export interface AugmentedMovement extends Movement {
  readonly total: number
  readonly gain: number
}

export const getTotal = (movements: ReadonlyArray<Movement>) =>
  Math.round(movements.map(movement => movement.amount).sum() * 1E8) / 1E8

export const augmentMovements = (movements: ReadonlyArray<Movement>): ReadonlyArray<AugmentedMovement> => movements.map(movement => ({
  ...movement,
  total: getMovementTotal(movements, movement),
  gain: getMovementGain(movements, movement)
}))

export function printMovements(movements: ReadonlyArray<AugmentedMovement>) {
  const lines = movements
    .map(movement => [
      movement.date.toLocaleDateString(),
      movement.amount > 0 ? 'Buy' : 'Sell',
      Math.abs(movement.amount).toString(),
      movement.price.toString(),
      movement.total.toString(),
      movement.gain ? Math.round(movement.gain).toString() : ''])
    .prepend(['Date', 'Operation', 'Amount', 'Price', 'Total', 'Gain'])
    .map(movement => movement.map(value => value.padEnd(12, ' ')))
    .map(movement => movement[1].startsWith('Buy') ? movement.join(' | ').magenta : movement.join(' | '))

  for (let i = 0; i < lines.length; i++) {
    console.log(i ? lines[i] : lines[i].bold)
  }
}

export function readMovements(): ReadonlyArray<Movement> {
  return JSON.parse(fs.readFileSync(Configuration.MovementsPath, 'utf8')).map((movement: any) => ({
    ...movement,
    date: new Date(movement.date)
  }));
}

const getMovementTotal = (movements: ReadonlyArray<Movement>, movement: Movement) =>
  getTotal(movements.slice(0, movements.indexOf(movement) + 1))

function getMovementGain(movements: ReadonlyArray<Movement>, movement: Movement): number {

  if (movement.amount >= 0)
    return null

  const movementIndex = movements.indexOf(movement)

  if (movementIndex < 1)
    return null

  function findTotalZeroIndex() {
    // Find earliest entry off of which bitcoins could be taken
    for (let i = movementIndex - 1; i >= 0; i--) {
      if (movements[i].amount > 0 && getMovementTotal(movements, movements[i]) === movements[i].amount) {
        return i
      }
    }
    throw new Error(`Could not find buying movement earlier than (${JSON.stringify(movement)}) that follows a zero-balance movement.`)
  }

  let gain = 0, xbt = movement.amount

  const totalZeroIndex = findTotalZeroIndex()


  for (let i = totalZeroIndex; i < movementIndex; i++) {
    if (movements[i].amount < 0)
      continue // actually, expendableXBT -= movements[i].amount
    const xbtToUse = Math.min(xbt, getMovementTotal(movements, movements[i]))
    gain += xbtToUse * -(movement.price - movements[i].price)
    xbt -= xbtToUse
  }

  return gain

}

export const twirlTimer = function(message?: string) {
  const P = ["\\", "|", "/", "-"];
  let x = 0;
  return setInterval(function() {
    process.stdout.write(`\r${message || ''} ${P[x++]}`);
    x &= 3;
  }, 250);
};