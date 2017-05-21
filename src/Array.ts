interface Array<T> {
  prepend(value: any): Array<T>
}

Array.prototype.prepend = function(value: any) {
  return [value, ...this]
}
