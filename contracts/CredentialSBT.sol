// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CredentialSBT
 * @dev Soulbound Token representing professional credentials.
 */
contract CredentialSBT {
    struct Credential {
        address issuer;
        string credentialType; // e.g., "Degree", "License"
        string metadataURI;
        uint256 issuedAt;
    }

    mapping(uint256 => Credential) public credentials;
    mapping(uint256 => address) public owners;
    
    // verifiedIssuers mapping as requested
    mapping(address => bool) public verifiedIssuers;
    
    address public admin;
    uint256 public nextTokenId;

    event CredentialIssued(address indexed to, uint256 indexed tokenId, string credentialType);
    event IssuerAdded(address indexed issuer);
    event IssuerRemoved(address indexed issuer);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyIssuer() {
        require(verifiedIssuers[msg.sender], "Not a verified issuer");
        _;
    }

    constructor() {
        admin = msg.sender;
        verifiedIssuers[msg.sender] = true; // For testing purposes, admin is an issuer
    }

    function addIssuer(address _issuer) external onlyAdmin {
        verifiedIssuers[_issuer] = true;
        emit IssuerAdded(_issuer);
    }

    function removeIssuer(address _issuer) external onlyAdmin {
        verifiedIssuers[_issuer] = false;
        emit IssuerRemoved(_issuer);
    }

    /**
     * @dev Issues a credential to a professional. Only verified issuers can call this.
     */
    function issueCredential(address _to, string memory _type, string memory _uri) external onlyIssuer {
        uint256 tokenId = nextTokenId++;
        credentials[tokenId] = Credential({
            issuer: msg.sender,
            credentialType: _type,
            metadataURI: _uri,
            issuedAt: block.timestamp
        });
        owners[tokenId] = _to;
        
        emit CredentialIssued(_to, tokenId, _type);
    }

    // Since it is a Soulbound Token, there are no transfer functions.
}
