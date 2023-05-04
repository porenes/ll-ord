import { useEffect, useRef } from "react";
import LedgerLiveApi, { WindowMessageTransport } from "@ledgerhq/live-app-sdk";
import type { Account, Currency } from "@ledgerhq/live-app-sdk";


import "./App.css";

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
    
    console.log( {btcAccounts} );
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
