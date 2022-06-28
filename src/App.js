import './App.css';
import {ethers} from 'ethers';
import Token from './artifacts/contracts/Token.sol/Token.json'

const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
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
   
  }

  async function getBalance() {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
    console.log(account)
    const balance = await contract.balanceOf(account);
    console.log('balance',balance.toNumber())
  }


  async function transfer(){
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
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
    let balance = await contract.balanceOf(account);
    console.log('balance1',balance.toNumber())
    const transaction = await contract.transfer(account, 100);
    await transaction.wait();
    console.log('transaction',transaction);
     balance = await contract.balanceOf(account);
    console.log('balance2',balance.toNumber())
  }

  return (
    <div className="App">
      <button onClick={getAccounts}>Get Accounts</button>
      <button onClick={connectETH}>Connect ETH</button>
      <button onClick={queryBlockchain}>Query Blockchain</button>
      <button onClick={getBalance}>Get Balance</button>
      <button onClick={transfer}>Transfer</button>
    </div>
  );
}

export default App;
