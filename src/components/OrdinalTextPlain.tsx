import { useTranslation } from "react-i18next";
import { useFetchOrdinalTextPlainContent } from "../hooks/useFetchOrdinalTextPlainContent";
import { safeJSONParse } from "../utils/safeJSONParse";
import { Loading } from "./Loading";
import { styled } from "styled-components";

type Props = {
  id: string;
};

const TextContainer = styled.div(
  ({ theme }) => `
  display: grid;
  font-family: monospace;
  color: ${theme.colors.primary.c100};
  overflow: auto;
`
);

export function OrdinalTextPlain({ id }: Props) {
  const { data } = useFetchOrdinalTextPlainContent({ id });
  const { t } = useTranslation();

  if (!data) {
    return <Loading>{t("fetching_text_content")}</Loading>;
  }

  const potentialJSON = safeJSONParse(data);

  if (potentialJSON) {
    return (
      <TextContainer>
        <pre>{JSON.stringify(potentialJSON, null, 2)}</pre>
      </TextContainer>
    );
  }

  return (
    <TextContainer>
      <pre>{data}</pre>
    </TextContainer>
  );
}
