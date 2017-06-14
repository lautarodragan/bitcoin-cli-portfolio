import * as fs from 'fs'
import * as os from 'os'
import * as readlineSync from 'readline-sync'
import 'colors'

export const ConfigurationDirectoryPath = os.homedir() + '/.bitcoins'
export const ConfigurationPath = ConfigurationDirectoryPath + '/configuration.json'

export const Configuration = new class {
  private _movementsPath: string
  private _lastRequestTime: Date
  private _xbtRateAmount: number
  private _xbtRateCurrency: string
  private _alternativeCurrency: string
  private _alternativeRate: number

  constructor() {
    this.load()

    if (!this.MovementsPath || !fs.existsSync(this.MovementsPath)) {
      let movementsPath

      while(!movementsPath || !fs.existsSync(movementsPath))
        movementsPath = readlineSync.question('Please indicate the path to your bitcoin movements file:')

      this.MovementsPath = movementsPath
    }
  }

  public get MovementsPath() {
    return this._movementsPath
  }

  public set MovementsPath(value: string) {
    this._movementsPath = value
    this.write()
  }

  public get LastRequestTime() {
    return this._lastRequestTime
  }

  public set LastRequestTime(value: Date) {
    this._lastRequestTime = value
    this.write()
  }

  public get XbtRateAmount() {
    return this._xbtRateAmount
  }

  public set XbtRateAmount(value: number) {
    this._xbtRateAmount = value
    this.write()
  }

  public get XbtRateCurrency() {
    return this._xbtRateCurrency
  }

  public set XbtRateCurrency(value: string) {
    this._xbtRateCurrency = value
    this.write()
  }

  public get AlternativeCurrency() {
    return this._alternativeCurrency
  }

  public set AlternativeCurrency(value: string) {
    this._alternativeCurrency = value
    this.write()
  }

  public get AlternativeRate() {
    return this._alternativeRate
  }

  public set AlternativeRate(value: number) {
    this._alternativeRate = value
    this.write()
  }

  private load() {
    const json = this.read()

    this._movementsPath = json.movementsPath
    this._xbtRateCurrency = json.xbtRateCurrency
    this._xbtRateAmount = json.xbtRateAmount
    this._alternativeRate = json.alternativeRate
    this._alternativeCurrency = json.alternativeCurrency
    this._lastRequestTime = json.lastRequestTime && new Date(json.lastRequestTime)
  }

  private read() {
    try {
      return JSON.parse(fs.readFileSync(ConfigurationPath, 'utf8'))
    } catch(error) {
      if (!fs.existsSync(ConfigurationPath))
        console.warn('Configuration file not found. Using new.'.red)
      else
        console.warn('Configuration file damaged. Warning: will overwrite.'.red)
      return {}
    }
  }

  private write() {
    if (!fs.existsSync(ConfigurationDirectoryPath))
      fs.mkdirSync(ConfigurationDirectoryPath)

    fs.writeFileSync(ConfigurationPath, JSON.stringify(this, null, '  '), 'utf8')
  }

  toJSON() {
    return {
      movementsPath: this._movementsPath,
      xbtRateCurrency: this._xbtRateCurrency,
      xbtRateAmount: this._xbtRateAmount,
      alternativeRate: this._alternativeRate,
      alternativeCurrency: this._alternativeCurrency,
      lastRequestTime: this._lastRequestTime,
    }
  }

}



