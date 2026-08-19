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

function techText(name: string, color: string): TechnologiesType[number] {
  return { name, icon: { color } };
}

export const projects: ProjectType[] = [
  {
    projectName: {
      fa: "منوساز",
      en: "Menu Saz",
    },
    liveLink: "https://menu-saz.ir",
    description: {
      fa: "پلتفرم SaaS برای ساخت منوی دیجیتال حرفه‌ای مخصوص کافه‌ها، رستوران‌ها، کافی‌شاپ‌ها و فست‌فودها. کاربران بدون نیاز به نصب اپلیکیشن، منوی آنلاین خود را با کد QR می‌سازند و با مشتریان به اشتراک می‌گذارند. شامل مدیریت منو، دسته‌بندی‌ها، قیمت‌ها و پنل کاربری است که با Next.js و Tailwind CSS ساخته شده.",
      en: "A SaaS platform for building professional digital menus for cafes, restaurants, coffee shops and fast food. Users create their online menu with a QR code and share it with customers with no app install required. Includes menu management, categories, pricing and a user panel built with Next.js and Tailwind CSS.",
    },
    urlPath: "menu-saz",
    isSpecial: true,
    isPrivate: true,
    hasLiveLink: true,
    projectType: "work",
    technologies: [
      tech("NEXT", "NextJS"),
      tech("TYPESCRIPT", "TypeScript"),
      tech("TAILWIND", "TailwindCSS"),
      tech("MONGODB", "MongoDB"),
      tech("VERCEL", "Vercel"),
      tech("SHADCN", "shadcn"),
      tech("GITHUB ACTIONS", "GitHubActions"),
    ],
  },
  {
    projectName: {
      fa: "ترکر فیلم",
      en: "Movie Tracker",
    },
    liveLink: "https://fulcain-movie-tracker.vercel.app",
    repoLink: "https://github.com/fulcain/move-tracker",
    description: {
      fa: "یک اپلیکیشن فول‌استک برای تماشای گروهی و خصوصی فیلم و سریال. کاربران حساب می‌سازند، از طریق کد اتاق به گروه‌های خصوصی دعوت می‌شوند و پیشرفت هر عضو را روی هر عنوان دنبال می‌کنند. احراز هویت با ایمیل/رمز (scrypt) و گوگل (OAuth)، دیتابیس MongoDB، به‌روزرسانی زنده، داشبورد مدیریت و پشتیبانی از چند پلتفرم شامل وب، اندروید (Capacitor) و دسکتاپ ویندوز (Electron) با CI/CD گیت‌هاب.",
      en: "A full-stack app for private watch parties: users create accounts, join invite-only parties via room codes and track every member's progress on movies and series. Features email/password (scrypt) and Google OAuth authentication, MongoDB persistence, live updates, an admin dashboard and multi-platform support: web, Android (Capacitor) and Windows desktop (Electron) with CI/CD via GitHub Actions.",
    },
    urlPath: "movie-tracker",
    isSpecial: true,
    isPrivate: true,
    hasLiveLink: true,
    projectType: "personal",
    technologies: [
      tech("NEXT", "NextJS"),
      tech("TYPESCRIPT", "TypeScript"),
      tech("TAILWIND", "TailwindCSS"),
      tech("MONGODB", "MongoDB"),
      tech("NODE.JS", "NodeJS"),
      tech("CAPACITOR", "Capacitor"),
      tech("ELECTRON", "Electron"),
      tech("GOOGLE OAUTH", "Google"),
      tech("SHADCN", "shadcn"),
      tech("LUCIDE", "lucide"),
      tech("GITHUB ACTIONS", "GitHubActions"),
    ],
  },
  {
    projectName: {
      fa: "مدیریت فکشن ها | ECRP",
      en: "Legal Faction Management | ECRP",
    },
    liveLink: "",
    repoLink: "",
    description: {
      fa: "ابزاری برای مانیتورینگ لیدرهای فکشن‌های قانونی در سرور ECRP که ساعت کاری هر لیدر را به‌صورت جدول محاسبه می‌کند، فعال‌ترین کاراکتر هر لیدر، فعال‌ترین لیدر ماه، هفته و ماه گذشته و بسیاری آمار دیگر را نمایش می‌دهد تا کارها ساده‌تر شود. این پروژه برای یک مشتری در سرور Eclipse Roleplay ساخته شده است. دارای داشبورد تحلیلی با نمودار، اعتبارسنجی فرم‌ها با Yup و مدیریت state با Zustand.",
      en: "A tool that monitors legal faction leaders in ECRP, showing work hours in tables for each leader, identifying the most active character per leader, the most active leader of the month, last week and last month, plus many more calculations. Built for a client on the Eclipse Roleplay server. Features an analytics dashboard with charts, Yup form validation and Zustand state management.",
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
      tech("SUPABASE", "Supabase"),
      tech("SHADCN", "shadcn"),
      techText("YUP", "#e02035"),
      techText("ZUSTAND", "#764ABC"),
    ],
  },
    {
    projectName: {
      fa: "فرانت چپتر ۱۴۰۳",
      en: "Front Chapter 2024",
    },
    liveLink: "https://frontchapter.ir/",
    repoLink: "https://github.com/frontchapter/nextjs/",
    description: {
      fa: "همکاری به‌عنوان توسعه‌دهنده فرانت‌اند در پروژه لندینگ همایش فرانت چپتر ۱۴۰۳. همکاری با یک تیم بزرگ‌تر، پیاده‌سازی کامپوننت‌های رابط کاربری و استایل‌دهی با Tailwind CSS.",
      en: "Worked as a frontend developer on the Front Chapter conference landing page in 2024. Collaborated within a larger team, implemented UI components and styled with Tailwind CSS.",
    },
    urlPath: "frontchapter03",
    isSpecial: true,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "work",
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
        name: "NEXT.JS",
        icon: { className: icons.NextJS.className, color: icons.NextJS.color },
      },
      {
        name: "LaunchUI",
        icon: { svgLink: icons.launchui.svgLink, color: icons.launchui.color },
      },
      {
        name: "LUCIDE",
        icon: { svgLink: icons.lucide.svgLink, color: icons.lucide.color },
      },
    ],
  },
    {
    projectName: { fa: "سیلورباکس", en: "SilverBox" },
    liveLink: "https://silverBoxjs.ir",
    repoLink: "https://github.com/silverethical/silverBox",
    description: {
      fa: "یک کتابخانه جاوااسکریپت متن‌باز و سبک (بدون وابستگی) برای ساخت مودال و هشدارهای قابل سفارشی‌سازی که به‌صورت پکیج npm منتشر شده و مستندات آنلاین دارد.",
      en: "An open source, lightweight zero-dependency JavaScript library for building customizable modals and alerts, published as an npm package with online documentation.",
    },
    urlPath: "silverbox",
    isSpecial: true,
    isPrivate: false,
    hasLiveLink: true,
    projectType: "personal",
    technologies: [
      tech("SASS", "SASS"),
      tech("JAVASCRIPT", "JavaScript"),
      tech("NPM", "NPM"),
    ],
  },
  {
    projectName: {
      fa: "اپلیکیشن فکشن اورژانس | ECRP",
      en: "LSEMS App | ECRP",
    },
    liveLink: "https://ecrp-lsems.vercel.app/",
    repoLink: "https://github.com/fulcain/ECRP-LSEMS",
    description: {
      en: "An application designed to simplify common LSEMS Faction tasks such as creating properly formatted emails, accessing important internal links, converting time zones, and adding availability times. Includes form validation with Formik + Yup, timezone conversion and a clean component library built on Radix UI. The app is publicly accessible and can be used by anyone, however most of the internal links lead to private resources that are only accessible through the Eclipse Roleplay Government website if the user has the required permissions.",
      fa: "اپلیکیشنی برای ساده‌تر کردن کارهای روزمره فکشن LSEMS؛ از ساخت ایمیل با فرمت درست و دسترسی سریع به لینک‌های مهم تا تبدیل تایم‌زون و ثبت زمان‌های حضور. دارای اعتبارسنجی فرم با Formik و Yup، تبدیل تایم‌زون و کامپوننت‌های ساخته‌شده با Radix UI. این اپلیکیشن به‌صورت عمومی در دسترس است و همه می‌توانند از آن استفاده کنند؛ اما بیشتر لینک‌های داخلی به منابع خصوصی اشاره دارند که فقط از طریق وب‌سایت Government سرور Eclipse Roleplay و با داشتن دسترسی لازم قابل مشاهده هستند.",
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
      tech("SHADCN", "shadcn"),
      techText("FORMIK", "#2563eb"),
      techText("YUP", "#e02035"),
      tech("LUCIDE", "lucide"),
    ],
  },
  {
    projectName: { fa: "وبسایت شخصی", en: "Personal Website" },
    liveLink: "https://majidkargar.ir",
    repoLink: "https://github.com/fulcain/majidkargar.ir",
    description: {
      fa: "پورتفولیویی که الان می‌بینید. یک وب‌سایت دو زبانه (فارسی/انگلیسی) با قابلیت تغییر زبان، طراحی واکنش‌گرا، انیمیشن‌ها و بهینه‌سازی سئو که با معماری App Router در Next.js ساخته و روی Vercel مستقر شده است.",
      en: "The portfolio you are currently viewing. A fully bilingual (EN/FA) website with language switching, responsive design, animations and SEO optimization, built on the Next.js App Router architecture and deployed on Vercel.",
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
      techText("NEXT-INTL (i18n)", "#ffffff"),
      tech("VERCEL", "Vercel"),
    ],
  },
  {
    projectName: { fa: "مربی باشگاه", en: "Gym Trainer" },
    liveLink: "https://heydarifatemeh.ir",
    repoLink: "https://github.com/Silverethical/gym-trainer-website",
    description: {
      fa: "پروژه‌ای سفارشی برای معرفی یک مربی باشگاه. شامل معرفی خدمات، برنامه‌های تمرینی، گالری و فرم تماس به‌همراه اسلایدرهای Swiper و طراحی کاملاً واکنش‌گرا.",
      en: "A client project introducing a gym trainer. Includes service showcase, training programs, gallery and a contact form with Swiper sliders and a fully responsive design.",
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
      tech("VITE", "Vite"),
      tech("SWIPER", "swiper"),
    ],
  },
  {
    projectName: { fa: "تنرو", en: "Tonrow" },
    description: {
      fa: `پروژه‌ای که در شرکت برنامه‌نویسی وبلاین برای مشتری کارفا توسعه داده شد. هدف آن مدیریت مالی و سفارش‌های پیک موتوری است و ماژول‌های حسابداری، نقشه و امکانات مرتبط را درون برنامه فراهم می‌کند. داشبورد تحلیلی با نمودارهای Chart.js و رابط کاربری ساخته‌شده با Alpine.js و قالب‌های EJS.`,
      en: "A project built for the Webline software company for a client. It manages finances and motorcycle courier orders, featuring accounting modules, map integration and an analytics dashboard with Chart.js, built with Alpine.js and EJS templates.",
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
      fa: "وب‌سایت شرکتی برای معرفی یک مجموعه متخصص در خدمات مهندسی، پیمانکاری، مشاوره و طراحی و اجرای پروژه‌های صنعتی. شامل صفحات خدمات، پروژه‌ها و تماس است و کاملاً واکنش‌گرا و بهینه‌شده برای موتورهای جستجو.",
      en: "A corporate website for a company specializing in engineering, contracting, consulting and industrial project design and execution. Features services, projects and contact pages, fully responsive and SEO-optimized.",
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
    projectName: { fa: "فاکتور فروش رمیونا", en: "Remiona Sales Invoice" },
    liveLink: "https://factor.remiona.ir/",
    repoLink: "https://github.com/Silverethical/online_invoice/",
    description: {
      fa: "ابزاری حرفه‌ای برای صدور فاکتور فروشگاهی که به‌صورت اختصاصی برای فروشگاه رمیونا طراحی و پیاده‌سازی شده است. این ابزار کمک می‌کند فرآیند صدور فاکتور سریع‌تر، دقیق‌تر و استانداردتر انجام شود و اطلاعات خرید مشتریان به‌صورت منظم ذخیره شود. (این پروژه صرفاً برای استفاده در دسکتاپ طراحی شده است.)",
      en: "A professional invoicing tool designed exclusively for the Remiona store. It helps the store issue invoices faster, more accurately and in a standardized way while storing customer purchase data in an organized manner. (Desktop only)",
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
      tech("SASS", "SASS"),
      tech("VITE", "Vite"),
      tech("MUI", "MUI"),
      tech("Ant Design", "antDesign"),
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
      fa: "اپلیکیشنی برای مدیریت و پایش جلسات Field Training در فکشن LSEMS سرور Eclipse Roleplay (ECRP). این برنامه داده‌های جلسات آموزشی را مستقیم از Google Sheets دریافت و پردازش می‌کند تا بینش و آمار مفیدی ارائه دهد. شامل جدول‌های تعاملی (TanStack Table)، داشبورد آماری و احراز هویت با رمز عبور است. این پروژه برای فکشن LSEMS در سرور Eclipse Roleplay توسعه یافته است.",
      en: "An application designed to manage and monitor Field Training sessions in the Eclipse Roleplay (ECRP) server for the LSEMS Faction. The app pulls training session data directly from the Google Sheets API and processes it to generate insights. Features interactive tables (TanStack Table), a statistics dashboard and Discord authentication. Developed for the LSEMS Faction on the Eclipse Roleplay server.",
    },
    urlPath: "ftd-ecrp",
    isSpecial: true,
    isPrivate: false,
    hasLiveLink: false,
    projectType: "work",
    technologies: [
      tech("TAILWIND", "TailwindCSS"),
      tech("TYPESCRIPT", "TypeScript"),
      tech("NEXT", "NextJS"),
      tech("GOOGLE SHEETS API", "Google"),
      tech("SHADCN", "shadcn"),
      techText("TANSTACK TABLE", "#FF4154"),
      tech("LUCIDE", "lucide"),
    ],
  },


];
