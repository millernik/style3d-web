import { notFound } from "next/navigation";

import { WorkflowRenderer } from "@/components/workflow-renderer";
import {
  getScreen,
  getScreenIds,
  getWorkflow,
  getWorkflowIds,
} from "@/lib/workflows";

export function generateStaticParams() {
  return getWorkflowIds().flatMap((workflowId) =>
    getScreenIds(workflowId).map((screenId) => ({
      workflowId,
      screenId,
    })),
  );
}

export default async function WorkflowScreenPage({
  params,
}: {
  params: Promise<{ workflowId: string; screenId: string }>;
}) {
  const { workflowId, screenId } = await params;
  const workflow = getWorkflow(workflowId);
  const screen = getScreen(workflowId, screenId);

  if (!workflow || !screen) {
    notFound();
  }

  const showFixedFooter = screen.kind === "sketch" && !!screen.footer;
  const fixedFooter = showFixedFooter ? screen.footer : null;

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
            src="/assets/shared/style3d-logo.svg"
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
            src="/assets/shared/workwear-mark.svg"
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
            AI for Workwear
          </span>
        </div>
      </div>
      {fixedFooter ? (
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
              {fixedFooter.label}
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
              <span>{fixedFooter.current}</span>
              <span
                style={{
                  display: "block",
                  width: "165px",
                  height: "2px",
                  borderRadius: "999px",
                  background: "#757575",
                }}
              />
              <span>{fixedFooter.total}</span>
            </div>
          </div>
        </div>
      ) : null}
      <WorkflowRenderer workflow={workflow} screen={screen} />
    </>
  );
}
