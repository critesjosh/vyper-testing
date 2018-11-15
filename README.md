# Writing Ethereum Smart Contracts in Vyper

In this exercise we are going to work on writing a simple bank
contract similar to the one in this
[repository](https://github.com/ConsenSys-Academy/simple-bank-exercise),
except we are going to do it with Vyper!

## Install Vyper
Let's consult [the Vyper
documentation](https://vyper.readthedocs.io/en/latest/). First, you
need to install the Vyper compiler, which will generate the ABI and
bytecode from the [SimpleBank.vy](./contracts/SimpleBank.vy) file.

Alternatively you can use [vyper.online](https://vyper.online) IDE to develop the contract. Vyper.online is similar to Remix in that it offers a text editing environment along with contract compilation to get the bytecode and ABI. It will also provide an LLL version of your Vyper contract. 

## Run the compiler
Once the Vyper compiler is installed, you can test it by running

```sh
vyper -f "abi" ./contracts/SimpleBank.vy > abi.json
vyper -f "bytecode" ./contracts/SimpleBank.vy > bytecode
```

The first command will get the abi from the Vyper contract and save it in a file called abi.json.
The second command will save the bytecode in 'bytecode'. The outputs are imported into the /test/test.js
file before the test are run.

If you haven't installed the Vyper compiler on your machine, you can copy the ABI and bytecode outputs from vyper.online into the appropriate files in this directory ([abi.json](./abi.json) and [bytecode](./bytecode)).

## Run the tests

The project uses mocha to run tests. Run the tests with `npm run test`.

Notice that the tests are a bit different in this directory than the Solidity SimpleBank exercise. In this exercise, we are using web3 version 1.0 beta. The main differences are how to deploy contracts and how to watch events. Watching events requires that we are connected to ganache-cli via a websocket rather than http. 

```js
var web3 = new Web3('ws://localhost:8545')
```

Also the structure of the logs is a bit different. [You can read more about the differences between handling events here](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#contract-events).

