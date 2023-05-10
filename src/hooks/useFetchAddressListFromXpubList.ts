import { useQueries } from "@tanstack/react-query";
import { isEveryQueryFetched } from "../utils/isEveryQueryFetched";
import { useXpubList } from "./useXpubList";
import secp256k1 from "@bitcoinerlab/secp256k1";
import BIP32Factory from "bip32";
import * as bitcoin from "bitcoinjs-lib";
const bip32 = BIP32Factory(secp256k1);
bitcoin.initEccLib(secp256k1);

export function useFetchAddressListFromXpubList(): string[] {
  const { data: xpubList = [], isSuccess: xPubListIsSuccess } = useXpubList();
  const xpubToTaprootAddress = (xpub: string, index: number) => {
    const node = bip32.fromBase58(xpub);
    const child = node.derive(0).derive(index);

    const { address } = bitcoin.payments.p2tr({
      internalPubkey: child.publicKey.slice(1, 33),
    });
    return address;
  };
  console.log(xpubList);

  const queries = useQueries({
    queries: xpubList.map((xpub) => ({
      queryKey: ["addresses", xpub],
      queryFn: () => {
        let addresses = [];
        for (let idx = 0; idx < 3; idx++) {
          const p2trAdd = xpubToTaprootAddress(xpub, idx);
          p2trAdd && addresses.push(p2trAdd);
        }
        console.log(addresses);

        // TODO: when endpoint exists for getting addresses from xpub
        return Promise.resolve(addresses);
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
