// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthRecords {
    struct Record {
        string dataHash; 
        uint256 timestamp;
        address addedBy;
    }

    mapping(address => Record[]) private patientRecords;
    address public owner;

    event RecordAdded(address indexed patient, string dataHash, uint256 timestamp);

    constructor() {
        owner = msg.sender;
    }

    function addRecord(address _patient, string memory _dataHash) public {
        Record memory newRecord = Record({
            dataHash: _dataHash,
            timestamp: block.timestamp,
            addedBy: msg.sender
        });

        patientRecords[_patient].push(newRecord);
        emit RecordAdded(_patient, _dataHash, block.timestamp);
    }

    function getRecords(address _patient) public view returns (Record[] memory) {
        return patientRecords[_patient];
    }
}
