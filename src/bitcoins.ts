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
  readonly left: number
}

export function augmentMovements(movements: ReadonlyArray<Movement>): ReadonlyArray<AugmentedMovement> {
  return movements.map(movement => ({
    ...movement,
    total: getMovementTotal(movements, movement),
    left: getMovementLeft(movements, movement),
    gain: getMovementGain(movements, movement)
  }))
}

export function movementsWithRemainder(movements: ReadonlyArray<Movement>): ReadonlyArray<AugmentedMovement> {
  return movements.map(movement => ({
    ...movement,
    total: null,
    left: getMovementLeft(movements, movement),
    gain: null
  }))
}

export function readMovements(): ReadonlyArray<Movement> {
  return JSON.parse(fs.readFileSync(Configuration.MovementsPath, 'utf8')).map((movement: any) => ({
    ...movement,
    date: new Date(movement.date)
  }));
}

const getMovementTotal = (movements: ReadonlyArray<Movement>, movement: Movement) =>
  getTotal(movements.slice(0, movements.indexOf(movement) + 1))

const getTotal = (movements: ReadonlyArray<Movement>) =>
  Math.round(movements.map(movement => movement.amount).sum() * 1E8) / 1E8

function getMovementLeft(movements: ReadonlyArray<Movement>, movement: Movement) {
  if (movement.amount <= 0)
    return 0

  const totalSold = movements
    .slice(movements.indexOf(movement))
    .map(_ => _.amount)
    .filter(amount => amount < 0)
    .sum()

  return Math.min(Math.max(0, Math.round((getMovementTotal(movements, movement) + totalSold) * 1E8) / 1E8), movement.amount)
}

function getMovementGain(movements: ReadonlyArray<Movement>, movement: Movement): number {

  if (movement.amount >= 0)
    return null

  const movementIndex = movements.indexOf(movement)

  if (movementIndex < 1)
    return null

  function indexOfStarterPurchase() {
    const purchase = movements
      .slice(0, movementIndex)
      .filter(_ => _.amount > 0)
      .reverse()
      .find(_ => _.amount === getMovementTotal(movements, _))

    const index = movements.indexOf(purchase)

    if (index < 0)
      throw new Error(`Could not find purchase earlier than (${JSON.stringify(movement)}) that immediately follows a zero-balance movement.`)

    return index
  }

  const totalZeroIndex = indexOfStarterPurchase()

  return movementsWithRemainder(movements.slice(totalZeroIndex, movementIndex))
    .filter(_ => _.amount > 0)
    .reduce(((previousValue, currentValue) => ({
      gain: previousValue.xbt
        ? previousValue.gain + Math.min(previousValue.xbt, currentValue.left) * (movement.price - currentValue.price)
        : previousValue.gain,
      xbt: Math.max(previousValue.xbt - currentValue.left, 0)
    })), {gain: 0, xbt: -movement.amount})
    .gain

}