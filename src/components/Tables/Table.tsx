import React from 'react'
import styled from '@emotion/styled'

const StyledTable = styled.table`
  line-height: 1.65;
  color: var(--color-grey);
  background: var(--color-card);
  margin: 45px auto 85px;
  border: 1px solid var(--color-horizontalRule);
  border-radius: 5px;
  overflow: hidden;
  border-collapse: separate;
`

const Table: React.FC<{}> = ({ children }) => {
  return (
    <div style={{ overflowX: 'auto', padding: '0 20px' }}>
      <StyledTable>{children}</StyledTable>
    </div>
  )
}

export default Table
