import { QueryClient } from "@tanstack/react-query";

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 30 minute cache
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 30,
    }
  }
});
export { queryClient, persister };
