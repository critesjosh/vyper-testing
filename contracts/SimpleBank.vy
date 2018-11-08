Enrolled: event({ accountAddress: indexed(address)  })
DepositMade: event ({ accountAddress: address, amount: wei_value  })
Withdrawal: event({ accountAddress: address, withdrawAmount: wei_value, newBalance: wei_value })

balances: wei_value[address]
enrolled: public(bool[address])
owner: public(address)

#
# Functions
#

# @notice set the contract creator as the owner

@public
def __init__():
    self.owner = msg.sender

# @notice Get balance
# @return The balance of the user
# @dev Use the keyword that indicates the state is not changed

@public
@constant
def balance() -> wei_value:
    return self.balances[msg.sender]

# @notice Enroll a customer with the bank
# @return The users enrolled status
# @dev Emit the appropriate event

@public
def enroll() -> bool:
    self.enrolled[msg.sender] = True
    log.Enrolled(msg.sender)
    return True

# @notice Deposit ether into bank
# @return The balance of the user after the deposit is made
# Add the appropriate keyword so that this function can receive ether
# @dev Use the appropriate global variables to get the transaction sender and value
# Emit the appropriate event    

@public
@payable
def deposit() -> wei_value:
    self.balances[msg.sender] += msg.value
    log.DepositMade(msg.sender, self.balances[msg.sender])
    return self.balances[msg.sender]

# @notice Withdraw ether from bank
# @dev This does not return any excess ether sent to it
# @param withdrawAmount amount you want to withdraw
# @return The balance remaining for the user
# @dev Emit the appropriate event    

@public
def withdraw(withdrawAmount: wei_value) -> wei_value:
    assert(withdrawAmount <= self.balances[msg.sender])
    self.balances[msg.sender] -= withdrawAmount
    send(msg.sender, withdrawAmount)
    log.Withdrawal(msg.sender, withdrawAmount, self.balances[msg.sender])
    return self.balances[msg.sender]

# With no fallback function specified, a fallback is automatically generated that will revert any transaction that it processes. This is not the case in Solidity.