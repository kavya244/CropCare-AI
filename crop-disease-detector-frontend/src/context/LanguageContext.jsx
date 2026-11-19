
import { createContext, useContext, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  en: {
    brand: "CropCare AI",
    home: "Home",
    detect: "Detect Disease",
    library: "Disease Library",
    about: "About",
    dashboard: "Dashboard",
    history: "Detection History",
    login: "Login",
    register: "Register",
    logout: "Logout",

    heroTitle: "Protect Your Crops with AI",
    heroText:
      "Upload a leaf image and explore possible crop diseases with AI-powered assistance.",
    start: "Detect Disease",
    learn: "Learn More",

    uploadTitle: "Upload Your Crop Image",
    uploadText: "Choose a clear image of an affected plant leaf.",
    choose: "Choose Image",
    analyze: "Analyze Image",
    analyzing: "Analyzing...",
    result: "Detection Result",

    voice: "Voice Assistant",
    listen: "Speak",
    stop: "Stop",

    healthy: "Healthy",
    demo: "Demo result",
    footer: "Helping farmers make informed crop-care decisions.",

    analysisTitle: "AI CROP ANALYSIS",
    uploadInstruction: "Upload a leaf image to start the detection process.",
    tips: "Tips for better results",
    tip1: "Take a clear photo of the affected leaf.",
    tip2: "Use natural lighting.",
    tip3: "Keep the leaf in focus.",
    tip4: "Avoid blurry or very dark photographs.",
    tip5: "Capture the entire affected area.",

    selectImage: "Please select a crop image first.",
    historyEmpty: "No detection history found.",
    confidence: "Confidence",
    recommendations: "Recommendations",
    delete: "Delete Record",

    aboutTitle: "Crop Disease Detector",
    aboutSubtitle: "An AI-powered approach to healthier crops.",
    aboutLabel: "ABOUT OUR PROJECT",
    aboutBannerTitle: "Technology for Better Crop Health",
    aboutBannerText:
      "Crop Disease Detector is designed to help farmers identify possible crop disease symptoms early using plant images and AI technology.",
    problemTitle: "Problem",
    problemText:
      "Late identification of fungal, bacterial and viral diseases can cause crop losses. Incorrect treatment can make the situation worse.",
    solutionTitle: "Our Solution",
    solutionText:
      "The system accepts a crop leaf image and uses image analysis to provide a possible disease prediction and guidance.",
    goalTitle: "Our Goal",
    goalText:
      "Make crop-health information easier to access through a simple website with English and Kannada voice assistance.",
    important: "Important:",
    disclaimer:
      "The detector is a decision-support tool. Its predictions should not replace expert diagnosis. Consult an agricultural officer before choosing treatments or applying chemicals."
  },

  kn: {
    brand: "ಕ್ರಾಪ್‌ಕೇರ್ AI",
    home: "ಮುಖಪುಟ",
    detect: "ರೋಗ ಪತ್ತೆ",
    library: "ರೋಗಗಳ ಮಾಹಿತಿ",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    dashboard: "ಮುಖ್ಯ ಫಲಕ",
    history: "ಪತ್ತೆಹಚ್ಚಿದ ರೋಗಗಳ ಇತಿಹಾಸ",
    login: "ಲಾಗಿನ್",
    register: "ನೋಂದಣಿ",
    logout: "ಲಾಗ್ ಔಟ್",

    heroTitle: "AI ಮೂಲಕ ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಿ",
    heroText:
      "ಸಸ್ಯದ ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಸಂಭವನೀಯ ಬೆಳೆ ರೋಗಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.",
    start: "ರೋಗ ಪತ್ತೆ ಮಾಡಿ",
    learn: "ಹೆಚ್ಚಿನ ಮಾಹಿತಿ",

    uploadTitle: "ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    uploadText: "ರೋಗದ ಲಕ್ಷಣವಿರುವ ಎಲೆಯ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    choose: "ಚಿತ್ರ ಆಯ್ಕೆಮಾಡಿ",
    analyze: "ಚಿತ್ರವನ್ನು ಪರಿಶೀಲಿಸಿ",
    analyzing: "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    result: "ಪರಿಶೀಲನೆಯ ಫಲಿತಾಂಶ",

    voice: "ಧ್ವನಿ ಸಹಾಯಕ",
    listen: "ಮಾತನಾಡಿ",
    stop: "ನಿಲ್ಲಿಸಿ",

    healthy: "ಆರೋಗ್ಯಕರ",
    demo: "ಪ್ರಾತ್ಯಕ್ಷಿಕೆ ಫಲಿತಾಂಶ",
    footer: "ರೈತರಿಗೆ ಬೆಳೆಗಳ ಆರೈಕೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡುವ ತಂತ್ರಜ್ಞಾನ.",

    analysisTitle: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಮೂಲಕ ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ",
    uploadInstruction: "ರೋಗ ಪತ್ತೆ ಮಾಡಲು ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    tips: "ಉತ್ತಮ ಫಲಿತಾಂಶಕ್ಕಾಗಿ ಸಲಹೆಗಳು",
    tip1: "ಬಾಧಿತ ಎಲೆಯ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.",
    tip2: "ನೈಸರ್ಗಿಕ ಬೆಳಕನ್ನು ಬಳಸಿ.",
    tip3: "ಎಲೆಯ ಮೇಲೆ ಕ್ಯಾಮೆರಾ ಗಮನವನ್ನು ಕೇಂದ್ರೀಕರಿಸಿ.",
    tip4: "ಮಸುಕಾದ ಅಥವಾ ತುಂಬಾ ಕತ್ತಲೆಯ ಚಿತ್ರಗಳನ್ನು ತಪ್ಪಿಸಿ.",
    tip5: "ಬಾಧಿತ ಭಾಗದ ಸಂಪೂರ್ಣ ಚಿತ್ರವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.",

    selectImage: "ದಯವಿಟ್ಟು ಮೊದಲು ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    historyEmpty: "ಯಾವುದೇ ರೋಗ ಪತ್ತೆ ಇತಿಹಾಸ ಕಂಡುಬಂದಿಲ್ಲ.",
    confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆ",
    recommendations: "ಶಿಫಾರಸುಗಳು",
    delete: "ದಾಖಲೆಯನ್ನು ಅಳಿಸಿ",

    aboutTitle: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ ವ್ಯವಸ್ಥೆ",
    aboutSubtitle: "ಆರೋಗ್ಯಕರ ಬೆಳೆಗಳಿಗಾಗಿ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ಪರಿಹಾರ.",
    aboutLabel: "ನಮ್ಮ ಯೋಜನೆಯ ಬಗ್ಗೆ",
    aboutBannerTitle: "ಉತ್ತಮ ಬೆಳೆ ಆರೋಗ್ಯಕ್ಕಾಗಿ ತಂತ್ರಜ್ಞಾನ",
    aboutBannerText:
      "ಬೆಳೆಗಳ ಚಿತ್ರಗಳು ಮತ್ತು ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸಿಕೊಂಡು ರೈತರು ಬೆಳೆ ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ಆರಂಭದಲ್ಲಿಯೇ ಗುರುತಿಸಲು ಈ ವ್ಯವಸ್ಥೆಯನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
    problemTitle: "ಸಮಸ್ಯೆ",
    problemText:
      "ಶಿಲೀಂಧ್ರ, ಬ್ಯಾಕ್ಟೀರಿಯಾ ಮತ್ತು ವೈರಸ್‌ಗಳಿಂದ ಉಂಟಾಗುವ ರೋಗಗಳನ್ನು ತಡವಾಗಿ ಗುರುತಿಸುವುದರಿಂದ ಬೆಳೆ ನಷ್ಟವಾಗಬಹುದು. ತಪ್ಪಾದ ಚಿಕಿತ್ಸೆಯು ಸಮಸ್ಯೆಯನ್ನು ಇನ್ನಷ್ಟು ಹೆಚ್ಚಿಸಬಹುದು.",
    solutionTitle: "ನಮ್ಮ ಪರಿಹಾರ",
    solutionText:
      "ಈ ವ್ಯವಸ್ಥೆಯು ಬೆಳೆ ಎಲೆಯ ಚಿತ್ರವನ್ನು ಸ್ವೀಕರಿಸಿ, ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆಯ ಮೂಲಕ ಸಂಭವನೀಯ ರೋಗವನ್ನು ಗುರುತಿಸಿ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.",
    goalTitle: "ನಮ್ಮ ಗುರಿ",
    goalText:
      "ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡ ಧ್ವನಿ ಸಹಾಯವಿರುವ ಸರಳ ವೆಬ್‌ಸೈಟ್ ಮೂಲಕ ಬೆಳೆ ಆರೋಗ್ಯದ ಮಾಹಿತಿಯನ್ನು ಸುಲಭವಾಗಿ ಪಡೆಯುವಂತೆ ಮಾಡುವುದು ನಮ್ಮ ಗುರಿಯಾಗಿದೆ.",
    important: "ಮುಖ್ಯ ಸೂಚನೆ:",
    disclaimer:
      "ಈ ರೋಗ ಪತ್ತೆ ವ್ಯವಸ್ಥೆಯು ನಿರ್ಧಾರಕ್ಕೆ ಸಹಾಯ ಮಾಡುವ ಸಾಧನವಾಗಿದೆ. ಇದರ ಮುನ್ಸೂಚನೆಗಳು ತಜ್ಞರ ರೋಗನಿರ್ಣಯಕ್ಕೆ ಪರ್ಯಾಯವಲ್ಲ. ಚಿಕಿತ್ಸೆ ಆಯ್ಕೆಮಾಡುವ ಮೊದಲು ಅಥವಾ ರಾಸಾಯನಿಕಗಳನ್ನು ಬಳಸುವ ಮೊದಲು ಕೃಷಿ ಅಧಿಕಾರಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ."
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const savedLanguage = localStorage.getItem("cropcare_language");
    return savedLanguage === "kn" ? "kn" : "en";
  });

  const setLanguage = (value) => {
    const nextLanguage = value === "kn" ? "kn" : "en";

    localStorage.setItem("cropcare_language", nextLanguage);
    setLanguageState(nextLanguage);
  };

  const t = (key) => {
    return (
      translations[language]?.[key] ??
      translations.en[key] ??
      key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
