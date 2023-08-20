import styled from "styled-components";
//import Image from "next/image";
import Link from "next/link";
import { Colors, Devices } from "../Theme";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa";
import { useState, useEffect } from "react";
import Button from "../styled/Button.styled";
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Web3Modal from "web3modal";
import NFT from '../../../engine/NFT.json';
import Market from '../../../engine/Market.json';
import LatestABI from '../../../engine/LatestABI.json'

import { mmnft, mmmarket, mmrpc, latestID, sepnft, sepmarket } from '../../../engine/configuration';
import { goenft, goemarket } from '../../../engine/configuration';
import { hhnft, hhmarket } from '../../../engine/configuration';
import { bsctnft, bsctmarket } from '../../../engine/configuration';
import { cipherEth, simpleCrypto } from '../../../engine/configuration';import detectEthereumProvider from '@metamask/detect-provider';
//import { Card, Button, Input, Col, Row, Spacer, Container, Text } from '@nextui-org/react';
import { client } from '../../../engine/configuration';
import 'sf-font';
//import { MongoClient } from "mongodb";
//import { latest } from "@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time";


const WarrantyEl = styled.article`
  margin: 6rem 1rem 5rem 1rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${Devices.Laptop} {
    margin: 3rem 4rem 5rem 4rem;
  }

  @media ${Devices.LaptopL} {
    margin: 3rem 10rem 5rem 10rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 3rem;
  font-weight: 500;
  font-size: 1.7rem;

  @media ${Devices.Laptop} {
    font-size: 2.7rem;
  }
`;
const Heading = styled.span``;
const Sub = styled.span`
  font-size: 1.5rem;
  display: block;
`;

const Slider = styled.div`
  position: relative;
  height: 35vh;
  min-height: 230px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  box-shadow: 0px 0px 3rem ${Colors.Primary};
  border-radius: 20px;

  @media ${Devices.Tablet} {
    height: 50vh;
  }
`;

const Box = styled.div`
`;

const MinterBox = styled.div`
border-style: solid;
border-color: ${Colors.White};
border-radius: 15px;
padding: 10px;
width: 300px;
background-color: ${Colors.Gradients};
display:flex;
flex-direction:column;
`;

const InputSmall = styled.input`
height: 35px;
font-size: 15px;
padding-left: 7px;
margin: 5px;
border-radius: 5px;
border-style: hidden;
width: 250px
`;

const Input = styled.input`
height: 35px;
font-size: 15px;
padding-left: 7px;
margin: 10px;
border-radius: 5px;
border-style: hidden;
width: 250px;
`;


const Form = styled.div`
 display:flex;
 flex-direction:column;
 align-items:center;
`;

const ImgContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  filter: brightness(0.6);
  display: block;
`;

const InfoContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 3;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const MiddleSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  & > svg {
    font-size: 2.4rem;
    cursor: pointer;
    @media ${Devices.Tablet} {
      font-size: 3.4rem;
    }
  }
`;

const Date = styled.span`
  font-weight: 500;
  font-size: 1.1rem;
`;
const STitle = styled.h2`
  font-size: 1.3rem;
`;
const Author = styled.span`
  color: ${Colors.Primary};
  font-size: 1.1rem;
  font-weight: 500;
`;
const Arrow = styled.span``;

const Lines = styled.span`
  position: relative;
  z-index: 3;
  display: flex;
  gap: 0.5rem;
`;
const Line = styled.span`
  display: inline-block;
  width: 2rem;
  height: 0.25rem;
  border-radius: 30px;
  background-color: ${(p) => (p.active ? Colors.Primary : Colors.White)};
`;
const Img = styled.div`
  width: 100%;
  height: 100%;
`;

const Items = [
  {
    Id: 1,
    Badge: "UPCOMING",
    Date: "Tue, Feb 01",
    Title: "Space Man",
    Author: "Unknown",

    ImageSrc: "/images/newraw/space.jpeg",
  },
  {
    Id: 2,
    Badge: "Features",
    Date: "Tue, Feb 01",
    Title: "In Working",
    Author: "Eleven",

    ImageSrc: "/images/newraw/space2.jpeg",
  },
  {
    Id: 3,
    Badge: "LIVE Demo",
    Date: "Tue, Feb 01",
    Title: "Soon",
    Author: "Eleven",

    ImageSrc: "/images/newraw/punk.jpeg",
  },
];

const Label = styled.label`
  
`;

const ImageUpload = styled.div`
font-color: ${Colors.White};
border-color: ${Colors.White};
border-width: 3px;
border-style: dashed;
display: flex;
flex-direction: column;
justify-content: center;
width: 100px;
height: 80px;
margin: 10px;
align-items: center;
cursor: pointer;
`;

const Image = styled.img`

`;

export default function Warranty() {
  const [fileUrl, setFileUrl] = useState(null)
    const [nftcontract, getNft] = useState([])
    const [market, getMarket] = useState([])
   // const [latestID, setLatestID] = useState(0);
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', days: 0, months: 0, years: 0 })
    // const URI = "mongodb+srv://abhishek27082000:qwertyuiop@cluster0.nykis4h.mongodb.net/?retryWrites=true&w=majority";
    // const Client = new MongoClient(URI);


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


    async function setNft(){
        const web3Modal = new Web3Modal()
        await web3Modal.connect();
        var hh = "0x7a69";
        var goe = "0x5";
        var mm = "0x13881";
        var bsct = "0x61";
        var sep = "0xaa36a7";
        const connected = await detectEthereumProvider();
        if (connected.chainId == hh) {
          var nftcontract = hhnft
        }
        else if (connected.chainId == sep) {
          var nftcontract = sepnft
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
        var sep = "0xaa36a7";
        const connected = await detectEthereumProvider();
        if (connected.chainId == hh) {
          var market = hhmarket
        }
        else if (connected.chainId == sep) {
          var market = sepmarket
        }
        else if (connected.chainId == mm) {
          var market = mmmarket
        }
        else if (connected.chainId == bsct) {
          var market = bsctmarket
        }
        getMarket(market);
        console.log(market)
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
    <WarrantyEl>
      <Title>
        <Heading>Warranty Management</Heading>
        <Sub>Mint Time Bound NFTs</Sub>
      </Title>

      <MinterBox>
        <Title>
          <Sub>
            Warranty NFT Minter Box
          </Sub>
        </Title>
        <Form>
        <Input type="text" placeholder="Name of your nft" 
         onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <Input type="text" placeholder="Description of your nft" 
        onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <Label>
        <ImageUpload>
        {
                    fileUrl 
                    ?  <Image className="rounded " width="90" height="100"  src={fileUrl} />
                    :  <FaRegImage size="50px" color="white"/>
                    
        }
        </ImageUpload>
        <Input type="file" hidden="invisible" onChange={onChange}/>
        </Label>
        <Input type="text" placeholder="Set your price " 
        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <Sub>Warranty Time Period</Sub>
        <Box>
          <InputSmall type="text" placeholder="Years" 
          onChange={e => updateFormInput({ ...formInput, years: e.target.value })} />
          <InputSmall type="text" placeholder="Months" 
          onChange={e => updateFormInput({ ...formInput, months: e.target.value })} />
          <InputSmall type="text" placeholder="Days" 
          onChange={e => updateFormInput({ ...formInput, days: e.target.value })} />
        </Box>
        <Button onClick={createMarket}>Create Product</Button>
        </Form>
      </MinterBox>
    </WarrantyEl>
  );
}

