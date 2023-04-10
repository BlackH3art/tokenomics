// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract CrookedSnoutsTokenV3 is ERC20, Ownable {

  uint256 public cap = 1_000_000_000 ether;
  uint256 public burned = 0;

  // allocations
  uint foundersAllocation = 100_000_000 ether;
  uint marketingAllocation = 50_000_000 ether;
  uint developmentAllocation = 50_000_000 ether;
  uint privateSaleAllocation = 150_000_000 ether;
  uint publicSaleAllocation = 100_000_000 ether;
  uint liquidityPoolAllocation = 50_000_000 ether;
  uint communityPoolAllocation = 50_000_000 ether;
  uint stakingAllocation = 200_000_000 ether;
  uint rewardsAllocation = 200_000_000 ether;
  uint utilityRewardsAllocation = 50_000_000 ether;

  address foundersContract = 0x37859bb30070F276FcdEb3b523d89503bf27c17F;
  address marketingContract = 0xc135350E38ec11Cb95aF6C1Acd106A97c95c6271;
  address developmentContract = 0xD2508A652082533d0E9Ce1B4c1294D0e25C36CB2;
  address privateSaleContract = 0x76B468Db87F6BBAF5e8d57E43DCA169EFa958aA4;
  address publicSaleContract = 0x4fFD7B8B0E3C5946f2aB258D9E446FF8c6a8d9b9;
  address liquidityPoolContract = 0x02E96e9F8E61E5f735DEd4D386F3249ca59462E4;
  address communityPoolContract = 0xAf997a85a29f5c9E8A88D696086539E17a67911d;
  address stakingContract = 0xafFD814aFdE5f6F5f76A14ea0a1293627b2cFb3f;
  address rewardsContract = 0xD306fB799A9Fe6d857d8Ea558ba9f9d2a129adDc;
  address utilityRewardsContract = 0x4bcF37FB9C7b491644f31A0673d42cc67e199AAB;

  constructor() ERC20("CrookedSnouts Token", "CST") {
    internalMint(foundersContract, foundersAllocation);
    internalMint(marketingContract, marketingAllocation);
    internalMint(developmentContract, developmentAllocation);
    internalMint(privateSaleContract, privateSaleAllocation);
    internalMint(publicSaleContract, publicSaleAllocation);
    internalMint(liquidityPoolContract, liquidityPoolAllocation);
    internalMint(communityPoolContract, communityPoolAllocation);
    internalMint(utilityRewardsContract, utilityRewardsAllocation);
  }

  function mint(address to, uint256 amount) external onlyOwner {
    require(ERC20.totalSupply() + amount <= cap, "ERC20Capped: cap exceeded");
    _mint(to, amount);
  }

  function internalMint(address to, uint256 amount) internal {
    require(ERC20.totalSupply() + amount <= cap, "ERC20Capped: cap exceeded");
    _mint(to, amount);
  }

  function burn(uint256 amount) external {
    require(cap - amount >= 500_000_000 ether, "Minimal cap reached");
    cap -= amount;
    burned += amount;
    _burn(_msgSender(), amount);
  }

}