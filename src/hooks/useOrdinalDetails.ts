import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../clients/queryClient";
import { Ordinal } from "./useFetchOrdinalListFromAddressList";

type Props = {
  address: string;
  id: string;
};

export function useOrdinalDetails({ id, address }: Props) {
  const cacheData =
    queryClient.getQueryData<Ordinal[]>(["ordinal", address]) ?? [];

  const ordinal = cacheData.find((d) => d.id === id);
  const { data } = useQuery(
    ["ordinal", id],
    async () => {
      const res = await fetch(`https://ordapi.xyz/inscription/${id}`);
      if (!res.ok) throw res;

      const data: Omit<Ordinal, "address"> = await res.json();

      return { ...data, address };
    },
    {
      // only try and grab inscription if we don't have cache.
      enabled: !ordinal,
      cacheTime: 0,
      staleTime: 0,
    }
  );
  return data || ordinal;
}
