import Link from "next/link";

const Home = () => {
  const navigation = [
    {
      name: "پروژه ها",
      href: "/projects",
    },
    {
      name: "ارتباط با من",
      href: "/contactMe",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container flex min-h-screen flex-col items-center justify-between m-24">
        <div className="flex flex-row items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="mt-2">
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
