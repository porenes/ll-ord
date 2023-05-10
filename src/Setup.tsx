import { PropsWithChildren, useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { StyleProvider } from "@ledgerhq/react-ui";

import { ledgerLiveClient } from "./clients/ledgerLiveClient";
import { queryClient } from "./clients/queryClient";
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
    <StyleProvider selectedPalette={theme} fontsPath={`/fonts`}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StyleProvider>
  );
}
