import styled from "styled-components";
import Button from "../styled/Button.styled";
//import Image from "next/image";
import { Colors } from "../Theme";
import { ethers } from 'ethers';
import { BsHeart } from "react-icons/bs";
import { goenft, goemarket, goeresell, goenftcol, goerpc } from '../../../engine/configuration';
import Web3Modal from "web3modal";
import NFTCollection from '../../../engine/NFTCollection.json'
import Resell from '../../../engine/Resell.json';
import Market from '../../../engine/Market.json';
import NFT from '../../../engine/NFT.json';
import { useState } from "react";
import ModalComponent from "./Modal.styled";
import { useRouter } from "next/router";
const NFTCardEl = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Card = styled.div`
  border-radius: 15px;
  overflow: hidden;
  z-index: 2;
  background-color: ${Colors.White};
  color: ${Colors.Black};
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 40px rgb(0 0 0/10%);
`;

const BadgeEl = styled.span`
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 3;
  background: linear-gradient(
    to right,
    ${Colors.Gradients.PrimaryToSec[0]},
    ${Colors.Gradients.PrimaryToSec[1]}
  );
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-weight: 500;
  color: ${Colors.White};
`;

const ItemImage = styled.div``;
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  flex: 1;
  gap: 0.5rem;
`;
const TSection = styled.div`
  display: flex;
  justify-content: space-between;
`;
const EditionEl = styled.span`
  font-weight: 500;
`;
const StockEl = styled.span`
  color: ${Colors.Border};
  font-weight: 600;
`;
const ItemTitle = styled.h2`
  font-size: 1.4rem;
`;
const PriceSection = styled.div``;
const BottomSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;
const AvatarEl = styled.span`
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  height: 50px;
  width: 50px;
  margin-right: 0.5rem;
`;

const AuthorEl = styled.span``;
const LikesEl = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.5rem;

  > svg {
    cursor: pointer;
  }
`;

const Bar1 = styled.span`
  width: 93%;
  height: 0.7rem;
  background-color: ${Colors.White};
  border-radius: 0 0 50px 50px;
  box-shadow: inset 0 4px 5px rgb(0 0 0 /10%);
  z-index: 1;
  /* filter: brightness(0.7); */
  transform: translateY(-30%);
`;
const Bar2 = styled(Bar1)`
  width: 88%;
  transform: translateY(-60%);
  /* filter: brightness(0.5); */
  z-index: 0;
`;

const Image = styled.img`
  width: 260px;
  height: 250px;
`;

const ImageIcon = styled.img`
  width: 120px;
  height: 80px;
`;

const Box = styled.div`
  display: flex;
  align-items: stretch;
  gap: 4rem;
`;

const LinkText = styled.span`
  color: linear-gradient(
    to right,
    ${Colors.Gradients.PrimaryToSec[0]},
    ${Colors.Gradients.PrimaryToSec[1]}
  );
  font-weight: 700;
  font-style: italic;
  cursor: pointer;
  font-size: 12px;
  text-decoration: underline;
`;

export default function NFTCard(params) {
  

  const [trigger, setTrigger] = useState(false);
  const [image, setImage] = useState("");
  const router = useRouter();
  async function buyNewGoe(nft) {
    // const web3Modal = new Web3Modal()
    
    // const connection = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(connection)
    // const signer = provider.getSigner()
    // const contract = new ethers.Contract(goemarket, Market, signer)
    // const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    // const transaction = await contract.n2DMarketSale(goenft, nft.itemId, {
    //   value: price
    // })
    // await transaction.wait()
   // loadGoeSaleNFTs()
  }

  function getChainImage() {
     if ( params.item.chain === "bsc" ) {
         return "bscIcon.png"; 
    } else if ( params.item.chain === "eth") {
         return "eth.svg";
    } 
     else {
         return "polygon.png"
     }
  }
  return (
    <NFTCardEl>
      <Card>
        {/* <BadgeEl>{Badge}</BadgeEl> */}
        <ItemImage>
          <Image src={params.item.image} width="1024" height="1025" />
        </ItemImage>
        <InfoSection>
          <TSection>
            <EditionEl>
              Minted via MinterBox
            </EditionEl>
            {/* <StockEl>{Stock} for sale</StockEl> */}
          </TSection>
          <ItemTitle>{params.item.name}</ItemTitle>
          <Box>
          <PriceSection>{params.item.price}</PriceSection>
          <ImageIcon src = {getChainImage()} />
          </Box>
          <BottomSection>
            <Button onClick={() => {params.modalFunc(params.item)}} >Buy Product</Button>
            <LinkText onClick={() => { 
                router.push({
                  pathname: "/asset",
                  query: params.item
                })
             }} >More Details</LinkText>            
            {/* <AuthorEl>{params.item.owner}</AuthorEl> */}
            {/* <LikesEl>
              <BsHeart /> {Likes}
            </LikesEl> */}
          </BottomSection>
        </InfoSection>
      </Card>
      <Bar1 />
      <Bar2 />
    </NFTCardEl>
  );
}

