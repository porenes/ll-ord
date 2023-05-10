import { PropsWithChildren, useEffect, useState } from "react";
import { ledgerLiveClient } from "./clients/ledgerLiveClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./clients/queryClient";

export function Setup({ children }: PropsWithChildren<{}>) {
  const [connected, setConnected] = useState<boolean>(false)
  useEffect(() => {
    ledgerLiveClient.connect();
    setConnected(true)
    return () => ledgerLiveClient.disconnect();
  }, []);

  if (!connected) return null;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
