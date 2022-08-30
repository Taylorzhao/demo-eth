// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract MyStorage{
  uint storageData;

  function get(uint x) public pure returns (uint){
    return x * 2;
  }

  function  helper(uint x) external view returns (uint) {
    return get(x);
  }

}