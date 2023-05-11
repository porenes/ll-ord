import styled from "styled-components";
import { Divider, Grid, Text } from "@ledgerhq/react-ui";
import { Ordinal } from "../hooks/useFetchOrdinalListFromAddressList";
import { useTranslation } from "react-i18next";

type Props = {
  ordinal: Ordinal;
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

const LinkWithEllipsis = styled.button(
  ({ theme }) => `
  font-weight: 500;
  white-space: normal;
  font-family: Inter,Sans;
  font-size: 13px;
  cursor: pointer;
  display: block;
  background-color: transparent;
  border: none;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${theme.colors.primary.c80};

  &:hover {
    text-decoration: underline;
  }
`
);

export function OrdinalDetailsTable({ ordinal }: Props) {
  const { t } = useTranslation()
  return (
    <Container>
      <Text variant="h2">{t('information')}</Text>
      <Divider />
      <Grid columns={1} rowGap={8}>
        <Grid columns={1} rows={2} rowGap={2}>
          <Text variant="large">{t('id')}</Text>
          <TextWithEllipsis variant="paragraph">{ordinal.id}</TextWithEllipsis>
        </Grid>
        <Grid columns={1} rows={2} rowGap={2}>
          <Text variant="large">{t('owner')}</Text>
          <TextWithEllipsis variant="paragraph">{ordinal.address}</TextWithEllipsis>
        </Grid>
        <Grid columns={1} rows={2} rowGap={2}>
          <Text variant="large">{t('title')}</Text>
          <TextWithEllipsis variant="paragraph">
            {ordinal.title}
          </TextWithEllipsis>
        </Grid>
        <Grid columns={1} rows={2} rowGap={2}>
          <Text variant="large">{t('content_length')}</Text>
          <TextWithEllipsis variant="paragraph">
            {ordinal.content_length}
          </TextWithEllipsis>
        </Grid>
        <Grid columns={1} rows={2} rowGap={2}>
          <Text variant="large">{t('content_type')}</Text>
          <TextWithEllipsis variant="paragraph">
            {ordinal.content_type}
          </TextWithEllipsis>
        </Grid>
        <Grid columns={1} rows={2} rowGap={2}>
          <Text variant="large">{t('genesis_height')}</Text>
          <TextWithEllipsis variant="paragraph">
            {ordinal.genesis_height}
          </TextWithEllipsis>
        </Grid>
        <Grid columns={1} rows={2} rowGap={2}>
          <Text variant="large">{t('genesis_fee')}</Text>
          <TextWithEllipsis variant="paragraph">
            {ordinal.genesis_fee}
          </TextWithEllipsis>
        </Grid>
        <Grid columns={1} rows={2} rowGap={2}>
          <Text variant="large">{t('location')}</Text>

          <LinkWithEllipsis
            onClick={() =>
              window.open(
                "https://mempool.space/tx/9340c25c541d6a92654e58128f61305ee06f49d6aeaea209a65822e86c037faa"
              )
            }
          >
            {ordinal.location}
          </LinkWithEllipsis>
        </Grid>
      </Grid>
    </Container>
  );
}
