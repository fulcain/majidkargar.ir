export type ProjectType = {
  projectName: string;
  projectLiveLink: string;
  projectRepoLink: string;
  description: string;
};

export const specialProjects: ProjectType[] = [
  {
    projectName: "Personal Trainer",
    projectLiveLink: "https://heydarifatemeh.ir",
    projectRepoLink: "https://github.com/Silverethical/gym-trainer-website",
    description: "پروژه ای برای معرفی مربی باشگاه که مربوط به کارفرما بود.",
  },
  {
    projectName: "Tonrow",
    projectLiveLink: "https://tonrow.ir",
    projectRepoLink: "https://tonrow.ir",
    description: `پروژه ای مربوط به شرکت برنامه نویسی وبلاین که برای کارفا درست شد. هدف پروژه مدیریت مالی و سفارشات پیک موتوری هست که درون اپلیکیشن بحث های حسابدار و استفاده از مپ و ... مورد استفاده قرار گرفته شده.`,
  },
  {
    projectName: "Niro Saee Derakhsh",
    projectLiveLink: "https://niro-saee.vercel.app/",
    projectRepoLink: "https://niro-saee.vercel.app/",
    description:
      "پروژه معرفی یک شرکت متخصص در خدمات مهندسی، پیمانکاری و مشاوره و طراحی و اجرای پروژه‌های صنعتی.",
  },
  {
    projectName: "SilverBox",
    projectLiveLink: "https://silverBoxjs.ir",
    projectRepoLink: "https://github.com/silverethical/silverBox",
    description:
      "یک کتابخانه جاوا اسکریپت هست که وظیفه ساخت مودالو آلرت هارو داره که به صورت متن باز موجود هست.",
  },
];

export const normalProjects: ProjectType[] = [
  {
    projectName: "Memory Game",
    projectLiveLink: "https://fulcain.github.io/memory-game/",
    projectRepoLink: "https://github.com/fulcain/memory-game",
    description: "یک پروژه تمرینی برای تمرین کردن state در ری اکت.",
  },
  {
    projectName: "Invoker Trainer",
    projectLiveLink: "https://fulcain.github.io/invoker-trainer/",
    projectRepoLink: "https://github.com/fulcain/invoker-trainer",
    description: "یک پروژه تمرینی برای هیروی Invoker در بازی Dota2.",
  },
];
