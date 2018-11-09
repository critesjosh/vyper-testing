# Writing Ethereum Smart Contracts in Vyper

In this exercise we are going to work on writing a simple bank
contract similar to the one in this
[repository](https://github.com/ConsenSys-Academy/simple-bank-exercise),
except we are going to do it with Vyper!

## Install Vyper
Let's consult [the Vyper
documnetation](https://vyper.readthedocs.io/en/latest/). First, you
need to install the Vyper compiler, which will generate the ABI and
bytecode from the [SimpleBank.vy](./contracts/SimpleBank.vy) file.

## Run the compiler
Once the Vyper compiler is installed, you can test it by running

```sh
vyper -f "abi" contracts/SimpleBank.vy > abi.json
vyper -f "bytecode" contracts/SimleBank.vy > bytecode.txt
```

The first command will get the abi from the Vyper contract and save it in a file called abi.json.
The second command will save the bytecode in 'bytecode'. The outputs are imported into the /test/test.js
file before the test are run.

## Run the tests
