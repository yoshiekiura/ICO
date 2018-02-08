pragma solidity ^0.4.18;

import "kyc_oracle_interface.sol";

contract depositer is kycOracleInterface {
  address public destinationWallet;

  address public chaineum;
  address public legal;
  address public projectOwner;

  bool public chaineumVoted = false;
  bool public legalVoted = false;
  bool public projectOwnerVoted = false;

  event Voted(
    address indexed _voter,
    uint _voteTimestamp
  );

  event Withdrawed(
    address indexed trigerredBy,
    uint amountWithdrawn,
    uint withdrawTimestamp
  );

  function depositer(address _oracle, address _legal, address _projectOwner) {
    chaineum = msg.sender;
    oracleAddress = _oracle;
    legal = _legal;
    projectOwner = _projectOwner;
  }

  modifier senderMustBe(address _requiredSender) {
    require(msg.sender == _requiredSender);
    _;
  }

  function setDestinationWallet(address _destWallet) senderMustBe(chaineum) public {
    chaineumVoted = false;
    legalVoted = false;
    projectOwnerVoted = false;
    destinationWallet = _destWallet;
  }

  function() public onlyKycCleared payable {
    kycAddressDeposited(msg.sender, msg.value, block.timestamp);
  }

  function chaineumVote() senderMustBe(chaineum) public {
    Voted(msg.sender, block.timestamp);
    chaineumVoted = true;
  }

  function legalVote() senderMustBe(legal) public {
    Voted(msg.sender, block.timestamp);
    legalVoted = true;
  }

  function projectOwnerVote() senderMustBe(projectOwner) public {
    Voted(msg.sender, block.timestamp);
    projectOwnerVoted = true;
  }

  function withdraw() senderMustBe(projectOwner) public {
    uint8 votes = 0;
    if(chaineumVoted) votes++;
    if(legalVoted) votes++;
    if(projectOwnerVoted) votes++;
    require(votes >= 2);
    chaineumVoted = false;
    legalVoted = false;
    projectOwnerVoted = false;
    Withdrawed(msg.sender, this.balance, block.timestamp);
    destinationWallet.transfer(this.balance);
  }
}
