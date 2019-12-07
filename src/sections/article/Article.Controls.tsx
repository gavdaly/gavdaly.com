import * as React from "react";
import styled from "@emotion/styled";

import { DarkModeToggle } from '@components/DarkModeToggle'
import { SharePageButton } from '@components/SharePageButton'

const ArticleControls: React.FC<{}> = () => {
  return (
    <NavControls>
      <SharePageButton />
      <DarkModeToggle />
    </NavControls>
  );
};

export default ArticleControls;

const NavControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
