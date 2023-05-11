import z from "zod";

const Theme = z.union([z.literal("dark"), z.literal("light")]);

export function useTheme() {
  const params = new URLSearchParams(window.location.search);

  const parsed = Theme.safeParse(params.get("theme"));

  if (!parsed.success) {
    const themeFromStorage = Theme.safeParse(
      window.localStorage.getItem("ledger-live-theme")
    );
    if (themeFromStorage.success) return themeFromStorage.data;
    return "light";
  }

  window.localStorage.setItem("ledger-live-theme", parsed.data);

  return parsed.data;
}
