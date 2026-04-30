"use client";

import { useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  Activity,
  BarChart3,
  Bell,
  Boxes,
  CalendarClock,
  ChevronRight,
  CircleDollarSign,
  DatabaseZap,
  FileText,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  WalletCards
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Command", icon: LayoutDashboard, active: true },
  { label: "Revenue", icon: CircleDollarSign },
  { label: "Customers", icon: UsersRound },
  { label: "Pipeline", icon: Boxes },
  { label: "Security", icon: ShieldCheck },
  { label: "Reports", icon: FileText },
  { label: "Settings", icon: Settings }
];

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "accounts", label: "Accounts" },
  { id: "automation", label: "Automation" },
  { id: "risk", label: "Risk" }
] as const;

const metrics = [
  { label: "ARR", value: "$14.8M", delta: "+18.4%", icon: TrendingUp },
  { label: "Net retention", value: "126%", delta: "+4.1%", icon: Gauge },
  { label: "Active seats", value: "38,240", delta: "+2,906", icon: UsersRound },
  { label: "Gross margin", value: "82.6%", delta: "+1.8%", icon: WalletCards }
];

const accountRows = [
  ["Northstar Labs", "$1.2M", "Expansion", "98"],
  ["Helio Capital", "$860K", "Renewal", "92"],
  ["Orion Systems", "$740K", "Onboarding", "88"],
  ["Cobalt Works", "$510K", "At risk", "61"]
];

const tabCopy: Record<(typeof tabs)[number]["id"], string> = {
  overview: "Executive operating picture across revenue, retention, and customer health.",
  accounts: "Priority accounts ranked by expansion value, renewal timing, and engagement.",
  automation: "Revenue workflows, lifecycle triggers, and routing rules currently in flight.",
  risk: "Security posture, billing anomalies, and churn signals requiring review."
};

