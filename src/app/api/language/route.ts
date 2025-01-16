"use server";
import { cookies } from "next/headers";

const expireDate = () => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  return expirationDate;
};

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const { name, value } = await req.json();
  if (!name || !value) {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }
  cookieStore.set(name, value, { expires: expireDate() });
  return Response.json({ message: `Cookie ${name} set to ${value}` });
}

export async function GET() {
  const cookieStore = await cookies();
  const languageCookie = cookieStore.get("language");

  if (languageCookie) {
    return new Response(languageCookie.value);
  }

  const defaultLanguage = "fa";

  cookieStore.set("language", defaultLanguage, { expires: expireDate() });

  return new Response(defaultLanguage);
}
