const hre = require("hardhat");


async function main() {

  const Blank = await hre.ethers.getContractFactory("Blank");
  const blank1 = await Blank.deploy();
  const blank2 = await Blank.deploy();
  const blank3 = await Blank.deploy();
  const blank4 = await Blank.deploy();
  const blank5 = await Blank.deploy();
  const blank6 = await Blank.deploy();
  const blank7 = await Blank.deploy();
  const blank8 = await Blank.deploy();

  await blank1.deployed();
  await blank2.deployed();
  await blank3.deployed();
  await blank4.deployed();
  await blank5.deployed();
  await blank6.deployed();
  await blank7.deployed();
  await blank8.deployed();

  console.log(
    `
    ==============================================\n
    
    Blank1 deployed to: ${blank1.address}\n
    Blank2 deployed to: ${blank2.address}\n
    Blank3 deployed to: ${blank3.address}\n
    Blank4 deployed to: ${blank4.address}\n
    Blank5 deployed to: ${blank5.address}\n
    Blank6 deployed to: ${blank6.address}\n
    Blank7 deployed to: ${blank7.address}\n
    Blank8 deployed to: ${blank8.address}\n

    ================================================
    `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
