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
    urlPath: "majidkargar.ir",
    isSpecial: false,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "personal",
    technologies: [
      tech("TAILWIND", "TailwindCSS"),
      tech("TYPESCRIPT", "TypeScript"),
      tech("NEXT", "NextJS"),
      tech("MUI", "MUI"),
      tech("VERCEL", "vercel"),
      tech("FRAMER", "framer"),
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
	// TODO: Add FTD-App | LSEMS Project
];
