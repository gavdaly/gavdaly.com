import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Cell = styled.td`
  border-top: 1px solid var(--color-horizontalRule);
  padding: 15px 30px;
  font-size: 16px;
  background: var(--color-card);

  ${mediaqueries.desktop`
    padding: 14px 20px;
  `}

  ${mediaqueries.tablet`
    font-size: 14px;
  `}
`;

export default Cell;
