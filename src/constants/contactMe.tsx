import { GitHub, Email, LinkedIn } from "@mui/icons-material";

export type ContactMeType = {
  name: string;
  href: string;
  text: string;
  icon: React.ReactNode;
};

export const contactMe: ContactMeType[] = [
  {
    name: "email",
    href: "mailto:majidkargar01@gmail.com",
    text: "majidkargar01@gmail.com",
    icon: <Email />,
  },
  {
    name: "github",
    href: "https://github.com/fulcain",
    text: "fulcain",
    icon: <GitHub />,
  },
  {
    name: "linkedIn",
    href: "https://www.linkedin.com/in/majid-kargar-994b642a6",
    text: "Majid Kargar",
    icon: <LinkedIn />,
  },
];
