const DaiToken = artifacts.require('DaiToken')
const UsiToken = artifacts.require('UsiToken')
const TokenFarm = artifacts.require('TokenFarm')

//await perche aspetti che lo fa
//questo mette tutti i contratti nella network.
module.exports = async function(deployer, network, accounts) {

  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  await deployer.deploy(UsiToken)
  const usiToken = await UsiToken.deployed()

 //parametri perche usi il costruttore
  await deployer.deploy(TokenFarm, usiToken.address, daiToken.address)
  const tokenFarm = await TokenFarm.deployed() 


//qua abbiamo gia depositato tutti gli smart contract, pero voglio mettere anche TUTTI gli usitoken dentro la farm per darli poi a chi farma
await usiToken.transfer(tokenFarm.address,'10000000000000000000000')
await usiToken.transfer(accounts[1],'100000000000000000000')
//await usiToken.transfer(tokenFarm.address,'1000000000000000000000000')

//nessuno ha dai a parte l account che ha deploy it(guarda costruttore che ha balanceOf[msg.sender] = totalSupply;
//quindi trasferiamo un po di dai a un plausibile investitore(account 1)
await daiToken.transfer(accounts[1], '15400000000000000000000')
await daiToken.transfer(accounts[2], '334000000000000000000')
await daiToken.transfer(accounts[3], '4000000000000000000')
await daiToken.transfer(accounts[4], '5000000000000000000')
await daiToken.transfer(accounts[5], '6000000000000000000')
await daiToken.transfer(accounts[6], '7000000000000000000')
await daiToken.transfer(accounts[7], '8000000000000000000')
await daiToken.transfer(accounts[8], '9000000000000000000')
await daiToken.transfer(accounts[9], '100000000000000000000')





}
