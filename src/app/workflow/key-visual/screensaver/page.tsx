import { AttractScreen } from "@/components/attract-screen";
import { getWorkflow } from "@/lib/workflows";

export default function KeyVisualScreensaverPage() {
  const workflow = getWorkflow("key-visual");

  if (!workflow) {
    return null;
  }

  return <AttractScreen workflow={workflow} />;
}
