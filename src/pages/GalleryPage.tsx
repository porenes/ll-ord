import { Grid, InfiniteLoader } from "@ledgerhq/react-ui";

import { useFetchOrdinalListFromAddressList } from "../hooks/useFetchOrdinalListFromAddressList";
import { Gallery } from "../components/Gallery";

const GalleryPage = () => {
  const ordinals = useFetchOrdinalListFromAddressList();

  if (!ordinals.length) {
    return (
      <Grid columns={1} rows={1}>
        <InfiniteLoader color="white" />
      </Grid>
    );
  }

  return <Gallery ordinals={ordinals} />;
};

export default GalleryPage;
