import { PropsWithChildren, useEffect, useState } from "react";
import { StyleProvider } from "@ledgerhq/react-ui";

import { ledgerLiveClient } from "./clients/ledgerLiveClient";
import { persister, queryClient } from "./clients/queryClient";
import { useTheme } from "./hooks/useTheme";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

export function Setup({ children }: PropsWithChildren) {
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
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        {children}
      </PersistQueryClientProvider>
    </StyleProvider>
  );
}
