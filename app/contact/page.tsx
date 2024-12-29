import Navbar from "@/components/navbar/Navbar";
import { contactMe } from "@/constants/contactMe";
import ContactCard from "./ContactCard";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section className="mt-10">
        <div className="container">
          <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 md:mt-0 md:grid-cols-3 lg:gap-16">
            {contactMe.map((item, idx) => (
              <ContactCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
