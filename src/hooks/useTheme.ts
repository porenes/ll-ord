import qs from "query-string";
import z from "zod";

const Theme = z.union([z.literal("dark"), z.literal("light")]);

export function useTheme() {
  const { theme } = qs.parse(window.location.search);

  const parsed = Theme.safeParse(theme);

  if (!parsed.success) return "light";
  return parsed.data;
}
