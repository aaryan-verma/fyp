import styled from "styled-components";
import Image from "next/image";
import { Colors, Devices } from "../Theme";
import { AiFillCaretLeft } from "react-icons/ai";
import Head from "next/head";
import Details from "./Details";
import Buy from "./Buy";
import { useRouter } from "next/router";
import BridgeModal from "./BridgeModal";

const AssetEl = styled.article`
  background-color: ${Colors.White};
  color: ${Colors.Black};
  padding: 1rem;
  display: flex;
  flex-direction: column;

  @media ${Devices.Laptop} {
    padding: 1rem 15%;
  }
`;
const SectionContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  @media ${Devices.Laptop} {
    flex-direction: row;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex: 0.7rem;
  flex-direction: column;
  gap: 1rem;
`;
const ImageEl = styled.div`
  border-radius: 30px;
  overflow: hidden;
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  gap: 0.85rem;
  flex: 0.95;
`;
const BackBtn = styled.a`
  color: ${Colors.Primary};
  display: flex;
  width: max-content;
  cursor: pointer;
  align-items: center;
`;
const AuthorContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  span {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;
const AvatarEl = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
`;
const CreatorLabel = styled.label`
  color: ${Colors.Gray};
  font-size: 0.9rem;
`;
const UsernameEl = styled.span``;
const Title = styled.h1`
  font-size: 1.7rem;
  display: inline-block;
  margin-right: 1rem;
`;
const Availability = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: red;
`;
const Des = styled.p`
  white-space: pre-wrap;
`;

const Event = ({eventimg, title, creatorimg, creatorname, available, description, location, DateTime, ticketprice}) => { 
    const router = useRouter();
    const data = router.query; 
    
  return (
    <AssetEl>
      <Head>Just There</Head>
      <SectionContainer>
        <LeftSection>
          <ImageEl>
            <img
              src= {data.image}
              alt= "/images/newraw/1.jpeg"
              layout="responsive"
              width="400px"
              height="400px"
            />
          </ImageEl>
        </LeftSection>
        <RightSection>
          <BackBtn href="/marketplace">
            <AiFillCaretLeft />
            Back
          </BackBtn>
          <span>
            <Title>{data.name}</Title>
          </span>
          <AuthorContainer>
            <AvatarEl>
              <Image src="/images/newraw/luffy.jpeg" width="50" height="50" />
            </AvatarEl>
            <span>
              <CreatorLabel>Creator</CreatorLabel>
              <UsernameEl>{data.organizerName}</UsernameEl>
            </span>
          </AuthorContainer>
          <Availability>Tickets Available: {data.supply}</Availability>
          <Des>
            {data.description}
          </Des>
          <Details Label = {"Venue"} Value = {data.venue} />
          <Details Label = {"Date & Time"} Value={data.duration + " Hrs"} />
        </RightSection>
      </SectionContainer>
      <Buy data = {data} Symbol={""}/>
    </AssetEl>
  );
}

export default Event;