"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type WorkflowLanguage = "de" | "en";

const STORAGE_KEY = "style3d-workflow-language";

type WorkflowLanguageContextValue = {
  language: WorkflowLanguage;
  setLanguage: (language: WorkflowLanguage) => void;
  t: <T extends string>(value: Record<WorkflowLanguage, T>) => T;
};

const WorkflowLanguageContext = createContext<WorkflowLanguageContextValue | null>(
  null,
);

export function WorkflowLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<WorkflowLanguage>("de");

  useEffect(() => {
    const storedLanguage =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;

    if (storedLanguage === "de" || storedLanguage === "en") {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: <T extends string>(value: Record<WorkflowLanguage, T>) => value[language],
    }),
    [language],
  );

  return (
    <WorkflowLanguageContext.Provider value={value}>
      {children}
    </WorkflowLanguageContext.Provider>
  );
}

export function useWorkflowLanguage() {
  const context = useContext(WorkflowLanguageContext);

  if (!context) {
    throw new Error("useWorkflowLanguage must be used within WorkflowLanguageProvider");
  }

  return context;
}
