import Link from "next/link";

import { KioskViewport } from "@/components/kiosk-viewport";
import {
  getWorkflowSelectionEntries,
  kioskAssets,
  type WorkflowSelectionEntry,
} from "@/lib/workflows";

function WorkflowSelectionCard({
  entry,
}: {
  entry: WorkflowSelectionEntry;
}) {
  const isActive = entry.status === "active";
  const content = (
    <div
      className={`group relative flex h-[228px] w-[540px] overflow-hidden rounded-[34px] border ${
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
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.04)_0%,rgba(8,8,10,0.1)_100%)]" />
          {isActive ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[154px] bg-[linear-gradient(180deg,rgba(8,8,10,0)_0%,rgba(8,8,10,0.14)_26%,rgba(8,8,10,0.54)_62%,rgba(8,8,10,0.9)_100%)]" />
          ) : null}
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(182,90,255,0.26),transparent_22%),linear-gradient(180deg,rgba(36,36,40,0.95)_0%,rgba(14,14,16,0.98)_100%)]" />
      )}

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-[28px]">
        <div className="flex items-start justify-between gap-[18px]">
          <div className="space-y-[8px]">
            <p className="text-[14px] font-medium uppercase tracking-[0.22em] text-white/55">
              Workflow
            </p>
            <h2 className="text-[38px] font-semibold leading-[1.02] text-white">
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
                Inaktiv
              </span>
            ) : null}
          </div>
        </div>

        <div className="space-y-[18px]">
          <p className="max-w-[360px] text-[20px] font-[300] leading-[1.3] text-white/88">
            {entry.subtitle}
          </p>

          {isActive ? (
            <div className="inline-flex items-center gap-[10px] rounded-full border border-white/14 bg-white/8 px-[18px] py-[10px] text-[15px] font-medium text-white">
              <span>Workflow öffnen</span>
              <span aria-hidden="true">→</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-[10px] rounded-full border border-white/12 bg-white/5 px-[18px] py-[10px] text-[15px] font-medium text-white/60">
              <span>Demnächst</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!isActive || !entry.startHref) {
    return content;
  }

  return (
    <Link href={entry.startHref} className="block focus:outline-none">
      {content}
    </Link>
  );
}

export function AdminSelectionScreen() {
  const entries = getWorkflowSelectionEntries();

  return (
    <KioskViewport>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.74)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(188,84,255,0.16),transparent_20%),radial-gradient(circle_at_82%_72%,rgba(70,146,255,0.1),transparent_24%)]" />

      <header className="absolute inset-x-0 top-[40px] z-10 flex items-center justify-between px-[60px]">
        <div className="flex items-center gap-[12px]">
          <img
            src={kioskAssets.shared.brandLogo}
            alt="Style3D"
            className="h-[38px] w-[146px]"
          />
        </div>
        <div className="flex items-center">
          <p className="text-[28px] font-medium leading-none tracking-[0.18em] text-white/58">
            ADMIN
          </p>
        </div>
      </header>

      <section className="absolute inset-x-0 top-[154px] z-10 flex flex-col items-center text-center">
        <h1 className="text-[58px] font-semibold leading-[1.02] text-white">
          Workflow Auswahl
        </h1>
        <p className="mt-[18px] max-w-[740px] text-[24px] font-[300] leading-[1.4] text-white/78">
          Wähle die passende Demo aus. Alle vier Showcase-Workflows sind jetzt
          live und können direkt gestartet werden.
        </p>
      </section>

      <section className="absolute inset-x-[154px] top-[356px] z-10">
        <div className="grid grid-cols-2 gap-x-[28px] gap-y-[28px]">
          {entries.map((entry) => (
            <WorkflowSelectionCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>
    </KioskViewport>
  );
}
