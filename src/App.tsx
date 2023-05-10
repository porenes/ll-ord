import LedgerLiveApi, { WindowMessageTransport } from "@ledgerhq/live-app-sdk";
import { useEffect, useRef } from "react";
import "./App.css";
import { Setup } from "./Setup";
import { useFetchOrdinalListFromAddressList } from "./hooks/useFetchOrdinalListFromAddressList";

const App = () => {
  // Define the Ledger Live API variable used to call api methods
  const api = useRef<LedgerLiveApi>();

  // Instantiate the Ledger Live API on component mount
  const llapi = new LedgerLiveApi(new WindowMessageTransport());

  llapi.connect();
  useEffect(() => {
    if (llapi) {
      api.current = llapi;
    }
    // Cleanup the Ledger Live API on component unmount
    return () => {
      api.current = undefined;
      void llapi.disconnect();
    };
  }, []);

  const ordinalList = useFetchOrdinalListFromAddressList();
  console.log(ordinalList);

  return (
    <Setup>
      <div className="App">
        <header className="App-header">
          <h1>Ordinals by Ledger</h1>
        </header>
      </div>
    </Setup>
  );
};

export default App;
