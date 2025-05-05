export function isLocal() {
  return import.meta.env.DEV && import.meta.env.MODE === "development";
}
