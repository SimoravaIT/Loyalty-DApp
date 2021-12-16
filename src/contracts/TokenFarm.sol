pragma solidity >=0.5.0;


//importare i token che ci servono qua 
import "./UsiToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
    //all code of the contract goes here

    //quando creiamo una variabile state come qua, che é nello smart contract, il suo valore sará salvato nella blockchain,
    //essendo pubblica potremo accedervi da fuori
    string public name ="USI Token farm";
    
    DaiToken public daiToken; //due variabili che assegnamo gli indirizzi tramite costruttore, servono per tutto lo smart contract
    UsiToken public usiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    //this function is going to be executed only once when it depoloy on the network
    //ci servono gli address dei due token usi e dai li diamo in parametro
    constructor(UsiToken _usiToken, DaiToken _daiToken) public {
        daiToken = _daiToken;
        usiToken = _usiToken;
    }




    // staking function, qua l investitore mette i dai nell app che gli daranno rewards in usitoken tipo un deposito di denaro
    function stakeTokens(uint _amount) public{
        //transfert dai from the user to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }


    //unstaking token, toglierlo dallo staking un prelevo di denaro tipo


    //issuing token guadagnere interesssi.

}

