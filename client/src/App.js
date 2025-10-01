import React, { useEffect, useState } from "react";
import getWeb3 from "./utils/getWeb3";
import HealthRecordsContract from "./contracts/HealthRecords.json";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [record, setRecord] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accs = await web3.eth.getAccounts();
      setAccounts(accs);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HealthRecordsContract.networks[networkId];
      const instance = new web3.eth.Contract(
        HealthRecordsContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(instance);
    };
    init();
  }, []);

  const addRecord = async () => {
    await contract.methods.addRecord(accounts[0], record).send({ from: accounts[0] });
    setRecord("");
    loadRecords();
  };

  const loadRecords = async () => {
    const res = await contract.methods.getRecords(accounts[0]).call();
    setRecords(res);
  };

  return (
    <div>
      <h2>Blockchain Health Records</h2>
      <input
        value={record}
        onChange={(e) => setRecord(e.target.value)}
        placeholder="Enter IPFS hash"
      />
      <button onClick={addRecord}>Add Record</button>
      <button onClick={loadRecords}>Load Records</button>

      <ul>
        {records.map((r, i) => (
          <li key={i}>
            Hash: {r.dataHash}, Time: {new Date(r.timestamp * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
