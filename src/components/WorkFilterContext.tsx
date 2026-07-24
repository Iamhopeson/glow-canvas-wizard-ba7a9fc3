import { createContext, useContext, useState, type ReactNode } from "react";
import type { ProjectFilter } from "@/content/site";

type Ctx = {
  filter: ProjectFilter;
  setFilter: (f: ProjectFilter) => void;
};

const WorkFilterContext = createContext<Ctx | null>(null);

export function WorkFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  return (
    <WorkFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </WorkFilterContext.Provider>
  );
}

export function useWorkFilter() {
  const ctx = useContext(WorkFilterContext);
  if (!ctx) throw new Error("useWorkFilter must be used inside WorkFilterProvider");
  return ctx;
}
