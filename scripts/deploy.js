const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("happy");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
	let txn = await domainContract.register("rainbows",  {value: hre.ethers.utils.parseEther('0.1')});
	await txn.wait();
  console.log("Minted domain rainbows.happy");

  txn = await domainContract.setRecord("rainbows", "Am I a banana or a happy??");
  await txn.wait();
  console.log("Set record for rainbows.happy");

  const address = await domainContract.getAddress("rainbows");
  console.log("Owner of domain rainbows:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
