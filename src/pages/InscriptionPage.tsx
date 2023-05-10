import { Box, Grid, Text } from "@ledgerhq/react-ui";
import { useParams } from "react-router-dom";
import { useInscriptionDetails } from "../hooks/useInscriptionDetails";
import { OrdinalImage } from "../components/OrdinalImage";
import { ImageContainer } from "../components/ImageContainer";
import { InscriptionDetailsTable } from "../components/InscriptionDetailsTable";
import { useEffect } from "react";

export function InscriptionPage() {
  const { address = "", id = "" } = useParams();
  const inscription = useInscriptionDetails({ address, id });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!inscription) {
    return null;
  }

  return (
    <div>
      <Box ml={16} mt={8}>
        <Text variant="h1">{inscription.title}</Text>
      </Box>
      <Grid columns={2} m={16} columnGap={12}>
        <div>
          <ImageContainer>
            <OrdinalImage
              src={`https://ordinals.com/content/${inscription.id}`}
              alt=""
            />
          </ImageContainer>
        </div>
        <InscriptionDetailsTable ordinal={inscription} />
      </Grid>
    </div>
  );
}
