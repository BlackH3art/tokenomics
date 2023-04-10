const hre = require("hardhat");


async function main() {

  const SnoutsToken = await hre.ethers.getContractFactory("CrookedSnoutsTokenV4");
  const snoutsToken = await SnoutsToken.deploy();

  await snoutsToken.deployed();

  console.log(
    `
    ==============================================\n
    
    Snouts token deployed to: ${snoutsToken.address}\n

    Verify with:\n
      npx hardhat verify ${snoutsToken.address} --network goerli\n

    ================================================
    `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
