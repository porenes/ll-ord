import styled from "styled-components";

export const OrdinalImage = styled.img(
  ({ theme }) => `
  width: 100%;
  display: block;
  border-radius: ${theme.space[2]}px;
`
);
