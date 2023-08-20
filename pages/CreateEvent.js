import styled from 'styled-components';
import { Colors, Devices } from '../src/components/Theme';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa";
import { useState, useEffect } from "react";
import { BigNumber, ethers } from 'ethers';
import { useRouter } from 'next/router';
import Web3Modal from "web3modal";
import NFT from '../engine/NFT.json';
import Market from '../engine/Market.json';
import LatestABI from '../engine/LatestABI.json'

import { mmnft, mmmarket, mmrpc, latestID, mmEventMarket, goerpc, bsctrpc, seprpc, sepEventMarket, bsctEventMarket, hhrpc } from '../engine/configuration';
import { goenft, goemarket } from '../engine/configuration';
import { hhnft, hhmarket } from '../engine/configuration';
import { bsctnft, bsctmarket } from '../engine/configuration';
import { cipherEth, simpleCrypto } from '../engine/configuration';import detectEthereumProvider from '@metamask/detect-provider';
//import { Card, Button, Input, Col, Row, Spacer, Container, Text } from '@nextui-org/react';
import { client } from '../engine/configuration';
import { NFTBytecode } from "../engine/bytecodes";
import EventNFT from '../engine/EventNFT.json';
import EventMarket from '../engine/EventMarket.json';
import { ContractFactory } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { EtherscanProvider } from '@ethersproject/providers';


const CreateEventWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: none;
  justify-content: space-between;
  align-items: center;
`;

const MainHeading = styled.div`
  flex-basis:  70%;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: none;
    flex-basis: 0%;
  }
`;

const FormWrapper = styled.div`
  flex-basis: 30%;
  max-width: auto;
  margin: 40px 50px;
  padding: 20px;
  background-color: ${Colors.Background};
  color: ${Colors.White};
  border-radius: 5px;
  box-shadow: 0px 0px 3rem ${Colors.Primary};
  @media screen and (max-width: 768px) {
    flex-basis: 100%;
    margin: 10px;
    padding: 20px;
    box-shadow: none;
  }
`;

const InputLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${Colors.Gray};
  background-color: ${Colors.GrayBG}; /* add white background color */
  color: ${Colors.Black}; /* add black text color */
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${Colors.Gray};
  background-color: ${Colors.White}; /* add white background color */
  color: ${Colors.Black}; /* add black text color */
`;

const FileInputLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Title = styled.h1`
  margin-bottom: 3rem;
  font-weight: 500;
  text-align: center;
  font-size: 1.7rem;
  color: ${Colors.White}; 
  @media ${Devices.Laptop} {
    font-size: 2.7rem;
  }
`;
const Heading = styled.span``;

const Sub = styled.span`
  font-size: 1.5rem;
  display: block;
`;

