import "./App.css";
import { useXpubList } from "./hooks/useXpubList";

const App = () => {
  const { data } = useXpubList();
  console.log({ data });
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ordinals by Ledger</h1>
      </header>
    </div>
  );
};

export default App;
