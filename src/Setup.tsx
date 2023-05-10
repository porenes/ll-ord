import { StyleProvider } from "@ledgerhq/react-ui";
import { PropsWithChildren, useEffect } from "react";
import { ledgerLiveClient } from "./clients/ledgerLiveClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./clients/queryClient";
import { useTheme } from "./hooks/useTheme";

export function Setup({ children }: PropsWithChildren) {
  const theme = useTheme();
  useEffect(() => {
    ledgerLiveClient.connect();
    return () => ledgerLiveClient.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider fontsPath="/fonts" selectedPalette={theme}>
        {children}
      </StyleProvider>
    </QueryClientProvider>
  );
}
