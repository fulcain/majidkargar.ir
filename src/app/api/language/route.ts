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
  const hasLanguageCookie = cookieStore.has("language");
  const languageCookie = cookieStore.get("language");

  if (hasLanguageCookie) {
    return new Response(languageCookie?.value);
  } else {
    cookieStore.set("language", "fa", { expires: expireDate() });
  }

  return new Response("Hello, Next.js!");
}
