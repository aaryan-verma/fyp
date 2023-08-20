import styled from "styled-components";
import { Colors } from "../Theme";

const MainContainer = styled.article`
  display: flex;
  border: 1px solid ${Colors.Border};
  align-items: center;
  justify-content: space-between; /* add this */
  padding: 1rem;
`;

const TimeLeftInWarranty = styled.a`
  color: ${Colors.PrimaryDark};
  font-size: 1.2rem;
  display: flex;
  gap: 0.5rem;
  text-align: center;
  align-items: center;
`;

const WarrantyTime = ({ fromtime, totime }) => {
  const msInDay = 86400000;
  const msInMonth = 2592000000;
  const msInYear = 31536000000;

  const fromDate = new Date(fromtime);
  const toDate = new Date(totime);
  const diff = toDate - fromDate;

  const years = Math.floor(diff / msInYear);
  const months = Math.floor((diff % msInYear) / msInMonth);
  const days = Math.floor(((diff % msInYear) % msInMonth) / msInDay);

  return (
    <MainContainer>
      <span>Warranty Left:</span>
      <TimeLeftInWarranty>
        {`${years} years, ${months} months, ${days} days`}
      </TimeLeftInWarranty>
    </MainContainer>
  );
};

export default WarrantyTime;
