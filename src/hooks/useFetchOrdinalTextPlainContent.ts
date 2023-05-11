import { useQuery } from "@tanstack/react-query";

type Props = {
  id: string;
};

export function useFetchOrdinalTextPlainContent({ id }: Props) {
  return useQuery(
    ["ordinal", "content", id],
    async () => {
      const res = await fetch(`https://ordinals.com/content/${id}`);

      if (!res.ok) throw res;
      const text = await res.text();
      return text;
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );
}
