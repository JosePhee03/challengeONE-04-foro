/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "primary-text": "var(--primary-text)",
        "primary-50": "var(--primary-50)",
        "primary-10": "var(--primary-10)",
        "primary-contrast": "var(--primary-contrast)",
        "error": "var(--error)",
        "error-text": "var(--error-text)",
        "error-50": "var(--error-50)",
        "error-10": "var(--error-10)",
        "error-contrast": "var(--error-contrast)",
        "success": "var(--success)",
        "success-text": "var(--success-text)",
        "success-50": "var(--success-50)",
        "success-10": "var(--success-10)",
        "success-contrast": "var(--success-contrast)",
        "contrast-100": "var(--contrast-100)",
        "contrast-90": "var(--contrast-90)",
        "contrast-80": "var(--contrast-80)",
        "contrast-70": "var(--contrast-70)",
        "contrast-60": "var(--contrast-60)",
        "contrast-50": "var(--contrast-50)",
        "contrast-40": "var(--contrast-40)",
        "contrast-30": "var(--contrast-30)",
        "contrast-20": "var(--contrast-20)",
        "contrast-10": "var(--contrast-10)",
        "contrast-5": "var(--contrast-5)",
        "heading": "var(--heading-text)",
        "body": "var(--body-text)",
        "secondary-text": "var(--secondary-text)",
        "tertiary-text": "var(--tertiary-text)",
        "disabled-text": "var(--disabled-text)",
        "icon-color": "var(--icon-color)",
        "base": "var(--base)",
      },
      fontSize: {
        md: "1rem"
      },
      boxShadow: {
        'M': '0 4px 18px -2px rgba(0, 0, 0, 0.3)',
      }
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"]
    },
  },
  plugins: [],
}

