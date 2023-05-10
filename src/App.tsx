import "./App.css";
import { useFetchOrdinalListFromAddressList } from "./hooks/useFetchOrdinalListFromAddressList";
// import { useXpubList } from "./hooks/useXpubList";

const App = () => {
  const ordinal = useFetchOrdinalListFromAddressList()

  console.log({ ordinal })


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ordinals by Ledger</h1>
      </header>
    </div>
  );
};

export default App;
