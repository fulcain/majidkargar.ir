import { Card } from "@/components/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-palette-primary px-2 text-sm rounded rotate-12 absolute">
        صفحه پیدا نشد!
      </div>
      <button className="mt-5">
        <Card>
          <Link
            href="/"
            className="relative inline-block text-sm font-medium text-palette-primary group focus:outline-none focus:ring"
          >
            <span className=" block px-8 py-3">برگشت به خانه</span>
          </Link>
        </Card>
      </button>
    </main>
  );
}
