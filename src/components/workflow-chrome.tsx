import type { ReactNode } from "react";

import type { FooterConfig, Workflow } from "@/lib/workflows";

type WorkflowChromeProps = {
  workflow: Workflow;
  footer?: FooterConfig | null;
  children: ReactNode;
};

export function WorkflowChrome({
  workflow,
  footer,
  children,
}: WorkflowChromeProps) {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            pointerEvents: "auto",
          }}
        >
          <img
            src={workflow.brandLogo}
            alt="Style3D"
            style={{ height: "38px", width: "146px" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            pointerEvents: "auto",
          }}
        >
          <img
            src={workflow.workflowIcon}
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
            {workflow.title}
          </span>
        </div>
      </div>
      {footer ? (
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
              {footer.label}
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
              <span>{footer.current}</span>
              <span
                style={{
                  display: "block",
                  width: "165px",
                  height: "2px",
                  borderRadius: "999px",
                  background: "#757575",
                }}
              />
              <span>{footer.total}</span>
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </>
  );
}
