import { useQuery } from "@tanstack/react-query";

type Props = {
  id: string;
};

export function useFetchOrdinalJsonContent({ id }: Props) {
  return useQuery(["ordinal", "content", id], async () => {
    const res = await fetch(`https://ordinals.com/content/${id}`);

    if (!res.ok) throw res;
    const json = await res.json();
    return json;
  }, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });
}
