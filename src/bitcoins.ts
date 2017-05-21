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
}

export const getTotal = (movements: ReadonlyArray<Movement>) =>
  Math.round(
    movements.reduce((previousValue: number, currentValue: Movement) =>
      previousValue + currentValue.amount, 0) * 1E8) / 1E8

export const augmentMovements = (movements: ReadonlyArray<Movement>): ReadonlyArray<AugmentedMovement> => movements.map(movement => ({
  ...movement,
  total: getTotalUpToMovement(movements, movement)
}))

export function printMovements(movements: ReadonlyArray<AugmentedMovement>) {
  const lines = movements
    .map(movement => [
      movement.date.toLocaleDateString(),
      movement.amount > 0 ? 'Buy' : 'Sell',
      Math.abs(movement.amount).toString(),
      movement.price.toString(),
      movement.total.toString()])
    .prepend(['Date', 'Operation', 'Amount', 'Price', 'Total'])
    .map(movement => movement.map(value => value.padEnd(12, ' ')))
    .map(movement => movement.join(' | '))

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

const getTotalUpToMovement = (movements: ReadonlyArray<Movement>, movement: Movement) =>
  getTotal(movements.slice(0, movements.indexOf(movement) + 1))