import { Grid, Tag, Text } from "@ledgerhq/react-ui";
import { Ordinal } from "../hooks/useFetchOrdinalListFromAddressList";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PreviewContainer } from "./PreviewContainer";
import { OrdinalDescriptionContainer } from "./OrdinalDescriptionContainer";
import { OrdinalPreview } from "./OrdinalPreview";
import { styled } from "styled-components";

type Props = {
  ordinals: Ordinal[];
};

const CustomGrid = styled(Grid)(
  () => `
  grid-auto-rows: 300px;
`
);

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

export const Gallery = ({ ordinals }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!ordinals.length) {
    return (
      <CenterContainer>
        <Container>
          <Text variant="h1">
            {t('no_inscriptions_found')}
          </Text>
        </Container>
      </CenterContainer>
    );
  }

  return (
    <div>
      <CustomGrid m={16} columns={4} columnGap={12} rowGap={12}>
        {ordinals.map((ord) => (
          <PreviewContainer
            isClickable={true}
            key={ord.id}
            onClick={() => navigate(`inscription/${ord.address}/${ord.id}`)}
          >
            <OrdinalPreview ordinal={ord} />
            <OrdinalDescriptionContainer>
              <Tag active type="opacity">
                {t("inscription", {
                  inscription_number: ord.inscription_number,
                })}
              </Tag>
            </OrdinalDescriptionContainer>
          </PreviewContainer>
        ))}
      </CustomGrid>
    </div>
  );
};
