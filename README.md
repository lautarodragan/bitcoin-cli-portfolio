# bitcoins

## How much have I made with bitcoins?
Bitcoins is a super-simple command-line app that shows you 
- how much money you have made each time you sold some bitcoins, 
- how many bitcoins you have left in XBT
- how many bitcoins you have left in a currency of your choice, retrieving the price of XBT for that currency from a configurable exchange 
- how many bitcoins you have left in an alternative currency, calculated from the primary non-crypto currency (rather than converting directly from the amount of XBT)

**Notice**: bitcoins does not enable you to trade, nor does it do it automatically for you.
You still need to do your bitcoin trades in an exchange such as [Kraken](https://www.kraken.com/), [Coinbase](https://www.coinbase.com), [SatoshiTango](https://satoshitango.com/home), etc. See [bitcoin.org/exchanges](https://bitcoin.org/en/exchanges) for a suggested list of exchanges. 

### How to Install

- [Download and install the latest version of Node](https://nodejs.org/en/)
- Run `npm i -g bitcoins`

### How to Use

Simply run `bitcoins` in the terminal.

Bitcoins will display a table with all your bitcoin purchases and sales followed by some overall data.

The first time you run it it will ask you to locate the file where you store your bitcoin transactions.

To add purchases and sales of bitcoins to the bitcoins portfolio you'll need to manually add them to the bitcoins portfolio file.
In the future you'll be able to do that running `bitcoins buy` and `bitcoins sell`.


### Bitcoin Portfolio File
The Bitcoin Portfolio File is just a .json file living somewhere in your computer. The first time you run bitcoins it'll ask you to locate this file. 

The file looks like this:

```
[
  {
    "date": "2017-04-05T00:00:00.000Z",
    "amount": 2,
    "price": 1000
  },
  {
    "date": "2017-05-09T00:00:00.000Z",
    "amount": -2,
    "price": 1500
  }
 ]
```

In this happy example you bought 2 bitcoin the 4th of April at 1000 USD each and sold them the next day at 1500 USD each. Bitcoins will tell you you made a profit of 1000 USD with this sale. Very nice!

Notice the negative amount in the second entry: `"amount": -2`. A positive amount is interpreted by bitcoins as a purchase, a negative one means a sale.

Tip: place this file in a dropbox folder and you'll be able to run bitcoins from any computer.



### How to Upgrade

`npm i -g bitcoins@version`, for example `npm i -g bitcoins@7.0.0`

Will have a more decent way to upgrade in the future, possibly with something like [selfupdate](https://www.npmjs.com/package/selfupdate).

### Commands

- `bitcoins which`
Displays the locations of files used by bitcoins.
- `bitcoins which configuration`
Displays the location of the configuration file.
- `bitcoins which bitcoins`
Displays the location of the portfolio file. This is where your bitcoin purchases and sales are stored.
- `bitcoins version`
Displays what version of bitcoins you have installed.


