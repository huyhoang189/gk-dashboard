import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  vi: {
    translation: {
      title: "Anti-DDoS",
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
      home: "Trang chủ",
      challenge_logs: "Danh sách truy cập đang bị chặn bởi Challenge",
      success_logs: "Danh sách truy cập thành công",
      create: "Thêm mới",
      update: "Cập nhật",
      delete: "Xoá",
      save: "Lưu và đồng bộ dữ liệu",
      name_system:
        "HỆ THỐNG PHÁT HIỆN, NGĂN CHẶN TẤN CÔNG DDOS TRÊN MÁY CHỦ ỨNG DỤNG WEB (ANTI-DDOS)",
      department_name: "Phát triển bởi Bộ Tư lệnh 86",
    },
  },
  en: {
    translation: {
      title: "Anti-DDoS",
      elks: "Traffic monitor",
      moniters: "Access monitor",
      challenges: "Challenges",
      success: "Success",
      ddoss: "DDOS Warning",
      configs: "Configuration",
      blacklists: "Blacklist",
      nginx: "Challenge Configuration",
      threshold: "Threshold Configuration",
      dnss: "DNS",
      emails: "Email",
      systems: "System Administration",
      sessions: "System Protected",
      databases: "Database Protected",
      histories: "System Logs",
      backups: "Database Backup",
      users: "Users Management",
      roles: "Roles Management",
      departments: "Departments Management",
      listens: "Behaviors Monitoring",
      reports: "Summaries and Reports",
      home: "Home",
      challenge_logs: "Challenge logs",
      success_logs: "Success logs",
      create: "Create",
      update: "Update",
      delete: "Delete",
      save: "Sava and sync data",
      name_system:
        "SYSTEM FOR DETECTING AND PREVENTING DDOS ATTACKS ON WEB APPLICATION SERVERS (ANTI-DDOS)",
      department_name: "Created by Command 86",
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
