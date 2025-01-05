import { cookies } from "next/headers";

export const dynamic = "force-static";

const cookieExpireDate = () => {
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 30);

  return currentDate;
};

export async function GET() {
  const cookieStore = await cookies();

  let language = cookieStore.get("language");

  if (!language) {
    cookieStore.set("language", "fa", { expires: cookieExpireDate() });
    language = { name: "language", value: "fa" };
  }
  return new Response(JSON.stringify({ language: language.value }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();

  try {
    const body = await request.json();
    const newLanguage: "fa" | "en" = body.language;

    if (newLanguage === "fa" || newLanguage === "en") {
      cookieStore.set("language", newLanguage, { expires: cookieExpireDate() });

      return new Response(
        JSON.stringify({ message: `Language set to ${newLanguage}` }),
        { headers: { "Content-Type": "application/json" } },
      );
    } else {
      return new Response(
        JSON.stringify({
          error: "Invalid language value provided. Must be 'fa' or 'en'.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request format" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
