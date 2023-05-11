import styled from "styled-components";

export const ImageContainer = styled.div(
  ({ theme }) => `
  background-color: ${theme.colors.background.main};
  padding: ${theme.space[3]}px;
  cursor: pointer;
  border-radius: ${theme.space[2]}px;
  image-rendering: pixelated;
`
);
