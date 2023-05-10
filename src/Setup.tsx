import { PropsWithChildren, useEffect } from "react";
import { ledgerLiveClient } from "./clients/ledgerLiveClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./clients/queryClient";

export function Setup({ children }: PropsWithChildren<{}>) {
  useEffect(() => {
    ledgerLiveClient.connect();
    return () => ledgerLiveClient.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
