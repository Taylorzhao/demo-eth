// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract MyStorage{
  uint storageData;

  function  helper(uint x) external view returns (uint) {
    return x * 2;
  }

}