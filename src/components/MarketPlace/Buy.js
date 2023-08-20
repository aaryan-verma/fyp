import styled from "styled-components";
import Button from "../styled/Button.styled";
import { Colors, Devices } from "../Theme";
import BridgeModal from './BridgeModal'
import { useState } from "react";

const MainContainer = styled.article`
  box-shadow: 0 4px 40px rgb(0 0 0 /10%);
  border: 1px solid ${Colors.Border};
  padding: 0.8rem 1rem;
  border-radius: 5px;
  display: flex;
  position: sticky;
  background-color: ${Colors.White};
  bottom: 1rem;
`;
const LeftSection = styled.div`
  display: none;
  flex: 1;
  gap: 1rem;
  @media ${Devices.Laptop} {
    display: flex;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const BuyLabel = styled.span`
  font-weight: 500;
`;
const TicketPrice = styled.span`
  font-weight: 600;
  font-size: 1.8rem;
  padding: 0.2rem;
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
  align-items: center;

  @media ${Devices.Laptop} {
    flex: 0.6;
  }
`;
const BuyButton = styled(Button)`
  flex: 1;
  width: 100%;
  font-size: 1.07rem;
`;
const TextEl = styled.span`
  color: ${Colors.Gray};
  font-size: 0.7rem;
`;

const Buy = (params) => {
  const [trigger, setTrigger] = useState(false);
  console.log(params.data)
  return (
    <MainContainer>
      <BridgeModal show = {trigger} info = {params.data} />
      <LeftSection>
        <Info>
          <BuyLabel>Price</BuyLabel>
          <TicketPrice>{params.Symbol}{params.data.price}</TicketPrice>
        </Info>
      </LeftSection>
      <RightSection>
        <BuyButton onClick={() => {
          setTrigger(true);
        }} >Buy Ticket For {}</BuyButton>
        <TextEl></TextEl>
      </RightSection>
    </MainContainer>
  );
}

export default Buy;