import { Button, Grid, Tag, Text } from "@ledgerhq/react-ui";
import { Inscription } from "../hooks/useFetchOrdinalListFromAddressList";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ImageContainer } from "./ImageContainer";
import { OrdinalImage } from "./OrdinalImage";
import { OrdinalDescriptionContainer } from "./OrdinalDescriptionContainer";

type Props = {
  ordinals: Inscription[];
};





export const Gallery = ({ ordinals }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <Grid m={16} columns={4} columnGap={12} rowGap={12}>
        {ordinals.map((ord) => (
          <ImageContainer
            key={ord.id}
            onClick={() => navigate(`inscription/${ord.address}/${ord.id}`)}
          >
            <OrdinalImage
              src={`https://ordinals.com/content/${ord.id}`}
              alt=""
            />
            <OrdinalDescriptionContainer>
              <Tag active type="opacity">
                {t("inscription", {
                  inscription_number: ord.inscription_number,
                })}
              </Tag>
            </OrdinalDescriptionContainer>
          </ImageContainer>
        ))}
      </Grid>
    </div>
  );
};
