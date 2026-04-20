import type { ReactNode } from "react";

import { WorkwearInactivityWatcher } from "@/components/workwear-inactivity-watcher";

export default function WorkflowLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <WorkwearInactivityWatcher />
      {children}
    </>
  );
}
