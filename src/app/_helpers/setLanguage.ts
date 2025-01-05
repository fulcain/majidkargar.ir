export async function setLanguage(lang: "fa" | "en") {
  try {
    await fetch("/api/language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "language", value: lang }),
    });
  } catch (error) {
    console.error("Error setting language cookie:", error);
  }
}
