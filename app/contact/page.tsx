import { Navbar } from "@/components/navbar";
import { contactMe } from "@/constants/contactMe";
import ContactCard from "./contactCard";

const Contact = () => {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navbar />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {contactMe.map((item, idx) => (
            <ContactCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
