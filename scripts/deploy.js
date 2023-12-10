
const hre = require("hardhat");
//const ethers = require("ethers");

async function main() {

  const nftmarketplace = await hre.ethers.deployContract("NFTMarketplace");

  await nftmarketplace.waitForDeployment();

  // const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  // const nftMarketplace = await NFTMarketplace.deploy();

  // await nftMarketplace.deployed();

  console.log(
    `Deployed to contract address ${nftmarketplace.target}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
