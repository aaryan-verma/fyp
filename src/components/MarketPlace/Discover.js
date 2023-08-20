import styled from 'styled-components';
import { Colors, Devices } from '../Theme';
import { NFTs } from "./../../Info";
import Grid from "../styled/Grid.styled";
import Link from "next/link";
import EventCard from "./EventCard";
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from "web3modal";
import { useRouter } from 'next/router';
import NFTCollection from './../../../engine/NFTCollection.json'
import Resell from './../../../engine/Resell.json';
import Market from './../../../engine/Market.json';
import NFT from './../../../engine/NFT.json';
import EventMarket from './../../../engine/EventMarket.json';
import EventNFT from './../../../engine/EventNFT.json';
import { Text, Button, Row, Spacer } from '@nextui-org/react';
import { hhnft, hhmarket, hhresell, hhnftcol, hhrpc, mmEventMarket, seprpc, sepEventMarket, bsctEventMarket } from './../../../engine/configuration';
import { goenft, goemarket, goeresell, goenftcol, goerpc } from './../../../engine/configuration';
import { bsctnft, bsctmarket, bsctresell, bsctnftcol, bsctrpc } from './../../../engine/configuration';
import { mmnft, mmmarket, mmresell, mmnftcol, mmrpc } from './../../../engine/configuration';
import { cipherHH, cipherEth, simpleCrypto } from './../../../engine/configuration';

const DiscoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 25px;
  margin: 0 auto;
