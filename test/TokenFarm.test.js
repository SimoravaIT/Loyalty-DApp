const DaiToken = artifacts.require('DaiToken')
const UsiToken = artifacts.require('UsiToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
    .use(require('chai-as-promised'))
    .should()


    function tokens(n){
        return web3.utils.toWei(n, 'Ether')
    }

contract('TokenFarm', ([owner, investor]) => {
    let daiToken, usiToken, tokenFarm

    before(async ()=>{
     daiToken = await DaiToken.new()
     usiToken = await UsiToken.new()
     tokenFarm = await TokenFarm.new(usiToken.address, daiToken.address)

     //transfer all dapp token to farm (1 million)
     await usiToken.transfer(tokenFarm.address, tokens('1000000'))

     //send token to investor
     await daiToken.transfer(investor,tokens('100'), {from: owner})
    })


    //test here
    describe('Mock DAI deployment', async () =>{
        it('has a name',async() => {
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('Usi Token deployment', async () =>{
        it('has a name',async() => {
            const name = await usiToken.name()
            assert.equal(name, 'USI Token')
        })
    })

    describe('Token Farm deployment', async () =>{
        it('has a name',async() => {
            const name = await tokenFarm.name()
            assert.equal(name, 'USI Token farm')
        })

        it('contract has tokens', async()=>{
            let balance = await usiToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(),tokens('1000000'))
        })
    })
    

  

           
 describe('Farming tokens', async() =>{
    it ('rewards investors for staking mDai tokens', async()=>{
        let result

        result = await daiToken.balanceOf(investor)
        assert.equal(result.toString(), tokens('100'), 'investor mock DAI wallet balance correct before staking ')

        //faccio come se l utente verifica la transazione(transferFrom lo richiede)
        await daiToken.approve(tokenFarm.address, tokens('100'), {from: investor})
        await tokenFarm.stakeTokens(tokens('100'), {from: investor })

        //controllo se son stati scalati i dai token
        result = await daiToken.balanceOf(investor)
        assert.equal(result.toString(), tokens('0'), "investor dai wallet balance correct after staking")
        result = await daiToken.balanceOf(tokenFarm.address)
        assert.equal(result.toString(), tokens('100'), 'token farm dai balance correct after staking')

        })
    })
}) 