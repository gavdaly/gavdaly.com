import styled from '@emotion/styled'
import { css } from '@emotion/core'

/**
 * Example:
 * <Heading.h1>Lorem Ipsum</Heading.h1>
 */

const commonStyles = css`
  font-weight: bold;
`

const h1 = styled.h1`
  font-size: 52px;
  ${commonStyles};
`

const h2 = styled.h2`
  font-size: 32px;
  ${commonStyles};
`

const h3 = styled.h3`
  font-size: 24px;
  ${commonStyles};
`

const h4 = styled.h4`
  font-size: 18px;
  ${commonStyles};
`

const h5 = styled.h5`
  font-size: 18px;

  ${commonStyles};
`

const h6 = styled.h6`
  font-size: 16px;

  ${commonStyles};
`

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
}
