"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo } from "react";

import type { FooterConfig, Workflow, WorkflowScreen } from "@/lib/workflows";
import { useWorkflowLanguage } from "@/lib/workflow-language";
import { localizeScreen, localizeWorkflow } from "@/lib/workflow-localization";

type WorkflowChromeProps = {
  workflow: Workflow;
  screen: WorkflowScreen;
  footer?: FooterConfig | null;
  children: ReactNode;
};

export function WorkflowChrome({
  workflow,
  screen,
  footer,
  children,
}: WorkflowChromeProps) {
  const { language } = useWorkflowLanguage();
  const localizedWorkflow = useMemo(
    () => localizeWorkflow(workflow, language),
    [workflow, language],
  );
  const localizedScreen = useMemo(
    () => localizeScreen(workflow.id, screen, language),
    [workflow, screen, language],
  );
  const localizedFooter = footer
    ? {
        ...footer,
        label: localizedScreen.footer?.label ?? footer.label,
      }
    : null;

  return (
    <>
      <div
        className="workflow-chrome fixed left-0 top-0 z-[9999] flex w-full items-center justify-between gap-4 px-[60px] pt-[40px] text-white"
      >
        <Link
          href="/"
          aria-label="Open workflow selection"
          className="flex items-center gap-[12px]"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={localizedWorkflow.brandLogo}
              alt="Style3D"
              className="h-[38px] w-[146px]"
            />
          </div>
        </Link>

        <div
          className="flex min-w-0 items-center gap-[12px]"
        >
          <img
            src={localizedWorkflow.workflowIcon}
            alt=""
            className="h-[44.746px] w-[44px] shrink-0"
          />
          <span
            className="truncate text-[28px] font-medium leading-normal text-white"
          >
            {localizedWorkflow.title}
          </span>
        </div>
      </div>
      {localizedFooter ? (
        <div
          className="workflow-footer fixed bottom-0 left-0 z-[9999] w-full"
        >
          <div
            className="mx-auto flex w-[min(calc(100vw_-_100px),1340px)] items-center justify-between gap-5 pb-[50px]"
          >
            <span
              className="text-[28px] font-light leading-normal text-white"
            >
              {localizedFooter.label}
            </span>
            <div
              className="flex items-center gap-[12px] text-[28px] font-light leading-normal text-white"
            >
              <span>{localizedFooter.current}</span>
              <span
                className="block h-[2px] w-[165px] rounded-full bg-[#757575]"
              />
              <span>{localizedFooter.total}</span>
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </>
  );
}