export function SaasDashboard() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("overview");
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 26, mass: 0.25 });

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f0e8]">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-50 h-px origin-left bg-[#d6b66a]"
      />

      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(214,182,106,0.09),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:100%_100%,72px_72px,72px_72px]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(214,182,106,0.14),transparent)]" />
      </div>

      <div className="relative flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-[#070707]/92 px-4 py-5 backdrop-blur-xl lg:block">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 px-2">
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#d6b66a]/35 bg-[#d6b66a]/10">
                <DatabaseZap className="h-5 w-5 text-[#d6b66a]" />
              </div>
              <div>
                <p className="font-[var(--font-display)] text-lg uppercase tracking-[0.12em]">Aurum Ops</p>
                <p className="text-xs uppercase tracking-[0.22em] text-[#9b9488]">Enterprise Suite</p>
              </div>
            </div>

            <nav aria-label="Primary" className="mt-8 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-[#a9a194] transition",
                      item.active
                        ? "border border-[#d6b66a]/25 bg-[#d6b66a]/10 text-[#f5f0e8]"
                        : "hover:bg-white/[0.045] hover:text-[#f5f0e8]"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", item.active && "text-[#d6b66a]")} />
                    <span>{item.label}</span>
                    {item.active ? <ChevronRight className="ml-auto h-4 w-4 text-[#d6b66a]" /> : null}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center gap-2 text-sm text-[#f5f0e8]">
                <LockKeyhole className="h-4 w-4 text-[#d6b66a]" />
                Vault synced
              </div>
              <p className="mt-2 text-xs leading-5 text-[#9b9488]">
                SOC controls, billing exports, and account signals are current.
              </p>
            </div>
          </div>
        </aside>

        <section className="w-full lg:pl-72">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050505]/82 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3 lg:hidden">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#d6b66a]/35 bg-[#d6b66a]/10">
                  <DatabaseZap className="h-5 w-5 text-[#d6b66a]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-[var(--font-display)] text-base uppercase tracking-[0.12em]">
                    Aurum Ops
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#9b9488]">Command</p>
                </div>
              </div>

              <label className="hidden min-w-80 max-w-md flex-1 items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-[#9b9488] lg:flex">
                <Search className="h-4 w-4" />
                <span>Search accounts, invoices, workflows</span>
              </label>

              <div className="ml-auto flex items-center gap-2">
                <button aria-label="Open activity" className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.035] text-[#d8cbb7] transition hover:border-[#d6b66a]/35 hover:text-[#f5f0e8]">
                  <Activity className="h-4 w-4" />
                </button>
                <button aria-label="Open notifications" className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.035] text-[#d8cbb7] transition hover:border-[#d6b66a]/35 hover:text-[#f5f0e8]">
                  <Bell className="h-4 w-4" />
                </button>
                <div className="hidden rounded-md border border-white/10 bg-[#14110d] px-3 py-2 text-sm text-[#f5f0e8] sm:block">
                  Dhruv
                </div>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-7xl"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#d6b66a]">Q4 operating room</p>
                  <h1 className="mt-3 font-[var(--font-display)] text-4xl uppercase leading-none tracking-normal text-[#f7f0e2] sm:text-5xl lg:text-6xl">
                    Revenue command
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-[#a9a194] sm:text-base">
                    A focused SaaS dashboard for executives tracking expansion, retention, and risk without leaving the operating view.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-[#f5f0e8] transition hover:border-[#d6b66a]/35">
                    <CalendarClock className="h-4 w-4 text-[#d6b66a]" />
                    This quarter
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-md bg-[#d6b66a] px-4 py-2 text-sm font-medium text-[#080704] transition hover:bg-[#ebca7d]">
                    <Sparkles className="h-4 w-4" />
                    Run forecast
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.article
                      key={metric.label}
                      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: reduced ? 0 : index * 0.06 }}
                      className="rounded-lg border border-white/10 bg-[#0b0a08]/86 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.32)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.22em] text-[#9b9488]">{metric.label}</span>
                        <Icon className="h-4 w-4 text-[#d6b66a]" />
                      </div>
                      <div className="mt-5 flex items-end justify-between gap-3">
                        <strong className="font-[var(--font-display)] text-3xl font-normal text-[#f7f0e2]">{metric.value}</strong>
                        <span className="rounded-md bg-[#244a36] px-2 py-1 text-xs text-[#a8f0c6]">{metric.delta}</span>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_0.85fr]">
                <section className="rounded-lg border border-white/10 bg-[#080807]/90 p-4 sm:p-5">
                  <div className="flex flex-col gap-4 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="font-[var(--font-display)] text-xl uppercase tracking-normal text-[#f7f0e2]">
                        Portfolio intelligence
                      </h2>
                      <p className="mt-1 text-sm text-[#9b9488]">{tabCopy[activeTab]}</p>
                    </div>
                    <div role="tablist" aria-label="Portfolio views" className="flex overflow-x-auto rounded-md border border-white/10 bg-white/[0.035] p-1">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          id={`${tab.id}-tab`}
                          role="tab"
                          aria-selected={activeTab === tab.id}
                          aria-controls={`${tab.id}-panel`}
                          tabIndex={activeTab === tab.id ? 0 : -1}
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "relative whitespace-nowrap rounded px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#d6b66a]/60",
                            activeTab === tab.id ? "text-[#080704]" : "text-[#bdb3a4] hover:text-[#f5f0e8]"
                          )}
                        >
                          {activeTab === tab.id ? (
                            <motion.span
                              layoutId="active-dashboard-tab"
                              className="absolute inset-0 rounded bg-[#d6b66a]"
                              transition={{ duration: 0.2 }}
                            />
                          ) : null}
                          <span className="relative">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    id={`${activeTab}-panel`}
                    role="tabpanel"
                    aria-labelledby={`${activeTab}-tab`}
                    className="pt-5"
                  >
                    <div className="grid gap-4 lg:grid-cols-[1fr_15rem]">
                      <div className="min-h-72 rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(214,182,106,0.08),rgba(255,255,255,0.02))] p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-xs uppercase tracking-[0.24em] text-[#9b9488]">Revenue curve</p>
                          <BarChart3 className="h-4 w-4 text-[#d6b66a]" />
                        </div>
                        <div className="mt-8 flex h-48 items-end gap-2">
                          {[48, 62, 56, 76, 70, 84, 92, 88, 104, 118, 126, 142].map((height, index) => (
                            <motion.div
                              key={height + index}
                              initial={{ height: 8 }}
                              animate={{ height }}
                              transition={{ duration: 0.55, delay: reduced ? 0 : index * 0.035 }}
                              className="flex-1 rounded-t bg-[linear-gradient(180deg,#d6b66a,#5f4a1d)]"
                            />
                          ))}
                        </div>
                        <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#766f65]">
                          <span>Jan</span>
                          <span>Apr</span>
                          <span>Jul</span>
                          <span>Oct</span>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        {["Forecast confidence", "Expansion motion", "Churn exposure"].map((label, index) => (
                          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#9b9488]">{label}</p>
                            <p className="mt-4 font-[var(--font-display)] text-3xl text-[#f7f0e2]">
                              {["94%", "$3.1M", "4.8%"][index]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <aside className="rounded-lg border border-white/10 bg-[#080807]/90 p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-[var(--font-display)] text-xl uppercase text-[#f7f0e2]">Signal queue</h2>
                      <p className="mt-1 text-sm text-[#9b9488]">Live account movements</p>
                    </div>
                    <button aria-label="More signal options" className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-[#bdb3a4]">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-5 space-y-3">
                    {accountRows.map(([name, value, stage, score]) => (
                      <div key={name} className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-[#f5f0e8]">{name}</p>
                            <p className="mt-1 text-xs text-[#9b9488]">{stage}</p>
                          </div>
                          <span className="text-sm text-[#d6b66a]">{value}</span>
                        </div>
                        <div className="mt-3 h-1.5 rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-[#d6b66a]" style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
