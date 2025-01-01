export type ProjectType = {
  projectName: string;
  projectLiveLink: string;
  projectRepoLink: string;
  description: string;
  projectPath: string;
  projectType: string;
};

export const projects: ProjectType[] = [
  {
    projectName: "Personal Trainer",
    projectPath: "personal-trainer",
    projectLiveLink: "https://heydarifatemeh.ir",
    projectRepoLink: "https://github.com/Silverethical/gym-trainer-website",
    description: "پروژه ای برای معرفی مربی باشگاه که مربوط به کارفرما بود.",
    projectType: "special",
  },
  {
    projectName: "Tonrow",
    projectPath: "tonrow",
    projectLiveLink: "https://tonrow.ir",
    projectRepoLink: "https://tonrow.ir",
    description: `پروژه ای مربوط به شرکت برنامه نویسی وبلاین که برای کارفا درست شد. هدف پروژه مدیریت مالی و سفارشات پیک موتوری هست که درون اپلیکیشن بحث های حسابدار و استفاده از مپ و ... مورد استفاده قرار گرفته شده.`,
    projectType: "special",
  },
  {
    projectName: "Niro Saee",
    projectPath: "niro-saee",
    projectLiveLink: "https://niro-saee.vercel.app/",
    projectRepoLink: "https://niro-saee.vercel.app/",
    description:
      "پروژه معرفی یک شرکت متخصص در خدمات مهندسی، پیمانکاری و مشاوره و طراحی و اجرای پروژه‌های صنعتی.",
    projectType: "special",
  },
  {
    projectName: "SilverBox",
    projectPath: "silverbox",
    projectLiveLink: "https://silverBoxjs.ir",
    projectRepoLink: "https://github.com/silverethical/silverBox",
    description:
      "یک کتابخانه جاوا اسکریپت هست که وظیفه ساخت مودالو آلرت هارو داره که به صورت متن باز موجود هست.",
    projectType: "special",
  },
  {
    projectName: "Memory Game",
    projectPath: "memory-game",
    projectLiveLink: "https://fulcain.github.io/memory-game/",
    projectRepoLink: "https://github.com/fulcain/memory-game",
    description: "یک پروژه تمرینی برای تمرین کردن state در ری اکت.",
    projectType: "normal",
  },
  {
    projectName: "Invoker Trainer",
    projectPath: "invoker-trainer",
    projectLiveLink: "https://fulcain.github.io/invoker-trainer/",
    projectRepoLink: "https://github.com/fulcain/invoker-trainer",
    description: "یک پروژه تمرینی برای هیروی Invoker در بازی Dota2.",
    projectType: "normal",
  },
];

export const projectsName = () => {
  const names: string[] = [];
  projects.map((project) =>
    names.push(project.projectName.replaceAll(" ", "-").toLowerCase()),
  );

  return names;
};
