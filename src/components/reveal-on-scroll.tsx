import { useEffect, useRef, useState } from "react";

export const RevealOnScroll = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onWindScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY === 0) {
        // At the top of the page
        setIsVisible(false);
      } else if (scrollY >= 20) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", onWindScroll);
    return () => {
      window.removeEventListener("scroll", onWindScroll);
    };
  }, []);

  const classes = `transition-opacity duration-200
        ${isVisible ? "opacity-100" : "opacity-0"}`;

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};
