import styled from "styled-components";
import { NFTs } from "../../Info";
import { Colors, Devices } from "../Theme";
import Grid from "../styled/Grid.styled";
import Link from "next/link";
import NFTCard from "../styled/NFTCard.styled";
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from "web3modal";
import { useRouter } from 'next/router';
import NFTCollection from '../../../engine/NFTCollection.json'
import Resell from '../../../engine/Resell.json';
import Market from '../../../engine/Market.json';
import NFT from '../../../engine/NFT.json';
import { Text, Button, Row, Spacer, Container } from '@nextui-org/react';
import { hhnft, hhmarket, hhresell, hhnftcol, hhrpc, sepnft, sepmarket, seprpc } from '../../../engine/configuration';
import { goenft, goemarket, goeresell, goenftcol, goerpc } from '../../../engine/configuration';
import { bsctnft, bsctmarket, bsctresell, bsctnftcol, bsctrpc } from '../../../engine/configuration';
import { mmnft, mmmarket, mmresell, mmnftcol, mmrpc } from '../../../engine/configuration';
import { cipherHH, cipherEth, simpleCrypto } from '../../../engine/configuration';
//import confetti from 'canvas-confetti';
import 'sf-font';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const TopCollectiblesEl = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 2rem;
  align-items: center;
  padding: 1rem;

  @media ${Devices.Tablet} {
    padding: 1rem 3rem;
  }
  @media ${Devices.Laptop} {
    padding: 1rem 5%;
  }
  @media ${Devices.LaptopL} {
    padding: 1rem 10%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
`;
const TopSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Sort = styled.div`
  border-radius: 30px;
  border: 1px solid ${Colors.Background};
  padding: 0.4rem 1rem;
  cursor: pointer;
  font-colour: ${Colors.Background};
`;
const Date = styled.div`
  background: linear-gradient(
    to right,
    ${Colors.Gradients.PrimaryToSec[0]},
    ${Colors.Gradients.PrimaryToSec[1]}
  );
  border-radius: 30px;
  padding: 0.4rem 2.5rem;
`;
const ShowMore = styled.button`
  margin-top: 1rem;
  cursor: pointer;
  border: 1px solid ${Colors.Primary};
  padding: 1rem 2rem;
  color: ${Colors.White};
  background-color: transparent;
  border-radius: 5px;
  font-size: 1rem;
`;

export default function TopCollectibles(params) {
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
    loadGoeSaleNFTs()
     loadBsctSaleNFTs()
     loadMumSaleNFTs()
  }, [hhResellNfts, hhsetNfts, goeResellNfts, 
    goesetNfts, bsctResellNfts, bsctsetNfts, setAllNfts])

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
    const tokenContract = new ethers.Contract(sepnft, NFT, wallet)
    const marketContract = new ethers.Contract(sepmarket, Market, wallet)
    const data = await marketContract.getAvailableNft()
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let issueTime = await tokenContract.getIssueTime(i.tokenId.toNumber());
      console.log(issueTime.toNumber());
      let warrantyPeriod = await tokenContract.getWarrantyPeriod(i.tokenId.toNumber());
      console.log(warrantyPeriod.toNumber());
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        issueTime: issueTime.toNumber(),
        warrantyPeriod: warrantyPeriod.toNumber(),
        chain: "eth"
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
    const tokenContract = new ethers.Contract(bsctnft, NFT, wallet)
    const marketContract = new ethers.Contract(bsctmarket, Market, wallet)
    const data = await marketContract.getAvailableNft()
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let issueTime = await tokenContract.getIssueTime(i.tokenId.toNumber());
      console.log(issueTime.toNumber());
      let warrantyPeriod = await tokenContract.getWarrantyPeriod(i.tokenId.toNumber());
      console.log(warrantyPeriod.toNumber());
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        issueTime: issueTime.toNumber(),
        warrantyPeriod: warrantyPeriod.toNumber(),
        chain: "bsc"
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
    const tokenContract = new ethers.Contract(mmnft, NFT, wallet)
    const marketContract = new ethers.Contract(mmmarket, Market, wallet)
    console.log("check7")
    console.log(marketContract)
    const data = await marketContract.getAvailableNft()
      console.log(data)
    console.log("check8")
    const items = await Promise.all(data.map(async i => {
      
      var tokenUri;
      try {
        tokenUri = await tokenContract.tokenURI(i.tokenId);
      } catch {
        return;
      }
      console.log()
      tokenUri = tokenUri.replace('https://ipfs.infura.io/', 'https://cf-ipfs.com/')
      tokenUri = tokenUri.replace('https://infura-ipfs.io/', 'https://cf-ipfs.com/')
      //tokenUri = 'https://'+tokenUri;
      console.log(tokenUri);
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let issueTime = await tokenContract.getIssueTime(i.tokenId.toNumber());
      console.log(issueTime.toNumber());
      let warrantyPeriod = await tokenContract.getWarrantyPeriod(i.tokenId.toNumber());
      console.log(warrantyPeriod.toNumber());
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        issueTime: issueTime.toNumber(),
        warrantyPeriod: warrantyPeriod.toNumber(),
        chain: "matic"
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 
    }
  };

  
  return (
    <TopCollectiblesEl>
      <Title>Available Product NFTs</Title>
      <TopSection>
        <Sort></Sort>
        <Date>Recent</Date>
      </TopSection>
      <Grid>
        {allNfts.map((nft, index) => {
          if ( nft !== undefined ) {
            return (
              <a>
                <NFTCard item={nft} modalFunc = {params.modalFunc} />
              </a>
          );
          } 
        })}
      </Grid>
      <ShowMore>Show More</ShowMore>
    </TopCollectiblesEl>
  );
}


