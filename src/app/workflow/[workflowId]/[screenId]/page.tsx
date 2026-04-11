import { notFound } from "next/navigation";

import { WorkflowChrome } from "@/components/workflow-chrome";
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

  const showFixedFooter =
    screen.kind !== "intro" &&
    screen.kind !== "closing" &&
    screen.kind !== "overview" &&
    !!screen.footer;
  const fixedFooter = showFixedFooter ? screen.footer : null;

  return (
    <WorkflowChrome workflow={workflow} footer={fixedFooter}>
      <WorkflowRenderer workflow={workflow} screen={screen} />
    </WorkflowChrome>
  );
}
