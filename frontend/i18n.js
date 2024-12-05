import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  vi: {
    translation: {
      title: "HỆ THỐNG PHÁT HIỆN, NGĂN CHẶN TẤN CÔNG DDOS - ANTI DDOS",
      elks: "Giám sát lưu lượng",
      moniters: "Giám sát truy cập",
      challenges: "Thử thách",
      success: "Thành công",
      ddoss: "Cảnh báo DDOS",
      configs: "Cấu hình",
      blacklists: "Danh sách đen",
      nginx: "Cấu hình Challenge",
      threshold: "Ngưỡng cảnh báo",
      dnss: "DNS",
      emails: "Email",
      systems: "Quản trị hệ thống",
      sessions: "Bảo mật hệ thống",
      databases: "Bảo mật cơ sở dữ liệu",
      histories: "Nhật ký hệ thống",
      backups: "Sao lưu dữ liệu",
      users: "Quản lý người dùng",
      roles: "Quản lý quyền",
      departments: "Quản lý đơn vị",
      listens: "Theo dõi hành vi",
      reports: "Tổng hợp, báo cáo",
    },
  },
  en: {
    translation: {
      title: "DETECTING AND PREVENTING DDOS ATTACKS SYSTEM - ANTI DDOS",
      elks: "Traffic monitor",
      moniters: "Access monitor",
      challenges: "Challenges",
      success: "Success",
      ddoss: "DDOS Warning",
      configs: "Configuration",
      blacklists: "Blacklist",
      nginx: "Challenge Configuration",
      threshold: "Warning Threshold",
      dnss: "DNS",
      emails: "Email",
      systems: "System Administration",
      sessions: "System Security",
      databases: "Database Security",
      histories: "System Logs",
      backups: "Data Backup",
      users: "User Management",
      roles: "Role Management",
      departments: "Department Management",
      listens: "Behavior Monitoring",
      reports: "Summaries and Reports",
    },
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user's language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: "vi", // Fallback to English if no language is detected
    debug: true, // Debug mode during development
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"], // Cache the selected language
    },
  });

export default i18n;
