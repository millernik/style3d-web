"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";

import { AdminShortcutTrigger } from "@/components/admin-shortcut-trigger";
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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "40px 60px 0",
          pointerEvents: "none",
        }}
      >
        <AdminShortcutTrigger>
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
            style={{ height: "38px", width: "146px" }}
          />
          </div>
        </AdminShortcutTrigger>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            pointerEvents: "auto",
          }}
        >
          <img
            src={localizedWorkflow.workflowIcon}
            alt=""
            style={{ height: "44.746px", width: "44px" }}
          />
          <span
            style={{
              color: "white",
              fontSize: "28px",
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            {localizedWorkflow.title}
          </span>
        </div>
      </div>
      {localizedFooter ? (
        <div
          style={{
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "min(calc(100vw - 100px), 1340px)",
              margin: "0 auto",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "50px",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "28px",
                fontWeight: 300,
                lineHeight: "normal",
              }}
              >
              {localizedFooter.label}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "white",
                fontSize: "28px",
                fontWeight: 300,
                lineHeight: "normal",
              }}
            >
              <span>{localizedFooter.current}</span>
              <span
                style={{
                  display: "block",
                  width: "165px",
                  height: "2px",
                  borderRadius: "999px",
                  background: "#757575",
                }}
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
