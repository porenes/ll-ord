import { useQuery } from "@tanstack/react-query";
import { ledgerLiveClient } from "../clients/ledgerLiveClient";

export function useXpubList() {
  return useQuery(
    ["xpub", "list"],
    () => {
      return ledgerLiveClient.listAccounts();
    },
    {
      select(accounts) {
        return accounts
          .filter((account) => account.currency === "bitcoin")
          .map((bitcoinAccount) => bitcoinAccount.id.split(":")[3]);
      },
    }
  );
}
