import { AttractScreen } from "@/components/attract-screen";
import { getWorkflow } from "@/lib/workflows";

export default function WorkwearScreensaverPage() {
  const workflow = getWorkflow("workwear");

  if (!workflow) {
    return null;
  }

  return <AttractScreen workflow={workflow} />;
}
