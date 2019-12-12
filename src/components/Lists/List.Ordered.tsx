import styled from '@emotion/styled'

const OrderedList = styled.ol`
  list-style: none;
  counter-reset: list;
  color: var(--color-articleText);
  position: relative;
  padding: 1rem 0 2rem 2rem;
  font-size: inherit;

  li {
    position: relative;
  }

  li > :not(ol, ul) {
    display: inline;
  }

  li::before {
    width: 3rem;
    display: inline-block;
    position: absolute;
    color: var(--color-articleText);
  }

  li::before {
    counter-increment: list;
    content: counter(list) '.';
    position: absolute;
    left: -3rem;
    top: 0rem;
  }
`

export default OrderedList
