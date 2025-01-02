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

export type ProjectType = {
  projectName: string;
  projectLiveLink: string;
  projectRepoLink: string;
  description: string;
  projectPath: string;
  projectType: string;
  isPrivate: boolean;
  hasLiveLink: boolean;
  technologies: TechnologiesType;
};

export const projects: ProjectType[] = [
  {
    projectName: "majidkargar.ir",
    projectPath: "majidkargar.ir",
    projectLiveLink: "https://majidkargar.ir",
    projectRepoLink: "https://majidkargar.ir",
    description: "پورتفولیو ای که الان دارید میبینید.",
    projectType: "special",
    isPrivate: true,
    hasLiveLink: true,
    technologies: [
      { name: "TAILWIND", icon: icons.TailwindCSS },
      { name: "TYPESCRIPT", icon: icons.TypeScript },
      {
        name: "NEXT",
        icon: icons.NextJS,
      },
      { name: "MUI", icon: icons.MUI },
      { name: "VERCEL", icon: icons.vercel },
      { name: "FRAMER", icon: icons.framer },
    ],
  },
  {
    projectName: "Personal Trainer",
    projectPath: "personal-trainer",
    projectLiveLink: "https://heydarifatemeh.ir",
    projectRepoLink: "https://github.com/Silverethical/gym-trainer-website",
    description: "پروژه ای برای معرفی مربی باشگاه که مربوط به کارفرما بود.",
    projectType: "special",
    isPrivate: false,
    hasLiveLink: true,
    technologies: [
      { name: "SASS", icon: icons.SASS },
      { name: "TYPESCRIPT", icon: icons.TypeScript },
      {
        name: "REACT",
        icon: icons.React,
      },
      { name: "SWIPER", icon: icons.swiper },
      { name: "VITE", icon: icons.vite },
    ],
  },
  {
    projectName: "Tonrow",
    projectPath: "tonrow",
    projectLiveLink: "https://tonrow.ir",
    projectRepoLink: "https://tonrow.ir",
    description: `پروژه ای مربوط به شرکت برنامه نویسی وبلاین که برای کارفا درست شد. هدف پروژه مدیریت مالی و سفارشات پیک موتوری هست که درون اپلیکیشن بحث های حسابداری و استفاده از مپ و ... مورد استفاده قرار گرفته شده.`,
    projectType: "special",
    isPrivate: true,
    hasLiveLink: false,
    technologies: [
      { name: "Sass", icon: icons.SASS },
      { name: "EJS", icon: icons.ejs },
      { name: "CHART.JS", icon: icons.ChartJS },
      { name: "JAVASCRIPT", icon: icons.JavaScript },
    ],
  },
  {
    projectName: "Niro Saee",
    projectPath: "niro-saee",
    projectLiveLink: "https://niro-saee.vercel.app/",
    projectRepoLink: "https://niro-saee.vercel.app/",
    description:
      "پروژه معرفی یک شرکت متخصص در خدمات مهندسی، پیمانکاری و مشاوره و طراحی و اجرای پروژه‌های صنعتی.",
    projectType: "special",
    isPrivate: true,
    hasLiveLink: true,
    technologies: [
      { name: "SASS", icon: icons.SASS },
      { name: "TAILWIND", icon: icons.TailwindCSS },
      { name: "TYPESCRIPT", icon: icons.TypeScript },
      {
        name: "NEXT.JS",
        icon: icons.NextJS,
      },
      { name: "SWIPER", icon: icons.swiper },
      { name: "RADIX.UI", icon: icons.radixui },
      { name: "LUCIDE", icon: icons.lucide },
    ],
  },
  {
    projectName: "SilverBox",
    projectPath: "silverbox",
    projectLiveLink: "https://silverBoxjs.ir",
    projectRepoLink: "https://github.com/silverethical/silverBox",
    description:
      "یک کتابخانه جاوا اسکریپت هست که وظیفه ساخت مودالو آلرت هارو داره که به صورت متن باز موجود هست.",
    projectType: "special",
    isPrivate: false,
    hasLiveLink: true,
    technologies: [
      { name: "SASS", icon: icons.SASS },
      { name: "JAVASCRIPT", icon: icons.JavaScript },
    ],
  },
  {
    projectName: "Memory Game",
    projectPath: "memory-game",
    projectLiveLink: "https://fulcain.github.io/memory-game/",
    projectRepoLink: "https://github.com/fulcain/memory-game",
    description: "یک پروژه تمرینی برای تمرین کردن state در ری اکت.",
    projectType: "normal",
    isPrivate: false,
    hasLiveLink: true,
    technologies: [
      { name: "SASS", icon: icons.SASS },
      { name: "JAVASCRIPT", icon: icons.JavaScript },
      {
        name: "REACT",
        icon: icons.React,
      },
    ],
  },
  {
    projectName: "Invoker Trainer",
    projectPath: "invoker-trainer",
    projectLiveLink: "https://fulcain.github.io/invoker-trainer/",
    projectRepoLink: "https://github.com/fulcain/invoker-trainer",
    description: "یک پروژه تمرینی برای هیروی Invoker در بازی Dota2.",
    projectType: "normal",
    isPrivate: false,
    hasLiveLink: true,
    technologies: [
      { name: "SASS", icon: icons.SASS },
      { name: "JAVASCRIPT", icon: icons.JavaScript },
      {
        name: "REACT",
        icon: icons.React,
      },
      {
        name: "MUI",
        icon: icons.MUI,
      },
    ],
  },
];

export const projectsName = () => {
  const names: string[] = [];
  projects.map((project) =>
    names.push(project.projectName.replaceAll(" ", "-").toLowerCase()),
  );

  return names;
};
