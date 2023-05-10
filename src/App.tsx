import { Text } from "@ledgerhq/react-ui";
import { useXpubList } from "./hooks/useXpubList";
import { useTranslation } from "react-i18next";

function App() {
  const { data } = useXpubList();
  const { t } = useTranslation()
  return (
    <div>
      <Text>{t('title')}</Text>
      <ul>
        {data &&
          data.map((xpub) => (
            <li>
              <Text key={xpub}>{xpub}</Text>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
