pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

//importare i token che ci servono qua
import "./UsiToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    //all code of the contract goes here

    //quando creiamo una variabile state come qua, che é nello smart contract, il suo valore sará salvato nella blockchain,
    //essendo pubblica potremo accedervi da fuori
    string public name = "USI Token farm";

    DaiToken public daiToken; //due variabili che assegnamo gli indirizzi tramite costruttore, servono per tutto lo smart contract
    UsiToken public usiToken;
    address public owner;

    struct itemsBought {
        uint256[] x;
    }

    struct givenAnswers {
        string[] x;
    }

    address[] public stakers; //keep track of all the address that have ever staked
    mapping(address => uint256) public stakingBalance; //quanto balance ha in staking ognuno
    mapping(address => bool) public hasStaked; //
    mapping(address => bool) public isStaking; //keep
    mapping(address => uint256) public totalObtained;
    mapping(address => itemsBought) itemsBuyed;
    mapping(address => givenAnswers) surveyAnswers;

    //mapping(address => items) itemsBuyed;

    //this function is going to be executed only once when it depoloy on the network
    //ci servono gli address dei due token usi e dai li diamo in parametro
    constructor(UsiToken _usiToken, DaiToken _daiToken) public {
        daiToken = _daiToken;
        usiToken = _usiToken;
        //dichiaro owner, colui che deploy lo smart contract, solo lui puo dare i rewards.
        owner = msg.sender;
    }

    function getItems(address _add) public view returns (uint256[] memory) {
        return itemsBuyed[_add].x;
    }

    function getAnswers(address _add) public view returns (string[] memory) {
        return surveyAnswers[_add].x;
    }

    // staking function, qua l investitore mette i dai nell app che gli daranno rewards in usitoken tipo un deposito di denaro
    function stakeTokens(uint256 _amount) public {
        //se falso require stoppa tutto e da exception, altrimenti va avanti
        require(_amount > 0, "amount cannot be 0");

        //transfert dai from the user to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //se nn ha mai fatto staking aggiungilo all array per nn avere errori di puntatore inesistente
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    //unstaking token, toglierlo dallo staking un prelevo di denaro tipo

    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance cannot be 0");

        //transfer token from the app to the user
        daiToken.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;

        isStaking[msg.sender] = false;
    }

    function unstakeNTokens(uint256 _amount) public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > _amount, "staking balance greater than amount");

        //transfer token from the app to the user
        daiToken.transfer(msg.sender, _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] - _amount;
        if (stakingBalance[msg.sender] == 0) {
            isStaking[msg.sender] = false;
        }
    }

    //issuing token guadagnere interesssi.
    function issueTokens() public {
        //nn deve poterla eseguire chiunque ma solo il proprietario del contratto quindi metto req
        //il proprietario deve chiamarla ogni tot, ogni gorno sett blocco o ecc
        require(msg.sender == owner, "caller must be the owner");

        //rewards in base a quanto depositano, se depositano mille gli diamo mille
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if (balance > 0) {
                usiToken.transfer(recipient, (balance / 2));
                totalObtained[recipient] =
                    totalObtained[recipient] +
                    (balance / 2);
            }
        }
    }

    function buyItem(uint256 _price) public {
        require(usiToken.balanceOf(msg.sender) > _price);
        usiToken.transferFrom(msg.sender, address(this), _price);
    }

    function buyNewItem(uint256 _id, uint256 _price) public {
        require(usiToken.balanceOf(msg.sender) > _price);
        usiToken.transferFrom(msg.sender, address(this), _price);
        itemsBuyed[msg.sender].x.push(_id);
    }

    function completeSurvey(
        string memory _ans1,
        string memory _ans2,
        string memory _ans3
    ) public {
        require(surveyAnswers[msg.sender].x.length == 0);
        surveyAnswers[msg.sender].x.push(_ans1);
        surveyAnswers[msg.sender].x.push(_ans2);
        surveyAnswers[msg.sender].x.push(_ans3);
        usiToken.transferFrom(address(this), msg.sender, 100);
    }
}
