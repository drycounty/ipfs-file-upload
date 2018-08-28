pragma solidity 0.4.24;

    contract Admin {

	mapping (address => bool) adminWhitelist;

	constructor () {
		adminWhitelist[msg.sender] = true;
	}

	modifier _isAdmin(address accountAddress) {
		require(adminWhitelist[accountAddress] == true);
		_;
	}

	function makeAdmin(address accountAddress) public _isAdmin(msg.sender) {
		adminWhitelist[accountAddress] = true;
	}

	function revokeAdmin(address accountAddress) public _isAdmin(msg.sender) {
		adminWhitelist[accountAddress] = false;
	}
}
