import { Text } from "@ledgerhq/react-ui";
import { useTranslation } from "react-i18next";
import { useFetchOrdinalListFromAddressList } from "./hooks/useFetchOrdinalListFromAddressList";

function App() {
  const ordinals = useFetchOrdinalListFromAddressList();
  const { t } = useTranslation();
  return (
    <div>
      <Text>{t("title")}</Text>
      <ul>
        {ordinals.map((ord) => (
          <li>
            <Text key={ord.id}>{ord["content type"]}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
