import Navbar from "@/components/navbar/Navbar";
import ContactCard from "./ContactCard";
import { contactMe } from "@/constants/contactMe";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section>
        <div className="container">
          <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 md:mt-0 md:grid-cols-3 lg:gap-16">
            {contactMe.map((item) => (
              <ContactCard item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
