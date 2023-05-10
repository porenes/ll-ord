import styled from "styled-components";
import { Grid, Text } from "@ledgerhq/react-ui";
import { Inscription } from "../hooks/useFetchOrdinalListFromAddressList";

type Props = {
  ordinal: Inscription;
};

const Container = styled.div(
  ({ theme }) => `
  padding: ${theme.space[8]}px;
  background-color: ${theme.colors.background.main};
  border-radius: ${theme.space[2]}px;
  display: flex;
  gap: ${theme.space[4]}px;
  flex-direction: column;
`
);

const TextWithEllipsis = styled(Text)(
  () => `
text-overflow: ellipsis;
overflow: hidden;
`
);

export function InscriptionDetailsTable({ ordinal }: Props) {
  const data = Object.entries(ordinal).map(([key, value]) => ({ key, value }));

  return (
    <Container>
      {data.map((d) => (
        <Grid rows={1} columns={2}>
          <Text>{d.key}</Text>
          <TextWithEllipsis>{d.value}</TextWithEllipsis>
        </Grid>
      ))}
    </Container>
  );
}
