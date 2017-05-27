import fetch from 'node-fetch'

import { Configuration } from './Configuration'

export function updateSatoshiTango() {
  if (!Configuration.LastRequestTime || new Date().getTime() - Configuration.LastRequestTime.getTime() >= 1E4) {
    return getRate().then(rate => {
      Configuration.XbtRateAmount = rate
      Configuration.LastRequestTime = new Date()
    })
  }
  return Promise.resolve()
}

function getRate() {
  return fetch('https://api.satoshitango.com/v2/ticker')
    .then(_ => _.json())
    .then(_ => _.data.venta.arsbtc)
}