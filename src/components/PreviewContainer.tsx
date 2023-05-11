import styled from "styled-components";

export const PreviewContainer = styled.div<{ isClickable?: boolean }>(
  ({ theme, isClickable }) => `
  background-color: ${theme.colors.background.main};
  padding: ${theme.space[4]}px;
  cursor: ${isClickable ? 'pointer' : 'unset'};
  border-radius: ${theme.space[2]}px;
  image-rendering: pixelated;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`
);