`;

const NftList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const NftListItem = styled.li`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding-bottom: 4%;

  @media screen and (min-width: 768px) {
    padding-bottom: 1%;
  }

  @media screen and (min-width: 992px) {
    width: 100%;
    max-width: none;
    padding-bottom: 1%;
  }

  @media screen and (min-width: 1200px) {
    padding-bottom: 1%;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  padding-top: 20px;
  border-top: 2px solid ${Colors.Border};
`;


const PageHeading = styled.h2`
  font-size: 1.5rem;
  font-size: 36px;
  font-weight: 500;
  text-align: center;
  color: ${Colors.White};
  @media ${Devices.Laptop} {
    font-size: 2rem;
  }
`;

const CreateEventLink = styled.a`
  font-size: 16px;
  color: ${Colors.White};
  text-decoration: none;
  margin-top: 20px;
  align-self: flex-end;
  margin-bottom: 20px;
`;

const Discover = () => {
  
  const [hhlist, hhResellNfts] = useState([])
  const [hhnfts, hhsetNfts] = useState([])
  const [goelist, goeResellNfts] = useState([])
  const [goenfts, goesetNfts] = useState([])
  const [bsctlist, bsctResellNfts] = useState([])
  const [bsctnfts, bsctsetNfts] = useState([])
  const [mmlist, MumResellNfts] = useState([])
  const [mmnfts, MumsetNfts] = useState([])
  const [allNfts, setAllNfts] = useState([])

  useEffect(() => {
    // loadHardHatResell()
    // loadGoerliResell()
    // loadBsctResell()
    // loadMumResell()
     //loadBsctSaleNFTs()
     loadBsctSaleNFTs()
     loadGoeSaleNFTs()
     loadMumSaleNFTs()
  }, [hhResellNfts, hhsetNfts, goeResellNfts, 
    goesetNfts, bsctResellNfts, bsctsetNfts, setAllNfts])


  const nftEvents = allNfts.map((data, i) => (
    <NftListItem key={i}>
      <EventCard details = {data} />
    </NftListItem>
  ));

  
  const handleConfetti = () => {
    //confetti();
  };
  const router = useRouter()

  /*
  Hardhat Listings Functions
  */

  async function loadHardHatResell() {
    const provider = new ethers.providers.JsonRpcProvider(hhrpc)
    const key = simpleCrypto.decrypt(cipherHH)
    const wallet = new ethers.Wallet(key, provider);
    const contract = new ethers.Contract(hhnftcol, NFTCollection, wallet);
    const market = new ethers.Contract(hhresell, Resell, wallet);
    const itemArray = [];
    contract.totalSupply().then(result => {
      for (let i = 0; i < result; i++) {
        var token = i + 1         
        var owner = contract.ownerOf(token)
        var getOwner = Promise.resolve(owner)
        getOwner.then(address => {
        if (address == hhresell) {
        const rawUri = contract.tokenURI(token)
        const Uri = Promise.resolve(rawUri)
        const getUri = Uri.then(value => {
          let str = value
          let cleanUri = str.replace('ipfs://', 'https://ipfs.io/ipfs/')
          //console.log(cleanUri)
          let metadata = axios.get(cleanUri).catch(function (error) {
            console.log(error.toJSON());
          });
          return metadata;
        })
        getUri.then(value => {
          let rawImg = value.data.image
          var name = value.data.name
          var desc = value.data.description
          let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')
          //console.log(market)
          //const price = market.getPrice(token)
          const price = 2500000000000000;
          Promise.resolve(price).then(_hex => {
          var salePrice = Number(_hex);
          var txPrice = salePrice.toString()
          Promise.resolve(owner).then(value => {
            let ownerW = value;
            let outPrice = ethers.utils.formatUnits(salePrice.toString(), 'ether')
            let meta = {
              name: name,
              img: image,
              cost: txPrice,
              val: outPrice,
              tokenId: token,
              wallet: ownerW,
              desc
            }
            console.log(meta)
            itemArray.push(meta)
          })
        })
      })
    }})
    }})
    await new Promise(r => setTimeout(r, 3000));
    hhResellNfts(itemArray)
    loadHHSaleNFTs();
  }
  async function loadHHSaleNFTs() {
    const hhPrivkey = simpleCrypto.decrypt(cipherHH)
    const provider = new ethers.providers.JsonRpcProvider(hhrpc)
    const wallet = new ethers.Wallet(hhPrivkey, provider);
    const tokenContract = new ethers.Contract(hhnft, NFT, wallet)
    const marketContract = new ethers.Contract(hhmarket, Market, wallet)
    const data = await marketContract.getAvailableNft()
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    hhsetNfts(items)
  }

    async function buyNewHH(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(hhmarket, Market, signer)
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.n2DMarketSale(hhnft, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadHHSaleNFTs();
  }

  /*
  Goerli Listings Functions
  */

  async function loadGoerliResell() {
    const provider = new ethers.providers.JsonRpcProvider(goerpc)
    const key = simpleCrypto.decrypt(cipherEth)
    const wallet = new ethers.Wallet(key, provider);
    const contract = new ethers.Contract(goenftcol, NFTCollection, wallet);
    const market = new ethers.Contract(goeresell, Resell, wallet);
    const itemArray = [];
    contract.totalSupply().then(result => {
      for (let i = 0; i < result; i++) {
        var token = i + 1         
        var owner = contract.ownerOf(token)
        var getOwner = Promise.resolve(owner)
        getOwner.then(address => {
        if (address == goeresell) {
        const rawUri = contract.tokenURI(token)
        const Uri = Promise.resolve(rawUri)
        const getUri = Uri.then(value => {
          let str = value
          let cleanUri = str.replace('ipfs://', 'https://ipfs.io/ipfs/')
          console.log(cleanUri)
          let metadata = axios.get(cleanUri).catch(function (error) {
            console.log(error.toJSON());
          });
          return metadata;
        })
        getUri.then(value => {
          let rawImg = value.data.image
          var name = value.data.name
          var desc = value.data.description
          let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')
          //const price = market.getPrice(token)
          const price = 2500000000000000;
          Promise.resolve(price).then(_hex => {
          var salePrice = Number(_hex);
          var txPrice = salePrice.toString()
          Promise.resolve(owner).then(value => {
            let ownerW = value;
            let outPrice = ethers.utils.formatUnits(salePrice.toString(), 'ether')
            let meta = {
              name: name,
              img: image,
              cost: txPrice,
              val: outPrice,
              tokenId: token,
              wallet: ownerW,
              desc
            }
            console.log(meta)
            itemArray.push(meta)
          })
        })
      })
    }})
    }})
    await new Promise(r => setTimeout(r, 3000));
    goeResellNfts(itemArray)
    loadGoeSaleNFTs();
  }

  async function loadGoeSaleNFTs() {
    const hhPrivkey = simpleCrypto.decrypt(cipherEth)
    const provider = new ethers.providers.JsonRpcProvider(seprpc)
    const wallet = new ethers.Wallet(hhPrivkey, provider);
    const marketContract = new ethers.Contract(sepEventMarket, EventMarket, wallet)
    console.log("check7")
    console.log(marketContract)
    const data = await marketContract.getAvailableEvents();
      console.log(data)
    console.log("check8")
    const items = await Promise.all(data.map(async address => {
      const eventNFTContract = new ethers.Contract(address.ethereum, EventNFT, wallet) 
      const over = await eventNFTContract.isOver();
      console.log(over);
      if (over == true) {
        return;
      }
      const price = await eventNFTContract.ticketPrice();
      const image = await eventNFTContract.image();
      const venue = await eventNFTContract.venue();
      const organizerName = await eventNFTContract.organizerName();
      const organizerAddress = await eventNFTContract.organizerAddress();
      const description = await eventNFTContract.description();
      const eventName = await  eventNFTContract.name();
      const startTime = await eventNFTContract.startTime();
      const endTime = await eventNFTContract.endTime();
      const ticketLeft = await eventNFTContract.ticketSupply();
      console.log(Number(ticketLeft));

      let item = {
        price: ethers.utils.formatUnits(price.toString(), 'ether'),
        image: image,
        name: eventName,
        description: description,
        venue: venue,
        supply: Number(ticketLeft),
        //organizerName: organizerName,
        //organizerAddress: organizerAddress,
        duration: (endTime - startTime) / (3600),
        chain: "eth",
        polygon: address.polygon,
        binance: address.binance,
        ethereum: address.ethereum,
        organizerName: organizerName,
        organizerAddress: organizerAddress
      }
      allNfts.push(item);
      return item
    }))
    goesetNfts(items)
  }

  async function buyNewGoe(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(goemarket, Market, signer)
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.n2DMarketSale(goenft, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadGoeSaleNFTs()
  }

   /*
  BSCT Listings Functions
  */

  async function loadBsctResell() {
    const provider = new ethers.providers.JsonRpcProvider(bsctrpc)
    const key = simpleCrypto.decrypt(cipherEth)
    const wallet = new ethers.Wallet(key, provider);
    const contract = new ethers.Contract(bsctnftcol, NFTCollection, wallet);
    const market = new ethers.Contract(bsctresell, Resell, wallet);
    const itemArray = [];
    contract.totalSupply().then(result => {
      for (let i = 0; i < result; i++) {
        var token = i + 1         
        var owner = contract.ownerOf(token)
        var getOwner = Promise.resolve(owner)
        getOwner.then(address => {
        if (address == bsctresell) {
        const rawUri = contract.tokenURI(token)
        const Uri = Promise.resolve(rawUri)
        const getUri = Uri.then(value => {
          let str = value
          let cleanUri = str.replace('ipfs://', 'https://ipfs.io/ipfs/')
          console.log(cleanUri)
          let metadata = axios.get(cleanUri).catch(function (error) {
            console.log(error.toJSON());
          });
          return metadata;
        })
        getUri.then(value => {
          let rawImg = value.data.image
          var name = value.data.name
          var desc = value.data.description
          let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')
          const price = market.getPrice(token)
          Promise.resolve(price).then(_hex => {
          var salePrice = Number(_hex);
          var txPrice = salePrice.toString()
          Promise.resolve(owner).then(value => {
            let ownerW = value;
            let outPrice = ethers.utils.formatUnits(salePrice.toString(), 'ether')
            let meta = {
              name: name,
              img: image,
              cost: txPrice,
              val: outPrice,
              tokenId: token,
              wallet: ownerW,
              desc
            }
            console.log(meta)
            itemArray.push(meta)
          })
        })
      })
    }})
    }})
    await new Promise(r => setTimeout(r, 3000));
    bsctResellNfts(itemArray)
    loadBsctSaleNFTs();
  }

  async function loadBsctSaleNFTs() {
    const hhPrivkey = simpleCrypto.decrypt(cipherEth)
    const provider = new ethers.providers.JsonRpcProvider(bsctrpc)
    const wallet = new ethers.Wallet(hhPrivkey, provider);
    const marketContract = new ethers.Contract(bsctEventMarket, EventMarket, wallet)
    console.log("check7")
    console.log(marketContract)
    const data = await marketContract.getAvailableEvents();
      console.log(data)
    console.log("check8")
    const items = await Promise.all(data.map(async address => {
      const eventNFTContract = new ethers.Contract(address.binance, EventNFT, wallet) 
      const over = await eventNFTContract.isOver();
      console.log(over);
      if (over == true) {
        return;
      }
      const price = await eventNFTContract.ticketPrice();
      const image = await eventNFTContract.image();
      const venue = await eventNFTContract.venue();
      const organizerName = await eventNFTContract.organizerName();
      const organizerAddress = await eventNFTContract.organizerAddress();
      const description = await eventNFTContract.description();
      const eventName = await  eventNFTContract.name();
      const startTime = await eventNFTContract.startTime();
      const endTime = await eventNFTContract.endTime();
      const ticketLeft = await eventNFTContract.ticketSupply();
      console.log(Number(ticketLeft));

      let item = {
        price: ethers.utils.formatUnits(price.toString(), 'ether'),
        image: image,
        name: eventName,
        description: description,
        venue: venue,
        supply: Number(ticketLeft),
        organizerName: organizerName,
        organizerAddress: organizerAddress,
        duration: (endTime - startTime) / (3600),
        chain: "bsc",
        polygon: address.polygon,
        binance: address.binance,
        ethereum: address.ethereum
      }
      allNfts.push(item);
      return item
    }))

    bsctsetNfts(items)
    //setAllNfts(allNfts => [...allNfts, ...bsctnfts]);
  }

  async function buyNewBsct(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(bsctmarket, Market, signer)
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.n2DMarketSale(bsctnft, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadBsctSaleNFTs()
  }

  /*
  Mumbai Listings Functions
  */

  async function loadMumResell() {
    const provider = new ethers.providers.JsonRpcProvider(mmrpc)
    const key = simpleCrypto.decrypt(cipherEth)
    const wallet = new ethers.Wallet(key, provider);
    console.log("check1")
    const contract = new ethers.Contract(mmnftcol, NFTCollection, wallet);
    const market = new ethers.Contract(mmresell, Resell, wallet);
    console.log("check2")
    const itemArray = [];
    contract.totalSupply().then(result => {
      console.log("check4")
      console.log("Result value", result)
      const val = Number(result)
      console.log("Now", val)
      for (let i = 0; i < val; i++) {
        var token = i + 1         
        var owner = contract.ownerOf(token)
        console.log("check5")
        var getOwner = Promise.resolve(owner)
        getOwner.then(address => {
        if (address == mmresell) {
        const rawUri = contract.tokenURI(token)
        const Uri = Promise.resolve(rawUri)
        const getUri = Uri.then(value => {
          let str = value
          let cleanUri = str.replace('ipfs://', 'https://cors-anywhere.herokuapp.com/ipfs.io/ipfs/')
          console.log(cleanUri)
          let metadata = axios.get(cleanUri).catch(function (error) {
            console.log(error.toJSON());
          });
          return metadata;
        })
        getUri.then(value => {
          let rawImg = value.data.image
          var name = value.data.name
          var desc = value.data.description
          let image = rawImg.replace('ipfs://', 'https://cors-anywhere.herokuapp.com/ipfs.io/ipfs/')
          const price = market.getPrice(token)
          console.log("check6")
          Promise.resolve(price).then(_hex => {
          var salePrice = Number(_hex);
          var txPrice = salePrice.toString()
          Promise.resolve(owner).then(value => {
            let ownerW = value;
            let outPrice = ethers.utils.formatUnits(salePrice.toString(), 'ether')
            let meta = {
              name: name,
              img: image,
              cost: txPrice,
              val: outPrice,
              tokenId: token,
              wallet: ownerW,
              desc
            }
            console.log("Mumbai Data", meta)
            itemArray.push(meta)
          })
        })
      })
    }})
    }})
    await new Promise(r => setTimeout(r, 3000));
    MumResellNfts(itemArray)
    loadMumSaleNFTs();
    console.log("check3")
  }

  async function loadMumSaleNFTs() {
    const hhPrivkey = simpleCrypto.decrypt(cipherEth)
    const provider = new ethers.providers.JsonRpcProvider(mmrpc)
    const wallet = new ethers.Wallet(hhPrivkey, provider);
    
    const marketContract = new ethers.Contract(mmEventMarket, EventMarket, wallet)
    console.log("check7")
    console.log(marketContract)
    const data = await marketContract.getAvailableEvents();
      console.log(data)
    console.log("check8")
    const items = await Promise.all(data.map(async address => {
      const eventNFTContract = new ethers.Contract(address.polygon, EventNFT, wallet) 
      const over = await eventNFTContract.isOver();
      console.log(over);
      if (over == true) {
        return;
      }
      const price = await eventNFTContract.ticketPrice();
      const image = await eventNFTContract.image();
      const venue = await eventNFTContract.venue();
      const organizerName = await eventNFTContract.organizerName();
      const organizerAddress = await eventNFTContract.organizerAddress();
      const description = await eventNFTContract.description();
      const eventName = await  eventNFTContract.name();
      const startTime = await eventNFTContract.startTime();
      const endTime = await eventNFTContract.endTime();
      const ticketLeft = await eventNFTContract.ticketSupply();
      console.log(Number(ticketLeft));

      let item = {
        price: ethers.utils.formatUnits(price.toString(), 'ether'),
        image: image,
        name: eventName,
        description: description,
        venue: venue,
        supply: Number(ticketLeft),
        organizerName: organizerName,
        organizerAddress: organizerAddress,
        duration: (endTime - startTime) / (3600),
        chain: "matic",
        polygon: address.polygon,
        binance: address.binance,
        ethereum: address.ethereum
      }
      allNfts.push(item);
      return item
    }))
    MumsetNfts(items)
   // setAllNfts(allNfts => [...allNfts, ...mmnfts]);
  }

  async function buyNewMum(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(mmmarket, Market, signer)
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.n2DMarketSale(mmnft, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadMumSaleNFTs()
  }




  return (
    <DiscoverWrapper style={{ backgroundColor: Colors.Background }}>
      <PageHeading>ALL Events</PageHeading>
      <CreateEventLink href="/CreateEvent">Create Event</CreateEventLink>
      <Container>
      <NftList>{nftEvents}</NftList>
      </Container>
      
    </DiscoverWrapper>
  );
};

export default Discover;
