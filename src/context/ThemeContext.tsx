// import React, { createContext, useContext, useEffect, useState } from "react";

// type Theme = "light" | "dark";

// interface ThemeContextProps {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextProps>({
//   theme: "light",
//   toggleTheme: () => {},
// });

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [theme, setTheme] = useState<Theme>("light");

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Check system preference for first render
  const getInitialTheme = (): Theme => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedTheme = window.localStorage.getItem("theme") as Theme | null;
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }
      // System preference fallback
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }
    }
    return "light";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
