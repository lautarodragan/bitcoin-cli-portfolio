interface Array<T> {
  prepend(value: any): Array<T>
  sum(): number
}

Array.prototype.prepend = function(value: any) {
  return [value, ...this]
}

Array.prototype.sum = function() {
  return this.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)
}
