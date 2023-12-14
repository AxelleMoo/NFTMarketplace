require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    polygon_mumbai:{
      url: "https://polygon-mumbai.g.alchemy.com/v2/KB5pJgDh-fIkoacHc2DFhIG3d0GHvVh8",
      accounts: [
        `0x${"68086bff66955a0117a28e05b83248c2e72c4ed62dca3fa319ba5cd1a8f03025"}`,
      ]
    }
  }
};
