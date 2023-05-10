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
          "xpub6CHVgXB6vN27QjwkAJd9KhXntjTX1BwmYW957gnqUs7SQGQTEy7fSRJgQfzu2npL8GmD8CjSC761kk4v91mBUdQCni8rAGiuXGaRj6HJgDz",
        ];
      },
    }
  );
}
