import { Button, Grid, Text } from "@ledgerhq/react-ui/components";
import { Inscription } from "../hooks/useFetchOrdinalListFromAddressList";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  ordinals: Inscription[];
};

const ImageContainer = styled.div(
  ({ theme }) => `
  background-color: ${theme.colors.background.main};
  padding: ${theme.space[3]}px;
  cursor: pointer;
  border-radius: ${theme.space[2]}px;
  image-rendering: pixelated;
`
);

const OrdinalDescriptionContainer = styled.div(
  ({ theme }) => `
  display: flex;
  gap: ${theme.space[4]}px;
  margin-top: ${theme.space[4]}px;
`
);

const OrdinalImage = styled.img(
  ({ theme }) => `
  width: 100%;
  display: block;
  border-radius: ${theme.space[2]}px;
`
);

export const Gallery = ({ ordinals }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <Button m={16} onClick={() => navigate('other')} variant="main">Go to other page</Button>
      <Grid m={16} columns={4} columnGap={12} rowGap={12}>
        {ordinals.map((ord) => (
          <ImageContainer key={ord.id}>
            <OrdinalImage
              src={`https://ordinals.com/content/${ord.id}`}
              alt=""
            />
            <OrdinalDescriptionContainer>
              <header>
                <Text variant="large">
                  {t("inscription", {
                    inscription_number: ord.inscription_number,
                  })}
                </Text>
              </header>
            </OrdinalDescriptionContainer>
          </ImageContainer>
        ))}
      </Grid>
    </div>
  );
};
