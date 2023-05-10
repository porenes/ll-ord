import { useQueries } from "@tanstack/react-query";
import { isEveryQueryFetched } from "../utils/isEveryQueryFetched";
import { useXpubList } from "./useXpubList";

export function useFetchAddressListFromXpubList(): string[] {
  const { data: xpubList = [], isSuccess: xPubListIsSuccess } = useXpubList();
  const queries = useQueries({
    queries: xpubList.map((xpub) => ({
      queryKey: ["addresses", xpub],
      queryFn: () => {
        // TODO: when endpoint exists for getting addresses from xpub
        return Promise.resolve([
          "bc1pkx8k4sf8tqj3lltcssevny2l5yc478j0m7fsmly3sh2spg3gkluq565986",
        ]);
      },
      enabled: xPubListIsSuccess,
    })),
  });

  if (!queries.length) return [];
  if (!isEveryQueryFetched(queries)) return [];

  return queries.reduce<string[]>((prev, curr) => {
    if (!curr.data) return prev;
    // return unique only, will not be required when getting actual addresses
    return [...prev, ...curr.data];
  }, []);
}
