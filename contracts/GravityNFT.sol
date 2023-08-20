// SPDX-License-Identifier: MIT OR Apache-2.0


pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GravityNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    address contractAddress;
    uint256 public cost = 0.0075 ether;
    mapping(uint256 => uint256) public issueTime;
    mapping(uint256 => uint256) public warrantyPeriod;

    constructor(address marketContract) ERC721("Gravity", "Gvt") {
        contractAddress = marketContract;
    }

    function bridgeMint(address to, uint256 tokenId, string memory tokenURI, uint256 ts, uint256 wPeriod) public {
        issueTime[tokenId] = ts;
        warrantyPeriod[tokenId] = wPeriod;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function createNFT(string memory tokenURI, uint256 tokenId, uint256 wPeriod) public returns (uint) {
        _mint(msg.sender, tokenId);
        issueTime[tokenId] = block.timestamp;
        warrantyPeriod[tokenId] = wPeriod;
        _setTokenURI(tokenId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return tokenId;
    }

    function mintNFT(string memory tokenURI, uint256 tokenId, uint256 wPeriod) public payable returns (uint) {
        require(msg.value == cost, "Need to send 0.075 ether!");
        _mint(msg.sender, tokenId);
         issueTime[tokenId] = block.timestamp;
        warrantyPeriod[tokenId] = wPeriod;
        _setTokenURI(tokenId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return tokenId;
    }

    function getIssueTime(uint256 tokenId) public view returns (uint256) {
        return issueTime[tokenId];
    }

    function getWarrantyPeriod(uint256 tokenId) public view returns (uint256) {
        return warrantyPeriod[tokenId];
    }

    function withdraw() public payable onlyOwner() {
        require(payable(msg.sender).send(address(this).balance));
    }
}