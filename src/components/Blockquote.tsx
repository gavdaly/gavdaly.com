import styled from '@emotion/styled'

const Blockquote = styled.blockquote`
  margin: 15px auto 50px;
  color: var(--color-articleText);

  & > p {
    padding-right: 100px;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;
    font-size: 2.5rem;
    line-height: 1.32;
  }
`

export default Blockquote
