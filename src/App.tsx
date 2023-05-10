import { Text } from "@ledgerhq/react-ui";
import "./App.css";
import { useFetchOrdinalListFromAddressList } from "./hooks/useFetchOrdinalListFromAddressList";
// import { useXpubList } from "./hooks/useXpubList";

const App = () => {
  const ordinal = useFetchOrdinalListFromAddressList()

  console.log({ ordinal })


  return (
    <div className="App">
      <header className="App-header">
        <Text variant="h1">hello</Text>
      </header>
    </div>
  );
};

export default App;
