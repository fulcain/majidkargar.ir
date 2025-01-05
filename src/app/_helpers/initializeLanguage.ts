export async function getLanguageCookie() {
  try {
    await fetch("/api/language", {
      method: "GET",
    });
  } catch (error) {
    console.error("Error setting language cookie:", error);
  }
}
