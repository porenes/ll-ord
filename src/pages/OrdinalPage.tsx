import { Box, Grid, Text } from "@ledgerhq/react-ui";
import { useParams } from "react-router-dom";
import { useOrdinalDetails } from "../hooks/useOrdinalDetails";
import { OrdinalDetailsTable } from "../components/OrdinalDetailsTable";
import { useEffect } from "react";
import { FadeIn } from "../components/FadeIn";
import { Loading } from "../components/Loading";
import { OrdinalPreview } from "../components/OrdinalPreview";
import { PreviewContainer } from "../components/PreviewContainer";
import { useTranslation } from "react-i18next";

export function OrdinalPage() {
  const { address = "", id = "" } = useParams();
  const ordinal = useOrdinalDetails({ address, id });
  const {t } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!ordinal) {
    return (
      <Loading>
        {t('fetching_inscription_no', { id })}
      </Loading>
    );
  }

  return (
    <FadeIn>
      <div>
        <Box ml={16} mt={8}>
          <Text variant="h1">{ordinal.title}</Text>
        </Box>
        <Grid columns={2} m={16} columnGap={12}>
          <div>
            <PreviewContainer>
              <OrdinalPreview ordinal={ordinal}/>
            </PreviewContainer>
          </div>
          <OrdinalDetailsTable ordinal={ordinal} />
        </Grid>
      </div>
    </FadeIn>
  );
}
