"use client";

import Link from "next/link";
import { useMemo } from "react";

import { KioskViewport } from "@/components/kiosk-viewport";
import { WorkflowLanguageSwitch } from "@/components/workflow-language-switch";
import {
  getWorkflowSelectionEntries,
  kioskAssets,
  type WorkflowSelectionEntry,
} from "@/lib/workflows";
import { useWorkflowLanguage } from "@/lib/workflow-language";
import {
  getCommonUiText,
  localizeWorkflowSelectionEntry,
} from "@/lib/workflow-localization";

function WorkflowSelectionCard({
  entry,
  language,
}: {
  entry: WorkflowSelectionEntry;
  language: "de" | "en";
}) {
  const isActive = entry.status === "active";
  const uiText = getCommonUiText(language);
  const content = (
    <div
      className={`group relative flex h-[228px] w-[540px] max-w-full overflow-hidden rounded-[34px] border max-sm:h-auto max-sm:min-h-[220px] max-sm:w-full max-sm:rounded-[24px] ${
        isActive
          ? "cursor-pointer border-white/16 bg-white/[0.06] shadow-[0_24px_64px_rgba(0,0,0,0.28)] transition duration-200 active:scale-[0.985]"
          : "border-white/10 bg-white/[0.03] opacity-60 grayscale-[0.12]"
      }`}
    >
      {entry.previewImage ? (
        <>
          <img
            src={entry.previewImage}
            alt=""
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${
              isActive ? "transition duration-300 group-hover:scale-[1.03]" : ""
            }`}
          />
          <div className="workflow-card-readable-overlay pointer-events-none absolute inset-0" />
          {isActive ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[174px] bg-[linear-gradient(180deg,rgba(8,8,10,0)_0%,rgba(8,8,10,0.18)_24%,rgba(8,8,10,0.62)_64%,rgba(8,8,10,0.92)_100%)]" />
          ) : null}
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(182,90,255,0.26),transparent_22%),linear-gradient(180deg,rgba(36,36,40,0.95)_0%,rgba(14,14,16,0.98)_100%)]" />
      )}

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-[clamp(22px,2vw,28px)]">
        <div className="flex items-start justify-between gap-[18px]">
          <div className="space-y-[8px]">
            <p className="text-[14px] font-medium uppercase tracking-[0.22em] text-white/55">
              {uiText.workflowEyebrow}
            </p>
            <h2 className="text-[clamp(31px,2.7vw,38px)] font-semibold leading-[1.02] text-white">
              {entry.title}
            </h2>
          </div>

          <div className="flex items-center gap-[10px]">
            {entry.workflowIcon ? (
              <img
                src={entry.workflowIcon}
                alt=""
                className="h-[34px] w-[34px] opacity-95"
              />
            ) : null}
            {!isActive ? (
                <span className="rounded-full border border-white/16 bg-white/8 px-[14px] py-[7px] text-[13px] font-medium uppercase tracking-[0.14em] text-white/72">
                  {uiText.inactive}
                </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-[clamp(10px,1.1vw,18px)]">
          <p className="max-w-[360px] text-[clamp(17px,1.45vw,20px)] font-[300] leading-[1.24] text-white/88">
            {entry.subtitle}
          </p>

          {isActive ? (
            <div className="inline-flex self-start items-center gap-[10px] rounded-full border border-white/14 bg-white/8 px-[18px] py-[clamp(8px,0.9vw,10px)] text-[15px] font-medium text-white">
              <span>{uiText.openWorkflow}</span>
              <span aria-hidden="true">→</span>
            </div>
          ) : (
            <div className="inline-flex self-start items-center gap-[10px] rounded-full border border-white/12 bg-white/5 px-[18px] py-[clamp(8px,0.9vw,10px)] text-[15px] font-medium text-white/60">
              <span>{uiText.comingSoon}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!isActive || !entry.startHref) {
    return content;
  }

  const href = `${entry.startHref}?lang=${language}`;

  return (
    <Link href={href} className="block focus:outline-none">
      {content}
    </Link>
  );
}

export function AdminSelectionScreen() {
  const { language } = useWorkflowLanguage();
  const uiText = getCommonUiText(language);
  const entries = useMemo(
    () =>
      getWorkflowSelectionEntries().map((entry) =>
        localizeWorkflowSelectionEntry(entry, language),
      ),
    [language],
  );

  return (
    <KioskViewport className="selection-viewport">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.74)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(188,84,255,0.16),transparent_20%),radial-gradient(circle_at_82%_72%,rgba(70,146,255,0.1),transparent_24%)]" />

      <header className="admin-header workflow-selection-header absolute inset-x-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          <img
            src={kioskAssets.shared.brandLogo}
            alt="Style3D"
            className="h-[38px] w-[146px]"
          />
        </div>
        <div className="flex items-center">
          <WorkflowLanguageSwitch />
        </div>
      </header>

      <section className="workflow-selection-heading absolute inset-x-0 z-10 flex flex-col items-center text-center">
        <h1 className="text-[58px] font-semibold leading-[1.02] text-white">
          {uiText.adminHeading}
        </h1>
      </section>

      <section className="admin-grid workflow-selection-grid absolute z-10">
        <div className="grid grid-cols-2 gap-x-[28px] gap-y-[28px]">
          {entries.map((entry) => (
            <WorkflowSelectionCard key={entry.id} entry={entry} language={language} />
          ))}
        </div>
      </section>
    </KioskViewport>
  );
}
