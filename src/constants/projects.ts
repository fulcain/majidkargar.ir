const icons = {
  HTML5: "/icons/html5.svg",
  CSS3: "/icons/css3.svg",
  SASS: "/icons/sass.svg",
  TailwindCSS: "/icons/tailwindcss.svg",
  Bootstrap: "/icons/bootstrap.svg",
  JavaScript: "/icons/javascript.svg",
  TypeScript: "/icons/typescript.svg",
  MUI: "/icons/mui.svg",
  ChartJS: "/icons/chartjs.svg",
  React: "/icons/react.svg",
  NextJS: "/icons/nextjs.svg",
  Redux: "/icons/redux.svg",
  SocketIO: "/icons/socketio.svg",
  swiper: "/icons/swiper.svg",
  vite: "/icons/vite.svg",
  ejs: "/icons/ejs.svg",
  radixui: "/icons/radixui.svg",
  lucide: "/icons/lucide.svg",
  vercel: "/icons/vercel.svg",
  framer: "/icons/framer.svg",
};

export type TechnologiesType = {
  name: string;
  icon: string;
}[];

// TODO:: Add project type (Work) | (Personal)
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
      { name: "TAILWIND", icon: icons.TailwindCSS },
      { name: "TYPESCRIPT", icon: icons.TypeScript },
      { name: "NEXT", icon: icons.NextJS },
      { name: "MUI", icon: icons.MUI },
      { name: "VERCEL", icon: icons.vercel },
      { name: "FRAMER", icon: icons.framer },
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
      { name: "SASS", icon: icons.SASS },
      { name: "TYPESCRIPT", icon: icons.TypeScript },
      { name: "REACT", icon: icons.React },
      { name: "SWIPER", icon: icons.swiper },
      { name: "VITE", icon: icons.vite },
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
      { name: "Sass", icon: icons.SASS },
      { name: "EJS", icon: icons.ejs },
      { name: "CHART.JS", icon: icons.ChartJS },
      { name: "JAVASCRIPT", icon: icons.JavaScript },
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
      { name: "SASS", icon: icons.SASS },
      { name: "TAILWIND", icon: icons.TailwindCSS },
      { name: "TYPESCRIPT", icon: icons.TypeScript },
      { name: "NEXT.JS", icon: icons.NextJS },
      { name: "SWIPER", icon: icons.swiper },
      { name: "RADIX.UI", icon: icons.radixui },
      { name: "LUCIDE", icon: icons.lucide },
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
      { name: "SASS", icon: icons.SASS },
      { name: "JAVASCRIPT", icon: icons.JavaScript },
    ],
  },
  {
    projectName: "تمرین اینووکر",
    liveLink: "https://fulcain.github.io/invoker-trainer/",
    repoLink: "https://github.com/fulcain/invoker-trainer",
    description: "یک پروژه تمرینی برای هیروی Invoker در بازی Dota2.",
    urlPath: "invoker-trainer",
    isSpecial: false,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "personal",
    technologies: [
      { name: "SASS", icon: icons.SASS },
      { name: "JAVASCRIPT", icon: icons.JavaScript },
      { name: "REACT", icon: icons.React },
      { name: "MUI", icon: icons.MUI },
    ],
  },
];
