import styled from '@emotion/styled'

export const ToolTip = styled.div`
  position: absolute;
  padding: 4px 13px;
  background: var(--color-tooltip-background);
  color: var(--color-tooltip);
  border-radius: 5px;
  font-size: 14px;
  top: -35px;
  opacity: 0;
  display: none;
  transform: translateY(-3px);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &.copied {
    opacity: 1;
    display: block;
    transform: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--color-tooltip-background);
  }
`
