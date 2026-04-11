import { notFound } from "next/navigation";

import { WorkflowChrome } from "@/components/workflow-chrome";
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
    <WorkflowChrome workflow={workflow}>
      <WorkflowRenderer workflow={workflow} screen={screen} />
    </WorkflowChrome>
  );
}
