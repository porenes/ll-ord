import { styled } from "styled-components";
import { useFetchOrdinalJsonContent } from "../hooks/useFetchOrdinalJSONContent";
import { Loading } from "./Loading";
import { useTranslation } from "react-i18next";

type Props = {
  id: string;
};

const JSONContainer = styled.div(({ theme }) => `
  display: grid;
  font-family: monospace;
  color: ${theme.colors.primary.c100};
  overflow: auto;
`)

export function OrdinalJSON({ id }: Props) {
  const { data } = useFetchOrdinalJsonContent({ id });
  const { t } = useTranslation();

  if (!data) {
    <Loading>{t('fetching_json_content')}</Loading>;
  }

  return (
    <JSONContainer>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </JSONContainer>
  );
}
