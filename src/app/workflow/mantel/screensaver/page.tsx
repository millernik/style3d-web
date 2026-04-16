import { AttractScreen } from "@/components/attract-screen";
import { getWorkflow } from "@/lib/workflows";

export default function MantelScreensaverPage() {
  const workflow = getWorkflow("mantel");

  if (!workflow) {
    return null;
  }

  return <AttractScreen workflow={workflow} />;
}
