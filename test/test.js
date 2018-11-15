var assert = require('assert')
var Web3 = require('web3')

var fs = require('fs')
var abi = JSON.parse(fs.readFileSync('./abi.json', 'utf8'))
var bytecode = fs.readFileSync('./bytecode', 'utf8').trim()

var web3 = new Web3('ws://localhost:8545')

  describe("SimpleBank", async function () {

    var accounts, SimpleBank, owner, alice, bob, deposit

    before(async () => {
      accounts = await web3.eth.getAccounts()
      
      SimpleBank = new web3.eth.Contract(abi, {from: accounts[0]})
      SimpleBank = await SimpleBank.deploy({data: bytecode}).send({gas: 1500000, from: accounts[0]})

      owner = accounts[0]
      alice = accounts[1]
      bob = accounts[2]
      deposit = 2 
    })
  
    it("should set constructor value", async () => {
      let result = await SimpleBank.methods.owner().call({from: owner})
      
      assert.strictEqual(result, accounts[0]);
    });
  
     it("mark addresses as enrolled", async () => {

      await SimpleBank.methods.enroll().send({from: accounts[1]})

      const aliceEnrolled = await SimpleBank.methods.enrolled(accounts[1]).call({from: accounts[1]})
      assert.equal(aliceEnrolled, true, 'enroll balance is incorrect, check balance method or constructor')
  
      const ownerEnrolled = await SimpleBank.methods.enrolled(accounts[0]).call({from: accounts[0]})
      assert.equal(ownerEnrolled, false, 'only enrolled users should be marked enrolled')
    });
   
  
     it("should deposit correct amount", async () => {
      var log
      SimpleBank.events.DepositMade()
      .on('data', _log => {log = _log})

      await SimpleBank.methods.enroll().send({from: alice})
      await SimpleBank.methods.enroll().send({from: bob})
  
      await SimpleBank.methods.deposit().send({from: alice, value: deposit})
      const balance = await SimpleBank.methods.balances().call({from: alice})
      assert.equal(deposit.toString(), balance, 'deposit amount incorrect, check deposit method')
  
      const expectedEventResult = {accountAddress: alice, amount: deposit}

      const logAccountAddress = log.returnValues.accountAddress
      const logDepositAmount = log.returnValues.amount
  
      assert.equal(expectedEventResult.accountAddress, logAccountAddress, "LogDepositMade event accountAddress property not emitted, check deposit method")
      assert.equal(expectedEventResult.amount, logDepositAmount, "LogDepositMade event amount property not emitted, check deposit method")
    })
  
    it("should withdraw correct amount", async () => {
      const initialAmount = 0

      var log
      SimpleBank.events.Withdrawal()
      .on('data', _log => {log = _log})      

      await SimpleBank.methods.withdraw(deposit).send({from: alice})
      const balance = await SimpleBank.methods.balances().call({from: alice})
  
      assert.equal(balance.toString(), initialAmount.toString(), 'balance incorrect after withdrawal, check withdraw method')

      const accountAddress = log.returnValues.accountAddress
      const newBalance = log.returnValues.newBalance
      const withdrawAmount = log.returnValues.withdrawAmount
  
      const expectedEventResult = {accountAddress: alice, newBalance: initialAmount, withdrawAmount: deposit}
  
      assert.equal(expectedEventResult.accountAddress, accountAddress, "LogWithdrawal event accountAddress property not emitted, check deposit method")
      assert.equal(expectedEventResult.newBalance, newBalance, "LogWithdrawal event newBalance property not emitted, check deposit method")
      assert.equal(expectedEventResult.withdrawAmount, withdrawAmount, "LogWithdrawal event withdrawalAmount property not emitted, check deposit method")
    })
  
  })

