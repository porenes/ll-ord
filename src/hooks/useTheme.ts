import z from "zod";

const Theme = z.union([z.literal("dark"), z.literal("light")]);

export function useTheme() {
  const params = new URLSearchParams(window.location.search);

  const parsed = Theme.safeParse(params.get("theme"));

  if (!parsed.success) return "light";
  return parsed.data;
}
