import { icons, IconKey } from "./icons";

export type TechnologiesType = {
  name: string;
  icon: {
    className?: string;
    svgLink?: string;
    color: string;
  };
}[];

export type ProjectType = {
  projectName: { en: string; fa: string };
  liveLink?: string;
  repoLink?: string;
  description: { en: string; fa: string };
  urlPath: string;
  isSpecial: boolean;
  isPrivate: boolean;
  hasLiveLink: boolean;
  technologies: TechnologiesType;
  projectType: "work" | "personal";
};

function tech(name: string, key: IconKey): TechnologiesType[number] {
  return { name, icon: icons[key] };
}

export const projects: ProjectType[] = [
  {
    projectName: { fa: "وبسایت شخصی", en: "Personal Website" },
    liveLink: "https://majidkargar.ir",
    repoLink: "https://github.com/fulcain/majidkargar.ir",
    description: {
      fa: "پورتفولیو ای که الان دارید میبینید.",
      en: "The portfolio you are currently viewing.",
    },
    urlPath: "portfolio",
    isSpecial: false,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "personal",
    technologies: [
      tech("TAILWIND", "TailwindCSS"),
      tech("TYPESCRIPT", "TypeScript"),
      tech("NEXT", "NextJS"),
      tech("MUI", "MUI"),
      tech("FRAMER", "framer"),
      // TODO: add dev icons
    ],
  },
  {
    projectName: { fa: "مربی باشگاه", en: "Gym Trainer" },
    liveLink: "https://heydarifatemeh.ir",
    repoLink: "https://github.com/Silverethical/gym-trainer-website",
    description: {
      fa: "پروژه ای برای معرفی مربی باشگاه که مربوط به کارفرما بود.",
      en: "A project to introduce a gym trainer, built for a client.",
    },
    urlPath: "gym-trainer",
    isSpecial: true,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "work",
    technologies: [
      tech("SASS", "SASS"),
      tech("TYPESCRIPT", "TypeScript"),
      tech("REACT", "React"),
      tech("SWIPER", "swiper"),
    ],
  },
  {
    projectName: { fa: "تنرو", en: "Tonrow" },
    description: {
      fa: `پروژه ای مربوط به شرکت برنامه نویسی وبلاین که برای کارفا درست شد. هدف پروژه مدیریت مالی و سفارشات پیک موتوری هست که درون اپلیکیشن بحث های حسابداری و استفاده از مپ و ... مورد استفاده قرار گرفته شده.`,
      en: "A project built for Webline software company for a client. The goal is to manage finances and motorcycle courier orders, featuring accounting modules and map integration.",
    },
    urlPath: "tonrow",
    isSpecial: true,
    isPrivate: true,
    hasLiveLink: false,
    projectType: "work",
    technologies: [
      tech("SASS", "SASS"),
      tech("EJS", "ejs"),
      tech("CHART.JS", "ChartJS"),
      tech("JAVASCRIPT", "JavaScript"),
      tech("ALPINE.JS", "alpineJS"),
    ],
  },
  {
    projectName: { fa: "نیرو ساعی", en: "Niro Saie" },
    liveLink: "https://niro-saie.vercel.app/",
    repoLink: "https://github.com/fulcain/niro-saie",
    description: {
      fa: "پروژه معرفی یک شرکت متخصص در خدمات مهندسی، پیمانکاری و مشاوره و طراحی و اجرای پروژه‌های صنعتی.",
      en: "A company introduction project specializing in engineering, contracting, consulting, and industrial project design and execution.",
    },
    urlPath: "niro-saie",
    isSpecial: true,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "work",
    technologies: [
      tech("SASS", "SASS"),
      tech("TAILWIND", "TailwindCSS"),
      tech("TYPESCRIPT", "TypeScript"),
      tech("NEXT.JS", "NextJS"),
      tech("SWIPER", "swiper"),
      tech("RADIX.UI", "radixui"),
      tech("LUCIDE", "lucide"),
    ],
  },
  {
    projectName: { fa: "سیلورباکس", en: "SilverBox" },
    liveLink: "https://silverBoxjs.ir",
    repoLink: "https://github.com/silverethical/silverBox",
    description: {
      fa: "یک کتابخانه جاوا اسکریپت هست که وظیفه ساخت مودالو آلرت هارو داره که به صورت متن باز موجود هست.",
      en: "An open source JavaScript library for creating modals and alerts.",
    },
    urlPath: "silverbox",
    isSpecial: true,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "personal",
    technologies: [tech("SASS", "SASS"), tech("JAVASCRIPT", "JavaScript")],
  },
  {
    projectName: { fa: "فاکتور فروش رمیونا", en: "Remiona Sales Invoice" },
    liveLink: "https://factor.remiona.ir/",
    repoLink: "https://github.com/Silverethical/online_invoice/",
    description: {
      fa: "این پروژه ابزاری حرفه‌ای برای صدور فاکتور فروشگاهی است که به‌صورت اختصاصی برای فروشگاه رمیونا طراحی و پیاده‌سازی شده است. این ابزار به فروشگاه کمک می‌کند تا فرآیند صدور فاکتور را سریع‌تر، دقیق‌تر و استانداردتر انجام داده و اطلاعات خرید مشتریان را به شکلی منظم ذخیره کند. (پروژه صرفا جهت استفاده در دسکتاپ است)",
      en: "A professional invoicing tool designed exclusively for Remiona store. It helps the store issue invoices faster, more accurately, and in a standardized way while storing customer purchase data in an organized manner. (Desktop only)",
    },
    urlPath: "remonia",
    isSpecial: true,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "work",
    technologies: [
      tech("TAILWIND", "TailwindCSS"),
      tech("TYPESCRIPT", "TypeScript"),
      tech("REACT", "React"),
      tech("MUI", "MUI"),
      tech("Ant Design", "antDesign"),
    ],
  },
  {
    projectName: {
      fa: "مدیریت فکشن‌ها | ECRP",
      en: "Legal Faction Management | ECRP",
    },
    liveLink: "",
    repoLink: "",
    description: {
      fa: "ابزاری برای مانیتورینگ لیدرهای فکشن‌های در ECRP که محاسبات ساعت کاری به صورت جداول برای هر لیدر، فعال‌ترین کاراکتر هر لیدر، فعال‌ترین لیدر ماه، هفته و ماه قبل و کلی محاسبات دیگه رو انجام میده تا کار رو راحت‌تر کنه. پروژه برای یه مشتری توی سرور Eclipse Roleplay هست.",
      en: "A tool that monitors legal faction leaders in ECRP, shows the work hours in tables for each leader, identifying the most active character per leader, the most active leader of the month, last month, last week, and many more calculations to simplify management. Built for a client in the Eclipse Roleplay server.",
    },
    urlPath: "lfm-ecrp",
    isSpecial: true,
    isPrivate: true,
    hasLiveLink: false,
    projectType: "work",
    technologies: [
      tech("TAILWIND", "TailwindCSS"),
      tech("TYPESCRIPT", "TypeScript"),
      tech("NEXT", "NextJS"),
      tech("FRAMER", "framer"),
      // TODO: Add supabase, ShadCN, Yup, Zustand
    ],
  },
  {
    projectName: {
      fa: "اپلیکیشن مدیریت فیلد ترینینگ | ECRP",
      en: "Field Training Dashboard | ECRP",
    },
    liveLink: "https://ecrp-ftd.vercel.app",
    repoLink: "https://github.com/fulcain/ECRP-FTD",
    description: {
      fa: "یک اپلیکیشن برای مدیریت و مانیتورینگ جلسات Field Training در فکشن LSEMS سرور Eclipse Roleplay (ECRP). این اپلیکیشن داده‌های مربوط به جلسات آموزشی را مستقیماً از Google Sheets دریافت کرده و آن‌ها را پردازش می‌کند تا بینش‌ها و آمارهای مفیدی تولید کند. این آنالیزها باعث می‌شوند پیگیری عملکرد اعضا و مدیریت فعالیت‌ها بسیار ساده‌تر و سریع‌تر انجام شود. این پروژه برای فکشن LSEMS در سرور Eclipse Roleplay توسعه داده شده و دسترسی به آن با سیستم رمز عبور محافظت می‌شود.",
      en: "A application designed to manage and monitor Field Training sessions in the Eclipse Roleplay (ECRP) server for LSEMS Faction. The app pulls training session data directly from Google Sheets and processes it to generate insights. These analytics make performance tracking and management significantly easier. The project was developed for the LSEMS Faction on the Eclipse Roleplay server and is protected with password-based access.",
    },
    urlPath: "ftd-ecrp",
    isSpecial: true,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "personal",
    technologies: [
      tech("TAILWIND", "TailwindCSS"),
      tech("TYPESCRIPT", "TypeScript"),
      tech("NEXT", "NextJS"),
      // TODO: Add Google Sheets, ShadCN
    ],
  },
  {
    projectName: {
      fa: "اپلیکیشن فکشن اورژانس | ECRP",
      en: "LSEMS App | ECRP",
    },
    liveLink: "https://ecrp-lsems.vercel.app/",
    repoLink: "http://github.com/fulcain/LSEMS-App",
    description: {
      en: "An application designed to simplify common LSEMS Faction tasks such as creating properly formatted emails, accessing important internal links, converting time zones, and adding availability times. The app is publicly accessible and can be used by anyone, however most of the internal links lead to private resources that are only accessible through the Eclipse Roleplay Government website if the user has the required permissions. The application was built to make day to day administrative and paperwork related tasks faster, easier, and more organized.",
      fa: "یک اپلیکیشن طراحی شده برای ساده‌تر کردن کارهای روزمره فکشن LSEMS مانند ساخت ایمیل‌ها با فرمت صحیح، دسترسی سریع به لینک‌های مهم، تبدیل تایم‌زون‌ها و اضافه کردن زمان‌های در دسترس بودن. این اپلیکیشن به صورت عمومی در دسترس است و همه می‌توانند از آن استفاده کنند، اما بیشتر لینک‌های داخلی آن به منابع خصوصی اشاره دارند که فقط در وبسایت Government سرور Eclipse Roleplay و در صورت داشتن دسترسی لازم قابل مشاهده هستند. این برنامه با هدف ساده‌تر، سریع‌تر و منظم‌تر کردن کارهای اداری روزمره ساخته شده است.",
    },
    urlPath: "lsems-ecrp",
    isSpecial: true,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "personal",
    technologies: [
      tech("TAILWIND", "TailwindCSS"),
      tech("TYPESCRIPT", "TypeScript"),
      tech("NEXT", "NextJS"),
      // TODO: Add ShadCN
    ],
  },
];
