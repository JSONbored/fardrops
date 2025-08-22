// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FarDropsRegistry {
    event UserRegistered(address indexed user, uint256 timestamp);
    event AirdropClaimed(address indexed user, string airdropId);
    
    mapping(address => bool) public registered;
    mapping(address => uint256) public claimCount;
    
    uint256 public totalUsers;
    uint256 public totalClaims;
    
    function register() external {
        require(!registered[msg.sender], "Already registered");
        registered[msg.sender] = true;
        totalUsers++;
        emit UserRegistered(msg.sender, block.timestamp);
    }
    
    function recordClaim(string memory airdropId) external {
        require(registered[msg.sender], "Not registered");
        claimCount[msg.sender]++;
        totalClaims++;
        emit AirdropClaimed(msg.sender, airdropId);
    }
    
    function getStats() external view returns (uint256 users, uint256 claims) {
        return (totalUsers, totalClaims);
    }
}