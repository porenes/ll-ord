import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 minute cache by default
      staleTime: 300000,
      cacheTime: 300000,
    }
  }
});
export { queryClient };
