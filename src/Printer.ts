import { AugmentedMovement } from './bitcoins'
import { Configuration } from './Configuration'

export function printTitle() {
  console.log()
  console.log()
  console.log('Bitcoin Movement Tracker'.yellow.bold)
  console.log()
}

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

  console.log()
}

export function printTotals(total: number, gain: number) {
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
}