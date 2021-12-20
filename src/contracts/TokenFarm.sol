pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

import "./UsiToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    
    string public name = "USI Token farm";
    DaiToken public daiToken; 
    UsiToken public usiToken;
    address public owner;

    struct itemsBought {
        uint256[] x;
    }

    struct givenAnswers {
        string[] x;
    }

    address[] public stakers; 
    mapping(address => uint256) public stakingBalance; 
    mapping(address => bool) public hasStaked; 
    mapping(address => bool) public isStaking; 
    mapping(address => uint256) public totalObtained;
    mapping(address => itemsBought) itemsBuyed;
    mapping(address => givenAnswers) surveyAnswers;

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

    
    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "amount cannot be 0");
        daiToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance cannot be 0");
        daiToken.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;

        isStaking[msg.sender] = false;
    }

    function unstakeNTokens(uint256 _amount) public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > _amount, "staking balance greater than amount");

        daiToken.transfer(msg.sender, _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] - _amount;
        if (stakingBalance[msg.sender] == 0) {
            isStaking[msg.sender] = false;
        }
    }

    function issueTokens() public {
        require(msg.sender == owner, "caller must be the owner");

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
        
        usiToken.transfer(msg.sender, 100000000000000000000);
    }
}
