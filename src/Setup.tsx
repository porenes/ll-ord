import { PropsWithChildren, useEffect, useState } from "react";
import { ledgerLiveClient } from "./clients/ledgerLiveClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./clients/queryClient";
import { StyleProvider } from "@ledgerhq/react-ui";
import { useTheme } from "./hooks/useTheme";

export function Setup({ children }: PropsWithChildren<{}>) {
  const theme = useTheme();
  const [connected, setConnected] = useState<boolean>(false);
  useEffect(() => {
    ledgerLiveClient.connect();
    setConnected(true);
    return () => ledgerLiveClient.disconnect();
  }, []);

  if (!connected) return null;

  return (
    <StyleProvider selectedPalette={theme} fontsPath={`${process.env.PUBLIC_URL}/fonts`}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StyleProvider>
  );
}
