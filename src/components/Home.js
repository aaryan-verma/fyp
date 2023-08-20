import Head from "next/head";
import styled from "styled-components";
import { Colors, Devices } from "./Theme";
import Hero from "./Home/Hero";
import Carousel from "./Home/Carousel";
import TopCollectibles from "./Home/TopCollectibles";
import ModalComponent from "./styled/Modal.styled";
import { useState } from "react";

const HomeEl = styled.article`
  color: ${Colors.White};
`;

export default function Home() {
  const [trigger, setTrigger] = useState(false);
  const [detail, setDetail] = useState();

  const handleTrigger = async (item) => {
      setDetail(item);
      setTrigger(true); 
  }

  return (
    <HomeEl>
      <Head>
        <title>Multichain Ecommerce</title>
        <meta
          name="Description"
          content="Multichain Ecommerce for NFT"
        />
        <link rel="icon" href="/images/logi1.png"/>
      </Head>
      <Hero/>
      <Carousel />
      <TopCollectibles modalFunc={handleTrigger}/>
      <ModalComponent show = {trigger} info = {detail} />
    </HomeEl>
  );
}
