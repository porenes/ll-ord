export function safeJSONParse(data: string) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return undefined;
  }
}
