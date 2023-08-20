import Home from "../src/components/Home";
import { ContractFactory } from "ethers";
import { ethers } from "ethers";
import abi from "../engine/NFT.json";
import { bytecode } from "../engine/bytecodes";
export default function Index() {
 // BlockchainBackend();
  async function BlockchainBackend() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner()
  const factory = new ContractFactory(abi, bytecode, signer);

// If your contract requires constructor args, you can specify them here
factory.deploy("0x001E318f49345209a5dD62D9C15fd3Ee53d865ad").then(contract => {
  console.log(contract.address);
console.log(contract.deployTransaction);
});

  }
 
  return <Home />;
}
