# Loyalty DApp for USI <br />

This is the DAPP for a universitary Project at USI. <br />
Developed by Simone Rava and Aron Dalle Pezze. :computer: <br />

**Preliminary steps:**

1. **install MetaMask con Google Chrome** <br />
2. **run Ganache** <br />
3. **create two account on Metamask using Ganache private keys** <br />
4. **create a Ganache network on Metamask with http://127.0.0.1:7545 as URL and 1337 as Chain ID** <br />
   <br />

**How to run:**

1. **npm install** -> to install all the dependencies necessary <br />
2. **truffle compile --all** -> to compile all the contracts <br />
3. **truffle migrate --reset** -> to put the compiled smart contract on the blockchain <br />
4. **npm run start** -> to start the frontend on local port 3000 <br />
   <br />

**Useful commands:** <br />
**truffle exec scripts/rewards.js** -> give rewards to the users with tokens in staking <br />
**truffle compile --all** -> compile all the contracts <br />
**truffle migrate --reset** -> re-put the compiled smart contract on the blockchain <br />
**truffle console** -> interact with the smart contracts on the blockchain, open a console that is a javascript runtime environment that let you use the blockchain <br />
<br />
