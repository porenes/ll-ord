import { styled } from "styled-components";
import { Ordinal } from "../hooks/useFetchOrdinalListFromAddressList";
import { OrdinalImage } from "./OrdinalImage";
import { OrdinalJSON } from "./OrdinalJSON";
import { OrdinalTextPlain } from "./OrdinalTextPlain";

type Props = {
  ordinal: Ordinal;
};

const Iframe = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  pointer-events: none;
`;

export function OrdinalPreview({ ordinal }: Props) {
  if (ordinal.content_type.includes("image")) {
    return (
      <OrdinalImage src={`https://ordinals.com/content/${ordinal.id}`} alt="" />
    );
  }
  if (ordinal.content_type.includes("application/json")) {
    return <OrdinalJSON id={ordinal.id} />;
  }
  if (ordinal.content_type.includes("text/plain")) {
    return <OrdinalTextPlain id={ordinal.id} />;
  }
  return (
    <div>
      <Iframe
        src={`https://ordinals.com/preview/${ordinal.id}`}
        title={ordinal.title}
      />
    </div>
  );
}
