const TokenFarm = artifacts.require('TokenFarm');

//questo script serve per far si che ogni volta che si chiama questa funzione si danno i rewardsçç
module.exports = async function(callback) {
	let tokenFarm = await TokenFarm.deployed();
	await tokenFarm.issueTokens();
	console.log('rewards launched');
	callback();
};
