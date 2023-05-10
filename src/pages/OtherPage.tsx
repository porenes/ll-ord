import { Button } from "@ledgerhq/react-ui";
import { useNavigate } from "react-router-dom";

export const OtherPage = () => {
  const navigate = useNavigate();
  return <Button m={16} variant="main" onClick={() => navigate('/')}>Back to gallery</Button>;
};
