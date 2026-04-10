import { AttractScreen } from "@/components/attract-screen";
import { getDefaultWorkflow } from "@/lib/workflows";

export default function HomePage() {
  return <AttractScreen workflow={getDefaultWorkflow()} />;
}
