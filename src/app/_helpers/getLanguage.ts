export async function getLanguageCookie(): Promise<string | null> {
  try {
    const response = await fetch("/api/language", {
      method: "GET",
    });

    if (response.ok) {
      const language = await response.text();
      return language;
    } else {
      console.error("Failed to fetch language cookie:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching language cookie:", error);
    return null;
  }
}
