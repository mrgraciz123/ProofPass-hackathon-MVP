// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RecruiterEscrow
 * @dev Recruiter stakes funds. Released to professional upon response.
 */
contract RecruiterEscrow {
    struct Escrow {
        address recruiter;
        address professional;
        uint256 amount;
        bool isResolved;
    }

    mapping(uint256 => Escrow) public escrows;
    uint256 public nextEscrowId;

    event EscrowCreated(uint256 indexed escrowId, address recruiter, address professional, uint256 amount);
    event EscrowReleased(uint256 indexed escrowId, address professional);

    /**
     * @dev Recruiter creates an escrow by sending native ETH (or mocked USDC for hackathon).
     */
    function createEscrow(address _professional) external payable {
        require(msg.value > 0, "Stake required");
        uint256 escrowId = nextEscrowId++;
        
        escrows[escrowId] = Escrow({
            recruiter: msg.sender,
            professional: _professional,
            amount: msg.value,
            isResolved: false
        });

        emit EscrowCreated(escrowId, msg.sender, _professional, msg.value);
    }

    /**
     * @dev Professional claims the escrow.
     */
    function releaseEscrow(uint256 _escrowId) external {
        Escrow storage esc = escrows[_escrowId];
        require(!esc.isResolved, "Already resolved");
        // For hackathon: Professional claims it directly
        require(msg.sender == esc.professional, "Only professional can claim");

        esc.isResolved = true;
        (bool success, ) = esc.professional.call{value: esc.amount}("");
        require(success, "Transfer failed");

        emit EscrowReleased(_escrowId, esc.professional);
    }
}
