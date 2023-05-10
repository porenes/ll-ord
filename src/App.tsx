import { useEffect, useRef } from "react";
import LedgerLiveApi, { WindowMessageTransport } from "@ledgerhq/live-app-sdk";
import type { Account, Currency } from "@ledgerhq/live-app-sdk";
import * as bitcoin from 'bitcoinjs-lib';
import "./App.css";
import BIP32Factory from 'bip32';
import secp256k1 from '@bitcoinerlab/secp256k1';

// You must wrap a tiny-secp256k1 compatible implementation

const bip32 = BIP32Factory(secp256k1);
bitcoin.initEccLib(secp256k1)



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

    const accounts = await api.current
      .listAccounts({includeTokens:false})
      .catch((error) => console.error({ error }));
    const btcAccounts = (accounts as Account[]).filter((a:Account)=>a.currency=="bitcoin").map((a:Account)=>a.id.split(':')[3])
    const xpub = "xpub6CHVgXB6vN27QjwkAJd9KhXntjTX1BwmYW957gnqUs7SQGQTEy7fSRJgQfzu2npL8GmD8CjSC761kk4v91mBUdQCni8rAGiuXGaRj6HJgDz"
    // const xpub = btcAccounts[2]
    console.log( xpub );
    const xpubToTaprootAddress = (xpub: string, index: number) => {
      const node = bip32.fromBase58(xpub);
      const child = node.derive(0).derive(index);
      console.log(child.publicKey.slice(1, 33));
      
      const { address } = bitcoin.payments.p2tr({
        internalPubkey: child.publicKey.slice(1, 33),
      });
      return address;
    };
    console.log(xpubToTaprootAddress(xpub, 0));
    

    
  };

  return (
    <div className="App">
      <header className="App-header">
        
        <h1>
          Ordinals by Ledger
        </h1>

        <button onClick={requestAccount}>Request account</button>
        <button onClick={showXpubs}>ShowxPubs</button>
      </header>
    </div>
  );
};

export default App;
