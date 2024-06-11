// src/i18n.ts

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Home": "Home",
      "Dashboard": "Dashboard",
      "My Gigs": "My Gigs",
      "Messages": "Messages",
      "Contact Us": "Contact Us",
      "Logout": "Logout",
      "Register": "Register",
      "Login": "Login",
      "Welcome Back,": "Welcome Back,"
      // Add other translations here...
    }
  },
  fr: {
    translation: {
      "Home": "Accueil",
      "Dashboard": "Tableau de bord",
      "My Gigs": "Mes concerts",
      "Messages": "Messages",
      "Contact Us": "Contactez-nous",
      "Logout": "Se déconnecter",
      "Register": "S'inscrire",
      "Login": "Se connecter",
      "Welcome Back,": "Bon retour,"
      // Add other translations here...
    }
  },
  // Add more languages here...
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;