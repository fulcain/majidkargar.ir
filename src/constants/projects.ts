import { icons } from "./icons";

export type TechnologiesType = {
  name: string;
  icon: {
    className?: string;
    svgLink?: string;
    color: string;
  };
}[];

export type ProjectType = {
  projectName: string;
  liveLink?: string;
  repoLink?: string;
  description: string;
  urlPath: string;
  isSpecial: boolean;
  isPrivate: boolean;
  hasLiveLink: boolean;
  technologies: TechnologiesType;
  projectType: "work" | "personal";
};

export const projects: ProjectType[] = [
  {
    projectName: "وبسایت شخصی",
    liveLink: "https://majidkargar.ir",
    repoLink: "https://github.com/fulcain/majidkargar.ir",
    description: "پورتفولیو ای که الان دارید میبینید.",
    urlPath: "majidkargar.ir",
    isSpecial: false,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "personal",
    technologies: [
      {
        name: "TAILWIND",
        icon: {
          className: icons.TailwindCSS.className,
          color: icons.TailwindCSS.color,
        },
      },
      {
        name: "TYPESCRIPT",
        icon: {
          className: icons.TypeScript.className,
          color: icons.TypeScript.color,
        },
      },
      {
        name: "NEXT",
        icon: { className: icons.NextJS.className, color: icons.NextJS.color },
      },
      {
        name: "MUI",
        icon: { className: icons.MUI.className, color: icons.MUI.color },
      },
      {
        name: "VERCEL",
        icon: { className: icons.vercel.className, color: icons.vercel.color },
      },
      {
        name: "FRAMER",
        icon: { className: icons.framer.className, color: icons.framer.color },
      },
    ],
  },
  {
    projectName: "مربی باشگاه",
    liveLink: "https://heydarifatemeh.ir",
    repoLink: "https://github.com/Silverethical/gym-trainer-website",
    description: "پروژه ای برای معرفی مربی باشگاه که مربوط به کارفرما بود.",
    urlPath: "gym-trainer",
    isSpecial: true,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "work",
    technologies: [
      {
        name: "SASS",
        icon: { className: icons.SASS.className, color: icons.SASS.color },
      },
      {
        name: "TYPESCRIPT",
        icon: {
          className: icons.TypeScript.className,
          color: icons.TypeScript.color,
        },
      },
      {
        name: "REACT",
        icon: { className: icons.React.className, color: icons.React.color },
      },
      {
        name: "SWIPER",
        icon: { className: icons.swiper.className, color: icons.swiper.color },
      },
    ],
  },
  {
    projectName: "تنرو",
    description: `پروژه ای مربوط به شرکت برنامه نویسی وبلاین که برای کارفا درست شد. هدف پروژه مدیریت مالی و سفارشات پیک موتوری هست که درون اپلیکیشن بحث های حسابداری و استفاده از مپ و ... مورد استفاده قرار گرفته شده.`,
    urlPath: "tonrow",
    isSpecial: true,
    isPrivate: true,
    hasLiveLink: false,
    projectType: "work",
    technologies: [
      {
        name: "SASS",
        icon: { className: icons.SASS.className, color: icons.SASS.color },
      },
      {
        name: "EJS",
        icon: {
          svgLink: icons.ejs.svgLink,
          color: icons.ejs.color,
        },
      },
      {
        name: "CHART.JS",
        icon: { svgLink: icons.ChartJS.svgLink, color: icons.ChartJS.color },
      },
      {
        name: "JAVASCRIPT",
        icon: {
          className: icons.JavaScript.className,
          color: icons.JavaScript.color,
        },
      },
      {
        name: "ALPINE.JS",
        icon: {
          className: icons.alpineJS.className,
          color: icons.alpineJS.color,
        },
      },
    ],
  },
  {
    projectName: "نیرو ساعی",
    liveLink: "https://niro-saee.vercel.app/",
    description:
      "پروژه معرفی یک شرکت متخصص در خدمات مهندسی، پیمانکاری و مشاوره و طراحی و اجرای پروژه‌های صنعتی.",
    urlPath: "niro-saee",
    isSpecial: true,
    isPrivate: true,
    hasLiveLink: true,
    projectType: "work",
    technologies: [
      {
        name: "SASS",
        icon: { className: icons.SASS.className, color: icons.SASS.color },
      },
      {
        name: "TAILWIND",
        icon: {
          className: icons.TailwindCSS.className,
          color: icons.TailwindCSS.color,
        },
      },
      {
        name: "TYPESCRIPT",
        icon: {
          className: icons.TypeScript.className,
          color: icons.TypeScript.color,
        },
      },
      {
        name: "NEXT.JS",
        icon: { className: icons.NextJS.className, color: icons.NextJS.color },
      },
      {
        name: "SWIPER",
        icon: { className: icons.swiper.className, color: icons.swiper.color },
      },
      {
        name: "RADIX.UI",
        icon: { svgLink: icons.radixui.svgLink, color: icons.radixui.color },
      },
      {
        name: "LUCIDE",
        icon: { svgLink: icons.lucide.svgLink, color: icons.lucide.color },
      },
    ],
  },
  {
    projectName: "سیلورباکس",
    liveLink: "https://silverBoxjs.ir",
    repoLink: "https://github.com/silverethical/silverBox",
    description:
      "یک کتابخانه جاوا اسکریپت هست که وظیفه ساخت مودالو آلرت هارو داره که به صورت متن باز موجود هست.",
    urlPath: "silverbox",
    isSpecial: true,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "personal",
    technologies: [
      {
        name: "SASS",
        icon: { className: icons.SASS.className, color: icons.SASS.color },
      },
      {
        name: "JAVASCRIPT",
        icon: {
          className: icons.JavaScript.className,
          color: icons.JavaScript.color,
        },
      },
    ],
  },
];
