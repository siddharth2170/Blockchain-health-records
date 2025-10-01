const HealthRecords = artifacts.require("HealthRecords");

contract("HealthRecords", (accounts) => {
  it("should add and fetch records", async () => {
    const instance = await HealthRecords.deployed();
    await instance.addRecord(accounts[0], "QmTestHash", { from: accounts[0] });
    const records = await instance.getRecords(accounts[0]);
    assert.equal(records[0].dataHash, "QmTestHash");
  });
});
