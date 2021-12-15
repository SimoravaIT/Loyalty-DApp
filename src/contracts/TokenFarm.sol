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

    //this function is going to be executed only once when it depoloy on the network
    //ci servono gli address dei due token usi e dai li diamo in parametro
    constructor(UsiToken _usiToken, DaiToken _daiToken){
        daiToken = _daiToken;
        usiToken = _usiToken;
    }


}

