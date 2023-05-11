import styled from "styled-components";

export const OrdinalDescriptionContainer = styled.div(
  ({ theme }) => `
  display: flex;
  gap: ${theme.space[4]}px;
  margin-top: ${theme.space[4]}px;
`
);
