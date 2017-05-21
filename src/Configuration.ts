import * as fs from 'fs'
import * as readlineSync from 'readline-sync'
import 'colors'

const ConfigurationPath = __dirname + '/configuration.json'

export const Configuration = new class Configuration {
  private _movementsPath: string

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
    fs.writeFileSync(ConfigurationPath, JSON.stringify(this), 'utf8')
  }

  private load() {
    const json = this.read()

    this._movementsPath = json.movementsPath
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

  toJSON() {
    return {
      movementsPath: this._movementsPath
    }
  }
}



