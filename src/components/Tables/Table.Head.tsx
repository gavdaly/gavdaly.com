import styled from "@emotion/styled";

const Head = styled.thead`
  text-align: left;
  border-collapse: collapse;
  position: relative;
  line-height: 1.756;
  font-weight: 600;
  color: ${p => p.theme.colors.primary};
  font-family: ${p => p.theme.fonts.serif};
  transition: background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
`;

export default Head;
