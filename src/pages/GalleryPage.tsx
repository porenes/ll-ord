import { useFetchOrdinalListFromAddressList } from "../hooks/useFetchOrdinalListFromAddressList";
import { Gallery } from "../components/Gallery";
import { FadeIn } from "../components/FadeIn";
import { Loading } from "../components/Loading";
import { useTranslation } from "react-i18next";

const GalleryPage = () => {
  const ordinals = useFetchOrdinalListFromAddressList();
  const { t } = useTranslation()

  if (!ordinals) {
    return (
      <Loading>
        {t('fetching_inscriptions')}
      </Loading>
    );
  }

  return (
    <FadeIn>
      <Gallery ordinals={ordinals} />;
    </FadeIn>
  );
};

export default GalleryPage;
