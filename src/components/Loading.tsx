import { InfiniteLoader, Text } from "@ledgerhq/react-ui";
import { PropsWithChildren } from "react";
import { styled } from "styled-components";

const CenterContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 16px;
`;

const MyText = styled(Text)`
  display: flex;
  align-items: center;
  justify-items: center;
  text-align: center;
`;

export function Loading({ children }: PropsWithChildren) {
  return (
    <CenterContainer>
      <Container>
        <InfiniteLoader color="primary.c100" />
        <MyText>{children}</MyText>
      </Container>
    </CenterContainer>
  );
}
