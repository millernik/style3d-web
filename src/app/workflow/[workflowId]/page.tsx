import { notFound } from "next/navigation";

import { WorkflowRenderer } from "@/components/workflow-renderer";
import {
  getStartScreen,
  getWorkflow,
  getWorkflowIds,
} from "@/lib/workflows";

export function generateStaticParams() {
  return getWorkflowIds().map((workflowId) => ({ workflowId }));
}

export default async function WorkflowIntroPage({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const { workflowId } = await params;
  const workflow = getWorkflow(workflowId);
  const screen = getStartScreen(workflowId);

  if (!workflow || !screen) {
    notFound();
  }

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
      <WorkflowRenderer workflow={workflow} screen={screen} />
    </>
  );
}
