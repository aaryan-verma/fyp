import styled from "styled-components";
import { Colors } from "../Theme";

const Container = styled.article`
  display: flex;
  border: 1px solid ${Colors.Border};
  align-items: center;
  gap: 1rem;
  padding-right: 1rem;
`;
const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
`;
const DetailsLabel = styled.span`
  font-weight: 500;
`;

const DetailsValue = styled.span`
  color: ${Colors.Gray};
  font-size: 0.9rem;
`;

const Details = ({Label, Value}) => {
  return (
    <Container>
      <Info>
        <DetailsLabel>{Label}</DetailsLabel>
        <DetailsValue>{Value}</DetailsValue>
      </Info>
    </Container>
  );
}

export default Details;