import { AttractScreen } from "@/components/attract-screen";
import { getWorkflow } from "@/lib/workflows";

export default function NachtwaescheScreensaverPage() {
  const workflow = getWorkflow("nachtwaesche");

  if (!workflow) {
    return null;
  }

  return <AttractScreen workflow={workflow} />;
}
