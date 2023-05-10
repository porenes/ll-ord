import { UseQueryResult } from "@tanstack/react-query";

// helper function to determine if list of queries have all been fetched.
export function isEveryQueryFetched(queries: UseQueryResult<unknown, unknown>[]) {
  return queries.every((query) => query.isFetched)
}