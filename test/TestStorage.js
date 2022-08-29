/* eslint-disable no-undef */
const { expect } = require('chai');

describe("helper", function(){

  it("helper", async()=>{
    const [owner] = await ethers.getSigners();

    const MyContract = await ethers.getContractFactory("MyStorage");
    const hardhatToken = await MyContract.deploy();

    const c = await hardhatToken.helper(2);
    console.log("cccc",c);
    expect(await hardhatToken.helper(2)).equal(4);

  })


})