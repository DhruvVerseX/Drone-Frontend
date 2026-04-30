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

const raised =
  "bg-[#e9edf3] shadow-[11px_11px_24px_rgba(163,176,194,0.62),-11px_-11px_24px_rgba(255,255,255,0.96)]";
const pressed =
  "bg-[#e9edf3] shadow-[inset_7px_7px_14px_rgba(163,176,194,0.5),inset_-7px_-7px_14px_rgba(255,255,255,0.86)]";
const softButton =
  "bg-[#e9edf3] shadow-[6px_6px_13px_rgba(163,176,194,0.56),-6px_-6px_13px_rgba(255,255,255,0.94)]";

export function SaasDashboard() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("overview");
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 26, mass: 0.25 });

  return (
    <main className="min-h-screen bg-[#e9edf3] text-[#223044]">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-[#256fdb]"
      />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(37,111,219,0.12),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(19,156,111,0.1),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.55),rgba(211,219,231,0.45))]" />
      </div>

      <div className="relative flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-[#e9edf3] px-4 py-5 lg:block">
          <div className={cn("flex h-full flex-col rounded-lg p-4", raised)}>
            <div className="flex items-center gap-3">
              <div className={cn("grid h-11 w-11 place-items-center rounded-lg text-[#256fdb]", pressed)}>
                <DatabaseZap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-[var(--font-display)] text-lg uppercase tracking-[0.12em] text-[#223044]">
                  Aurum Ops
                </p>
                <p className="text-xs uppercase tracking-[0.22em] text-[#718096]">Enterprise Suite</p>
              </div>
            </div>

            <nav aria-label="Primary" className="mt-8 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition",
                      item.active
                        ? "bg-[#256fdb] text-white shadow-[7px_7px_15px_rgba(124,139,160,0.5),-7px_-7px_15px_rgba(255,255,255,0.95)]"
                        : "text-[#5d6b7d] hover:text-[#223044]",
                      !item.active && softButton
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.active ? <ChevronRight className="ml-auto h-4 w-4" /> : null}
                  </button>
                );
              })}
            </nav>

            <div className={cn("mt-auto rounded-lg p-4", pressed)}>
              <div className="flex items-center gap-2 text-sm font-medium text-[#223044]">
                <LockKeyhole className="h-4 w-4 text-[#256fdb]" />
                Vault synced
              </div>
              <p className="mt-2 text-xs leading-5 text-[#718096]">
                SOC controls, billing exports, and account signals are current.
              </p>
            </div>
          </div>
        </aside>

        <section className="w-full lg:pl-72">
          <header className="sticky top-0 z-30 bg-[#e9edf3]/82 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className={cn("flex items-center justify-between gap-4 rounded-lg px-3 py-2", raised)}>
              <div className="flex min-w-0 items-center gap-3 lg:hidden">
                <div className={cn("grid h-10 w-10 place-items-center rounded-lg text-[#256fdb]", pressed)}>
                  <DatabaseZap className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-[var(--font-display)] text-base uppercase tracking-[0.12em]">
                    Aurum Ops
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#718096]">Command</p>
                </div>
              </div>

              <label className={cn("hidden min-w-80 max-w-md flex-1 items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#718096] lg:flex", pressed)}>
                <Search className="h-4 w-4" />
                <span>Search accounts, invoices, workflows</span>
              </label>

              <div className="ml-auto flex items-center gap-2">
                <button aria-label="Open activity" className={cn("grid h-10 w-10 place-items-center rounded-lg text-[#526174] transition hover:text-[#256fdb]", softButton)}>
                  <Activity className="h-4 w-4" />
                </button>
                <button aria-label="Open notifications" className={cn("grid h-10 w-10 place-items-center rounded-lg text-[#526174] transition hover:text-[#256fdb]", softButton)}>
                  <Bell className="h-4 w-4" />
                </button>
                <div className={cn("hidden rounded-lg px-4 py-2 text-sm font-medium text-[#223044] sm:block", pressed)}>
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
                  <p className="text-xs uppercase tracking-[0.28em] text-[#256fdb]">Q4 operating room</p>
                  <h1 className="mt-3 font-[var(--font-display)] text-4xl uppercase leading-none tracking-normal text-[#223044] sm:text-5xl lg:text-6xl">
                    Revenue command
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-[#627084] sm:text-base">
                    A focused SaaS dashboard for executives tracking expansion, retention, and risk without leaving the operating view.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className={cn("inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-[#526174] transition hover:text-[#223044]", softButton)}>
                    <CalendarClock className="h-4 w-4 text-[#256fdb]" />
                    This quarter
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-lg bg-[#256fdb] px-4 py-3 text-sm font-medium text-white shadow-[8px_8px_17px_rgba(126,143,166,0.55),-8px_-8px_17px_rgba(255,255,255,0.96)] transition hover:bg-[#1f62c2]">
                    <Sparkles className="h-4 w-4" />
                    Run forecast
                  </button>
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.article
                      key={metric.label}
                      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: reduced ? 0 : index * 0.06 }}
                      className={cn("rounded-lg p-5", raised)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.22em] text-[#718096]">{metric.label}</span>
                        <span className={cn("grid h-9 w-9 place-items-center rounded-lg text-[#256fdb]", pressed)}>
                          <Icon className="h-4 w-4" />
                        </span>
                      </div>
                      <div className="mt-5 flex items-end justify-between gap-3">
                        <strong className="font-[var(--font-display)] text-3xl font-normal text-[#223044]">{metric.value}</strong>
                        <span className="rounded-md bg-[#d7f1e6] px-2 py-1 text-xs font-medium text-[#16724f] shadow-[inset_2px_2px_5px_rgba(107,149,127,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]">
                          {metric.delta}
                        </span>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_0.85fr]">
                <section className={cn("rounded-lg p-4 sm:p-5", raised)}>
                  <div className="flex flex-col gap-4 pb-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="font-[var(--font-display)] text-xl uppercase tracking-normal text-[#223044]">
                        Portfolio intelligence
                      </h2>
                      <p className="mt-1 text-sm text-[#718096]">{tabCopy[activeTab]}</p>
                    </div>
                    <div role="tablist" aria-label="Portfolio views" className={cn("flex overflow-x-auto rounded-lg p-1", pressed)}>
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
                            "relative whitespace-nowrap rounded-md px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#256fdb]/40",
                            activeTab === tab.id ? "text-white" : "text-[#64748b] hover:text-[#223044]"
                          )}
                        >
                          {activeTab === tab.id ? (
                            <motion.span
                              layoutId="active-dashboard-tab"
                              className="absolute inset-0 rounded-md bg-[#256fdb] shadow-[4px_4px_9px_rgba(124,139,160,0.42),-4px_-4px_9px_rgba(255,255,255,0.86)]"
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
                    className="pt-3"
                  >
                    <div className="grid gap-4 lg:grid-cols-[1fr_15rem]">
                      <div className={cn("min-h-72 rounded-lg p-4", pressed)}>
                        <div className="flex items-center justify-between">
                          <p className="text-xs uppercase tracking-[0.24em] text-[#718096]">Revenue curve</p>
                          <BarChart3 className="h-4 w-4 text-[#256fdb]" />
                        </div>
                        <div className="mt-8 flex h-48 items-end gap-2">
                          {[48, 62, 56, 76, 70, 84, 92, 88, 104, 118, 126, 142].map((height, index) => (
                            <motion.div
                              key={height + index}
                              initial={{ height: 8 }}
                              animate={{ height }}
                              transition={{ duration: 0.55, delay: reduced ? 0 : index * 0.035 }}
                              className="flex-1 rounded-t bg-[linear-gradient(180deg,#4f94f2,#256fdb)] shadow-[3px_3px_7px_rgba(125,142,166,0.45),-3px_-3px_7px_rgba(255,255,255,0.72)]"
                            />
                          ))}
                        </div>
                        <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#8a97a8]">
                          <span>Jan</span>
                          <span>Apr</span>
                          <span>Jul</span>
                          <span>Oct</span>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        {["Forecast confidence", "Expansion motion", "Churn exposure"].map((label, index) => (
                          <div key={label} className={cn("rounded-lg p-4", softButton)}>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#718096]">{label}</p>
                            <p className="mt-4 font-[var(--font-display)] text-3xl text-[#223044]">
                              {["94%", "$3.1M", "4.8%"][index]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <aside className={cn("rounded-lg p-4 sm:p-5", raised)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-[var(--font-display)] text-xl uppercase text-[#223044]">Signal queue</h2>
                      <p className="mt-1 text-sm text-[#718096]">Live account movements</p>
                    </div>
                    <button aria-label="More signal options" className={cn("grid h-9 w-9 place-items-center rounded-lg text-[#64748b]", softButton)}>
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-5 space-y-3">
                    {accountRows.map(([name, value, stage, score]) => (
                      <div key={name} className={cn("rounded-lg p-3", pressed)}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-[#223044]">{name}</p>
                            <p className="mt-1 text-xs text-[#718096]">{stage}</p>
                          </div>
                          <span className="text-sm font-medium text-[#256fdb]">{value}</span>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-[#dbe2eb] shadow-[inset_2px_2px_5px_rgba(141,156,178,0.38),inset_-2px_-2px_5px_rgba(255,255,255,0.82)]">
                          <div className="h-full rounded-full bg-[#256fdb]" style={{ width: `${score}%` }} />
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
