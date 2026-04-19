"use client";

import { motion } from "framer-motion";

import { useWorkflowLanguage, type WorkflowLanguage } from "@/lib/workflow-language";

const switchOptions: WorkflowLanguage[] = ["de", "en"];

export function WorkflowLanguageSwitch({
  className,
}: {
  className?: string;
}) {
  const { language, setLanguage } = useWorkflowLanguage();

  return (
    <div
      className={`inline-flex items-center gap-[8px] rounded-full border border-white/14 bg-white/[0.08] p-[6px] backdrop-blur-[16px] ${
        className ?? ""
      }`}
    >
      {switchOptions.map((option) => {
        const active = option === language;

        return (
          <motion.button
            key={option}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setLanguage(option)}
            className={`relative flex h-[38px] min-w-[74px] items-center justify-center rounded-full px-[16px] text-[15px] font-medium uppercase tracking-[0.08em] ${
              active
                ? "border-transparent text-white"
                : "border border-transparent bg-transparent text-white/74"
            }`}
          >
            {active ? (
              <>
                <span className="absolute inset-[-8px] rounded-full bg-kiosk-gradient blur-[24px] opacity-60" />
                <span className="absolute inset-0 rounded-full bg-kiosk-gradient" />
              </>
            ) : (
              <span className="absolute inset-0 rounded-full bg-white/[0.06]" />
            )}
            <span className="relative">{option}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
