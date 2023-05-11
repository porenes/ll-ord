import { useQueries } from "@tanstack/react-query";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";

import { isEveryQueryFetched } from "../utils/isEveryQueryFetched";
import { useXpubList } from "./useXpubList";

const bip32 = BIP32Factory(ecc);
bitcoin.initEccLib(ecc);

const xpubToTaprootAddress = (xpub: string, index: number) => {
  const node = bip32.fromBase58(xpub);
  const child = node.derive(0).derive(index);

  const { address } = bitcoin.payments.p2tr({
    internalPubkey: child.publicKey.slice(1, 33),
  });
  return address;
};

export function useFetchAddressListFromXpubList(): string[] {
  const { data: xpubList = [], isSuccess: xPubListIsSuccess } = useXpubList();
  const queries = useQueries({
    queries: xpubList.map((xpub) => ({
      queryKey: ["addresses", xpub],
      queryFn: () => {
        const addresses = [];
        for (let idx = 0; idx < 3; idx++) {
          const p2trAdd = xpubToTaprootAddress(xpub, idx);
          p2trAdd && addresses.push(p2trAdd);
        }
        return Promise.resolve([...addresses]);
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
