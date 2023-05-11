import { useQueries } from "@tanstack/react-query";
import { useFetchAddressListFromXpubList } from "./useFetchAddressListFromXpubList";
import * as z from "zod";
import { isEveryQueryFetched } from "../utils/isEveryQueryFetched";

export const OrdinalSchemaWithAddress = z.object({
  address: z.string(),
  content: z.string(),
  "content length": z.string(),
  "content type": z.string(),
  content_length: z.string(),
  content_type: z.string(),
  "genesis fee": z.string(),
  "genesis height": z.string(),
  "genesis transaction": z.string(),
  genesis_fee: z.string(),
  genesis_height: z.string(),
  genesis_transaction: z.string(),
  id: z.string(),
  inscription_number: z.number(),
  location: z.string(),
  offset: z.string(),
  output: z.string(),
  "output value": z.string(),
  output_value: z.string(),
  preview: z.string(),
  sat: z.string(),
  timestamp: z.string(),
  title: z.string(),
});
export type Ordinal = z.infer<typeof OrdinalSchemaWithAddress>;

export function useFetchOrdinalListFromAddressList(): Ordinal[] {
  const addressList = useFetchAddressListFromXpubList();

  const queries = useQueries({
    queries: addressList.map((address) => ({
      queryKey: ["ordinal", address],
      queryFn: async () => {
        const res = await fetch(`https://ordapi.xyz/address/${address}`);
        if (!res.ok) throw res;

        const data: Omit<Ordinal, "address">[] = await res.json();

        const d = data.map((i) => ({ ...i, address }));
        return d;
      },
    })),
  });

  if (!queries.length) return [];
  if (!isEveryQueryFetched(queries)) return [];

  return queries.reduce<Ordinal[]>((prev, curr) => {
    if (!curr.data) return prev;
    return [...prev, ...curr.data];
  }, []);
}
