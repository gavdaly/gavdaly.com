import styled from '@emotion/styled'

const Anchor = styled.a`
  transition: background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
  color: var(--color-accent);

  &:visited {
    color: var(--color-accent);
    opacity: 0.85;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

export default Anchor
