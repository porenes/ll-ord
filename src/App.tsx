import secp256k1 from "@bitcoinerlab/secp256k1";
import type { Account } from "@ledgerhq/live-app-sdk";
import LedgerLiveApi, { WindowMessageTransport } from "@ledgerhq/live-app-sdk";
import BIP32Factory from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Setup } from "./Setup";

// You must wrap a tiny-secp256k1 compatible implementation

const bip32 = BIP32Factory(secp256k1);
bitcoin.initEccLib(secp256k1);

const App = () => {
  // Define the Ledger Live API variable used to call api methods
  const api = useRef<LedgerLiveApi>();

  // Instantiate the Ledger Live API on component mount
  useEffect(() => {
    const llapi = new LedgerLiveApi(new WindowMessageTransport());
    llapi.connect();
    if (llapi) {
      api.current = llapi;
    }
    // Cleanup the Ledger Live API on component unmount
    return () => {
      api.current = undefined;
      void llapi.disconnect();
    };
  }, []);

  const [inscriptions, setInscriptions] = useState<any>([]);

  // A very basic test call to request an account
  const requestAccount = async () => {
    if (!api.current) {
      return;
    }

    const result = await api.current
      .requestAccount()
      .catch((error) => console.error({ error }));

    console.log({ result });
  };
  // A very basic test call to request an account
  const showXpubs = async () => {
    if (!api.current) {
      return;
    }

    const xpubToTaprootAddress = (xpub: string, index: number) => {
      const node = bip32.fromBase58(xpub);
      const child = node.derive(0).derive(index);

      const { address } = bitcoin.payments.p2tr({
        internalPubkey: child.publicKey.slice(1, 33),
      });
      return address;
    };
    const accounts = await api.current
      .listAccounts({ includeTokens: false })
      .catch((error) => console.error({ error }));

    const btcAccounts = (accounts as Account[])
      .filter(
        (a: Account) =>
          // dirty filter for Taproot accounts
          a.currency == "bitcoin" && a.address.startsWith("bc1p")
      )
      .map((a: Account) => a.id.split(":")[3]);
    for (let iAcc = 0; iAcc < btcAccounts.length; iAcc++) {
      const xpub = btcAccounts[iAcc];

      // const xpub = "xpub6CHVgXB6vN27QjwkAJd9KhXntjTX1BwmYW957gnqUs7SQGQTEy7fSRJgQfzu2npL8GmD8CjSC761kk4v91mBUdQCni8rAGiuXGaRj6HJgDz"
      // const xpub = btcAccounts[2]
      // console.log(xpub);
      for (let idx = 0; idx < 3; idx++) {
        const p2trAdd = xpubToTaprootAddress(xpub, idx);
        try {
          const response = await fetch(`https://ordapi.xyz/address/${p2trAdd}`);
          const responseJSON = await response.json();
          if (responseJSON.length > 0) {
            // console.log(contentType)
            // return contentType;
            console.log(p2trAdd);
            console.log(responseJSON);
            setInscriptions((oldInsc: any) => [...oldInsc, ...responseJSON]);
          }
        } catch (error) {
          console.log(error);
          // return error
        }
      }
    }
  };

  return (
    <Setup>
      <div className="App">
        <header className="App-header">
          <h1>Ordinals by Ledger</h1>
          <button onClick={showXpubs}>ShowxPubs</button>
        </header>
      </div>
    </Setup>
  );
};

export default App;
