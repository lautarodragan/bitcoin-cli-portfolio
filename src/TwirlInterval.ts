import Timer = NodeJS.Timer

export class TwirlInterval {
  private interval: Timer

  start(message?: string) {
    const P = ["\\", "|", "/", "-"];
    let x = 0;
    this.interval = setInterval(function() {
      process.stdout.write(`\r${message || ''} ${P[x++]}`);
      x &= 3;
    }, 250);
  }

  stop() {
    clearInterval(this.interval)
    this.interval = null
    process.stdout.write('\r    \n')
  }
}
