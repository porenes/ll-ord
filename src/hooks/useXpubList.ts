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
        return [
          ...accounts
            .filter(
              (account) =>
                // dirty filter for Taproot accounts
                account.currency === "bitcoin" &&
                account.address.startsWith("bc1p")
            )
            .map((bitcoinAccount) => bitcoinAccount.id.split(":")[3]),
        ];
      },
    }
  );
}
