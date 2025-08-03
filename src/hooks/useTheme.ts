// import { useEffect, useRef } from 'react';
// import { useAppSelector, useAppDispatch } from '../store';
// import { setTheme } from '../store/slices/uiSlice';

// export const useTheme = () => {
//   const dispatch = useAppDispatch();
//   const theme = useAppSelector(state => state.ui.theme);
//   const isInitialThemeSet = useRef(false);

//   useEffect(() => {
//     // Prevent re-execution of initialization logic
//     if (isInitialThemeSet.current) {
//       return;
//     }

//     // Check for saved theme preference or default to light mode
//     const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

//     const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

//     if (initialTheme !== theme) {
//       dispatch(setTheme(initialTheme));
//     }

//     // Mark initial theme as set
//     isInitialThemeSet.current = true;
//   }, [dispatch, theme]);

//   useEffect(() => {
//     // Apply theme to document
//     const root = document.documentElement;

//     if (theme === 'dark') {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }

//     // Save theme preference
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   return theme;
// };

import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { setTheme } from "../store/slices/uiSlice";

type Theme = "light" | "dark";

export const useTheme = (): Theme => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const isInitialThemeSet = useRef(false);

  useEffect(() => {
    if (isInitialThemeSet.current) return;

    // SSR-safe check
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme: Theme =
        savedTheme || (prefersDark ? "dark" : "light");
      if (initialTheme !== theme) {
        dispatch(setTheme(initialTheme));
      }
    }
    isInitialThemeSet.current = true;
  }, [dispatch, theme]);

  useEffect(() => {
    // SSR-safe check
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return theme;
};
