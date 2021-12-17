# Loyalty DApp for USI <br />

This is the DAPP for a universitary Project at USI. <br />
Developed by Simone Rava and Aron Dalle Pezze. :computer: <br />

**How to run:**

1. **npm install** -> to install all the dependencies necessary <br />
2. **truffle compile** -> to compile all the contracts <br />
3. **truffle migrate** -> to put the compiled smart contract on the blockchain <br />
   <br />

**Useful commands:**
<br />
**truffle compile --all** -> compile all the contracts
<br />
**truffle migrate --reset** -> re-put the compiled smart contract on the blockchain
<br />
**truffle console** -> interact with the smart contracts on the blockchain, open a console that is a javascript runtime environment that let you use the blockchain
<br />

<br />
**Useful files:**
<br />
**package.json** -> keep all the dependencies needed for the dapp
<br />
**truffle-config.js** -> how we connect our truffle to the blockchain, connect to ganache that runs in the local host 127.0.0.1 and port 7545(LOCAL)
<br />
**USIToken.sol** -> represent the token that we rewards to the user that farm them staking DAI token
<br />
**TokenFarm.sol** -> smart contract for the farming action
