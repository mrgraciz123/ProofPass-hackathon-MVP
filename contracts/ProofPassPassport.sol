// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

/**
 * @title ProofPassPassport
 * @dev Manages professional identity and ProofScore.
 */
contract ProofPassPassport {
    struct Passport {
        string passportId; // e.g., PP-2026-001
        uint256 proofScore;
        bool isVerified;
        string metadataURI; // IPFS hash for profile data
    }

    mapping(address => Passport) public passports;
    uint256 public nextIdNum = 1;

    event PassportCreated(address indexed user, string passportId);
    event ProofScoreUpdated(address indexed user, uint256 newScore);

    /**
     * @dev Creates a new passport with a unique ID format: PP-2026-XXX
     */
    function createPassport(string memory _metadataURI) external {
        require(!passports[msg.sender].isVerified, "Passport exists");
        
        string memory passportId = string(abi.encodePacked("PP-2026-", _uint2str(nextIdNum)));
        nextIdNum++;

        passports[msg.sender] = Passport({
            passportId: passportId,
            proofScore: 50, // Base score
            isVerified: true,
            metadataURI: _metadataURI
        });
        
        emit PassportCreated(msg.sender, passportId);
    }

    /**
     * @dev Updates the user's ProofScore. For a hackathon MVP, anyone can call this, 
     * but in production it should be restricted to the Reputation Contract.
     */
    function updateScore(address _user, uint256 _score) external {
        require(passports[_user].isVerified, "Passport does not exist");
        passports[_user].proofScore = _score;
        emit ProofScoreUpdated(_user, _score);
    }

    /**
     * @dev Helper to convert uint to string
     */
    function _uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