const FormHeading = styled.h2`
text-align: center;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: linear-gradient(
    to right,
    ${Colors.Gradients.PrimaryToSec[0]},
    ${Colors.Gradients.PrimaryToSec[1]}
  );
  color: ${Colors.White};
  font-size: 16px;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
`;

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [venue, setVenue] = useState('');
  const [timing, setTiming] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState(null)
  const [nftcontract, getNft] = useState([])
  const [market, getMarket] = useState([])
  const [rpc, setRpc] = useState("");
 // const [latestID, setLatestID] = useState(0);
  const [formInput, updateFormInput] = useState({ price: '', name: '', organizerName: '', description: '', days: 0, months: 0, years: 0 })
  // const URI = "mongodb+srv://abhishek27082000:qwertyuiop@cluster0.nykis4h.mongodb.net/?retryWrites=true&w=majority";
  // const Client = new MongoClient(URI);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

    useEffect(() => {
        setNft();
      }, [getNft, getMarket])
   
    const router = useRouter()

    async function onChange(e) {
        const file = e.target.files[0]
        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://cf-ipfs.com/ipfs/${added.path}`
            console.log("Testing:", url)
            setFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    async function DeployEventContract() {
      console.log("here")
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("here")
      await provider.send("eth_requestAccounts", []);
      console.log("here")
      const signer = provider.getSigner()
      console.log("here")
      const userWallet = await signer.getAddress();
      console.log("here")
      let MContract = new ethers.Contract(market, EventMarket, signer)
      console.log("here")
      const factory = new ContractFactory(EventNFT, NFTBytecode, signer);
      console.log("here")
      factory.deploy(market, formInput.years * 60 * 60, formInput.name, "Gvt", fileUrl, venue, formInput.description, parseEther(formInput.price), 10, formInput.organizerName, userWallet).then(async contract => {
        console.log("here")
        var goe = "0x5";
        var sep = "0xaa36a7"
        var mm = "0x13881";
        var bsct = "0x61";
        const connected = await detectEthereumProvider();
        let sepENFT, mmENFT, bsctENFT;
        if (connected.chainId !== sep) {
          console.log("Here")
          const ethprovider = new ethers.providers.JsonRpcProvider(seprpc);
          const ethKey = simpleCrypto.decrypt(cipherEth);
          var wallet = new ethers.Wallet(ethKey, ethprovider);
          const factory = new ContractFactory(EventNFT, NFTBytecode, wallet);
          const feeData = await ethprovider.getFeeData();
          console.log(feeData);
          const options = {
            gasPrice: feeData.gasPrice,
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
          }
      sepENFT = await factory.deploy(market, formInput.years * 60 * 60, formInput.name, "Gvt", fileUrl, venue, formInput.description, parseEther(formInput.price), 10, formInput.organizerName, userWallet)
        }
         if (connected.chainId !== mm) {
          const ethprovider = new ethers.providers.JsonRpcProvider(mmrpc);
          const ethKey = simpleCrypto.decrypt(cipherEth);
          var wallet = new ethers.Wallet(ethKey, ethprovider);
          const factory = new ContractFactory(EventNFT, NFTBytecode, wallet);
      mmENFT  = await factory.deploy(market, formInput.years * 60 * 60, formInput.name, "Gvt", fileUrl, venue, formInput.description, parseEther(formInput.price), 10, formInput.organizerName, userWallet)  
      console.log("Polygon Done!")  
        }
        if (connected.chainId !== bsct) {
          const ethprovider = new ethers.providers.JsonRpcProvider(bsctrpc);
          const ethKey = simpleCrypto.decrypt(cipherEth);
          var wallet = new ethers.Wallet(ethKey, ethprovider);
          const factory = new ContractFactory(EventNFT, NFTBytecode, wallet);
          const feeData = await ethprovider.getFeeData();
          console.log(feeData);
          let gas = { gasPrice: feeData.gasPrice }; 
      bsctENFT = await factory.deploy(market, formInput.years * 60 * 60, formInput.name, "Gvt", fileUrl, venue, formInput.description, parseEther(formInput.price), 10, formInput.organizerName, userWallet, gas)
      console.log("Binance Done!")  
        }
        console.log("Polygon:")
        console.log(mmENFT)
        console.log("Binance:")
        console.log(bsctENFT)
        console.log("Ethereum")
        console.log(sepENFT)
        if ( sepENFT === undefined ) {
           sepENFT = contract;          
        }
        else if ( bsctENFT === undefined ) {
           bsctENFT = contract;
        }
        else if ( mmENFT === undefined ) {
          mmENFT = contract;
        }
     let transaction = await MContract.registerEvent(sepENFT.address, bsctENFT.address, mmENFT.address);
         await transaction.wait()
  console.log(contract.deployTransaction);
  });
    }

    async function setNft(){
        const web3Modal = new Web3Modal()
        await web3Modal.connect();
        var hh = "0x7a69";
        var goe = "0x5";
        var mm = "0x13881";
        var bsct = "0x61";
        var sep = "0xaa36a7"
        const connected = await detectEthereumProvider();
        console.log(connected.chainId)
        if (connected.chainId == hh) {
          var nftcontract = hhnft
        }
        else if (connected.chainId == goe) {
          var nftcontract = goenft
        }
        else if (connected.chainId == mm) {
          var nftcontract = mmnft
        }
        else if (connected.chainId == bsct) {
          var nftcontract = bsctnft
        }
        getNft(nftcontract);
        console.log(nftcontract)
        setMarket();
      }
     
      async function setMarket(){
        var hh = "0x7a69";
        var goe = "0x5";
        var mm = "0x13881";
        var bsct = "0x61";
        var sep = "0xaa36a7"
        const connected = await detectEthereumProvider();
        if (connected.chainId == hh) {
          var market = hhmarket
        }
        else if (connected.chainId == sep) {
          var market = sepEventMarket
        }
        else if (connected.chainId == mm) {
          var market = mmEventMarket
        }
        else if (connected.chainId == bsct) {
          var market = bsctEventMarket
        }
        getMarket(market);
        console.log(market)
        setRPC();
      }

      async function setRPC(){
        var hh = "0x7a69";
        var goe = "0x5";
        var mm = "0x13881";
        var bsct = "0x61";
        var sep = "0xaa36a7"
        const connected = await detectEthereumProvider();
        if (connected.chainId == hh) {
             setRpc(hhrpc)
        }
        else if (connected.chainId == sep) {
            setRpc(seprpc)
        }
        else if (connected.chainId == mm) {
           setRpc(mmrpc)
        }
        else if (connected.chainId == bsct) {
           setRpc(bsctrpc)
        }
        console.log(rpc);
      }


    async function createMarket() {
      window.alert("Miniting Initiated, Sit Tight!!!");
        const { name, description, price } = formInput
        if (!name || !description || !price || !fileUrl) return
        const data = JSON.stringify({
            name, description, image: fileUrl
        })
        try {
            const added = await client.add(data)
            const url = `https://cf-ipfs.com/ipfs/${added.path}`
            createNFT(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

     async function getLastestID() {
      const ethprovider = new ethers.providers.JsonRpcProvider(mmrpc);
      const ethKey = simpleCrypto.decrypt(cipherEth);
      var wallet = new ethers.Wallet(ethKey, ethprovider);
      const IDContract = new ethers.Contract(latestID, LatestABI, wallet);
      const currentId = await IDContract.id();
      const txn = await IDContract.getID();
      const output = await txn.wait();
      console.log(output);
      return currentId.toNumber();
  }

    async function createNFT(url) {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        let contract = new ethers.Contract(nftcontract, NFT, signer)
        console.log(contract)
        const id = await getLastestID();
        let period = 31556952 * formInput.years + 2628000 * formInput.months + 864000 * formInput.days;
        let transaction = await contract.createNFT(url, id, period);
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()
        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        console.log("ok")
        contract = new ethers.Contract(market, Market, signer)
        console.log(contract)
        let listingFee = 2500000000000000;
        listingFee = listingFee.toString()
        transaction = await contract.createVaultItem(nftcontract, tokenId, price, { value: listingFee })
        await transaction.wait()
        console.log("yha tak to aya h")
        router.push('/')
    }

    async function buyNFT() {
        const { name, description } = formInput
        if (!name || !description || !fileUrl) return
        const data = JSON.stringify({
            name, description, image: fileUrl
        })
        try {
            const added = await client.add(data)
            const url = `https://infura-ipfs.io/ipfs/${added.path}`
            mintNFT(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    async function mintNFT(url) {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        let contract = new ethers.Contract(nftcontract, NFT, signer)
        let cost = await contract.cost()
        let transaction = await contract.mintNFT(url, 1, { value: cost })
        await transaction.wait()
        router.push('/portal')
    }

  return (
    <CreateEventWrapper>
      <MainHeading>
        <Title>
          <Heading>Event MarketPlace</Heading>
          <Sub>Create NFT Events</Sub>
        </Title>
      </MainHeading>
      <FormWrapper>
      <FormHeading>Create Event</FormHeading>
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor='eventName'>Event Name</InputLabel>
        <InputField
          type='text'
          id='eventName'
          value={formInput.name}
          onChange={(event) => updateFormInput({...formInput, name: event.target.value})}
        />

        <InputLabel htmlFor='organizerName'>Organizer Name</InputLabel>
        <InputField
          type='text'
          id='organizerName'
          value={formInput.organizerName}
          onChange={(event) => updateFormInput({...formInput, organizerName: event.target.value})}
        />

        <InputLabel htmlFor='venue'>Venue</InputLabel>
        <InputField
          type='text'
          id='venue'
          value={venue}
          onChange={(event) => setVenue(event.target.value)}
        />

        <InputLabel htmlFor='timing'>Timing</InputLabel>
        <InputField
          type='text'
          id='timing'
          value={formInput.years}
          onChange={(event) => updateFormInput({...formInput, years: event.target.value})}
        />

        <FileInputLabel htmlFor='image'>Image</FileInputLabel>
        <InputField
          type='file'
          id='image'
          onChange={onChange}
        />

        {fileUrl && <img src={fileUrl} alt='Event' style={{ marginBottom: '20px', maxWidth: '100%' }} />}

        <InputLabel htmlFor='description'>Description</InputLabel>
        <TextArea
          id='description'
          rows='5'
          value={formInput.description}
          onChange={(event) => updateFormInput({...formInput, description: event.target.value})}
        />

<InputLabel htmlFor='price'>Price</InputLabel>
        <InputField
          id='description'
          value={formInput.price}
          onChange={(event) => updateFormInput({...formInput, price: event.target.value})}
        />

        <SubmitButton onClick={DeployEventContract} type='submit'>Submit</SubmitButton>
      </form>
      </FormWrapper>
    </CreateEventWrapper>
    
  );
};

export default EventForm;
