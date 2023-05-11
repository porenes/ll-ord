import { queryClient } from "../clients/queryClient";
import { Inscription } from "./useFetchOrdinalListFromAddressList";

type Props = {
  address: string;
  id: string;
};

export function useInscriptionDetails({ id, address }: Props) {
  const cacheData = queryClient.getQueryData<Inscription[]>([
    "ordinal",
    address,
  ]);

  if (!cacheData) return undefined;

  return cacheData.find((d) => d.id === id);
}
