import './App.css';
import {ethers} from 'ethers';
import Token from './artifacts/contracts/Token.sol/Token.json'
import MyStorage from './artifacts/contracts/MyStorage.sol/MyStorage.json'

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const storageToken = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const provider = new ethers.providers.Web3Provider(window.ethereum)

function  App()  {
 

  async function getAccounts() {
    const account =  await provider.send("eth_requestAccounts");
    console.log(account);
    const signer = provider.getSigner()
    console.log(signer)
  }
  async function connectETH() {
    const signer = provider.getSigner()
    console.log(signer)
    const res =  await provider.getBlockNumber()
    console.log(res)
    const balance = await provider.getBalance("ethers.eth")
    console.log(balance)
  }

  async function queryBlockchain() {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(storageToken, MyStorage.abi, provider);
    const totalSupply = await contract.helper(2);
    console.log(totalSupply.toNumber());
  }

  async function getBalance() {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
    const totalSupply = await contract.totalSupply();
    console.log(account)
    console.log(totalSupply.toNumber())
    const balance = await contract.balanceOf(account);
    console.log('balance',balance.toNumber())
  }


  async function transfer(){
    let [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log(account,address)
    const chainId = await signer.getChainId();
    console.log(chainId);
    const gasPrice = await signer.getGasPrice();
    console.log('gasPrice',gasPrice.toString());
    const trCount = await signer.getTransactionCount();

    console.log('trCount',trCount.toString());
    const estimategas = await signer.estimateGas();
    console.log('estimategas',estimategas.toString());
   
    // const ensName = await signer.resolveName("ethers.eth");
    // console.log(ensName);
    const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
    const account2 = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
    let balance = await contract.balanceOf(account);
    console.log('balance1',balance.toNumber())
    const transaction = await contract.transfer(account2, 100);
    // const res = await transaction.wait();
    // console.log('res',res);
    console.log('transaction',transaction);
     balance = await contract.balanceOf(account2);
    console.log('balance2',balance.toNumber())
  }

  async function getContract() {
    //const contract = await ethers.getContract("Token", tokenAddress);
    //console.log(contract);
  }

  return (
    <div className="App">
      <button onClick={getAccounts}>Get Accounts</button>
      <button onClick={connectETH}>Connect ETH</button>
      <button onClick={queryBlockchain}>Query Blockchain</button>
      <button onClick={getBalance}>Get Balance</button>
      <button onClick={transfer}>Transfer</button>
      <button onClick={getContract}>Get Contract</button>
    </div>
  );
}

export default App;
