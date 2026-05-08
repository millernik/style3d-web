import { notFound } from "next/navigation";

import { AttractScreen } from "@/components/attract-screen";
import {
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

  if (!workflow) {
    notFound();
  }

  return <AttractScreen workflow={workflow} />;
}
