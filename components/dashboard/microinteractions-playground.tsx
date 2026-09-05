"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import {
  ArrowUpDown,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  CircleDot,
  Command,
  Copy,
  Database,
  Droplet,
  Eye,
  Gauge,
  Layers3,
  Loader2,
  Mail,
  MousePointer2,
  PanelLeft,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Stars,
  Table2,
  TimerReset,
  TrendingUp,
  UserPlus,
  WandSparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const accent = "#d6b66a";

const navItems = [
  { label: "Hero", href: "#hero", icon: Sparkles },
  { label: "Tabs", href: "#tabs", icon: PanelLeft },
  { label: "Cards", href: "#cards", icon: Layers3 },
  { label: "Stats", href: "#stats", icon: BarChart3 },
  { label: "Table", href: "#table", icon: Table2 },
  { label: "Form", href: "#form", icon: Mail },
  { label: "Modal", href: "#modal", icon: MousePointer2 },
  { label: "Scroll", href: "#scroll", icon: TimerReset },
  { label: "Controls", href: "#controls", icon: SlidersHorizontal },
  { label: "Accordion", href: "#accordion", icon: ChevronDown },
  { label: "Empty", href: "#empty", icon: Database },
  { label: "CTA", href: "#cta", icon: Rocket },
];

const tabs = [
  {
    id: "motion",
    label: "Motion",
    text: "Underline follows focus, then content settles with a short premium fade.",
  },
  {
    id: "feedback",
    label: "Feedback",
    text: "Hover, press, and active states stay tactile without noisy movement.",
  },
  {
    id: "access",
    label: "Access",
    text: "Arrow keys switch panels, focus rings stay visible, and roles remain explicit.",
  },
] as const;

const cardItems = [
  {
    title: "Hover Lift",
    icon: WandSparkles,
    copy: "Moves 4px, deepens shadow, scales to 1.02.",
  },
  {
    title: "Icon Response",
    icon: Gauge,
    copy: "Icon tint and rotation respond to the parent card.",
  },
  {
    title: "Glow Edge",
    icon: ShieldCheck,
    copy: "A restrained accent line appears only on intent.",
  },
];

const statItems = [
  { label: "Interactions", value: 12840, suffix: "", trend: "+18%" },
  { label: "Completion", value: 96, suffix: "%", trend: "+7%" },
  { label: "Latency", value: 112, suffix: "ms", trend: "-24%" },
  { label: "Satisfaction", value: 89, suffix: "%", trend: "+11%" },
];

const tableRows = [
  { name: "CTA glow", type: "Button", status: "Live", score: 98 },
  { name: "Row hover", type: "Table", status: "Live", score: 92 },
  { name: "Focus ring", type: "Form", status: "Review", score: 86 },
  { name: "Modal trap", type: "Overlay", status: "Live", score: 94 },
];

const scrollSteps = ["Observe", "Anticipate", "Respond", "Settle"];

const controlItems = [
  "Reduced latency alerts",
  "Hover preview traces",
  "Success pulse on save",
];

const segmentOptions = ["Quiet", "Balanced", "Expressive"];

const reorderItems = [
  "Hover feedback",
  "Focus states",
  "Loading skeleton",
  "Toast message",
];

function Button({
  children,
  variant = "primary",
  className,
  ...props
}: HTMLMotionProps<"button"> & {
  variant?: "primary" | "ghost";
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ duration: 0.14, ease: "easeOut" }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-[#d6b66a]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]",
        variant === "primary"
          ? "bg-[#d6b66a] text-[#090806] shadow-[0_0_0_1px_rgba(214,182,106,0.32),0_18px_48px_rgba(214,182,106,0.18)] hover:shadow-[0_0_0_1px_rgba(214,182,106,0.55),0_24px_70px_rgba(214,182,106,0.26)]"
          : "border border-white/10 bg-white/[0.045] text-[#f7f0e2] hover:border-[#d6b66a]/35 hover:bg-white/[0.07]",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function Card({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-[#0b0a08]/88 shadow-[0_24px_70px_rgba(0,0,0,0.36)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function RevealSection({
  children,
  className,
  ...props
}: HTMLMotionProps<"section"> & { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0, y: reduced ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs uppercase tracking-[0.28em] text-[#d6b66a]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-[var(--font-display)] text-2xl uppercase tracking-normal text-[#f7f0e2] sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#a9a194]">{copy}</p>
    </div>
  );
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setCount(value);
      return;
    }

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, value]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

function AccessibleTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("motion");
  const activeIndex = tabs.findIndex((tab) => tab.id === active);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : event.key === "ArrowRight"
            ? (activeIndex + 1) % tabs.length
            : (activeIndex - 1 + tabs.length) % tabs.length;
    setActive(tabs[nextIndex].id);
    document.getElementById(`${tabs[nextIndex].id}-tab`)?.focus();
  }

  return (
    <RevealSection id="tabs">
      <Card className="p-5">
        <SectionHeader
          eyebrow="03 / Tabs Section"
          title="Keyboard tabs with a measured underline"
          copy="The tab strip uses semantic roles, arrow-key navigation, and a smooth panel transition."
        />
        <div
          role="tablist"
          aria-label="Microinteraction categories"
          onKeyDown={onKeyDown}
          className="flex border-b border-white/10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`${tab.id}-tab`}
              role="tab"
              aria-selected={active === tab.id}
              aria-controls={`${tab.id}-panel`}
              tabIndex={active === tab.id ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative px-4 py-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#d6b66a]/70",
                active === tab.id
                  ? "text-[#f7f0e2]"
                  : "text-[#9b9488] hover:text-[#f7f0e2]",
              )}
            >
              {tab.label}
              {active === tab.id ? (
                <motion.span
                  layoutId="tab-line"
                  className="absolute inset-x-3 bottom-0 h-px bg-[#d6b66a]"
                />
              ) : null}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`${active}-panel`}
            role="tabpanel"
            aria-labelledby={`${active}-tab`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="min-h-28 py-6 text-sm leading-6 text-[#d8cbb7]"
          >
            {tabs.find((tab) => tab.id === active)?.text}
          </motion.div>
        </AnimatePresence>
      </Card>
    </RevealSection>
  );
}

function PlaygroundModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/55 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-lg border border-white/10 bg-[#0b0a08] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.55)] outline-none"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#d6b66a]">
                  08 / Modal
                </p>
                <h3
                  id="modal-title"
                  className="mt-2 font-[var(--font-display)] text-2xl uppercase text-[#f7f0e2]"
                >
                  Focus stays here
                </h3>
              </div>
              <button
                aria-label="Close modal"
                onClick={onClose}
                className="rounded-md p-2 text-[#9b9488] transition hover:bg-white/10 hover:text-[#f7f0e2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b66a]/70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#a9a194]">
              The overlay fades, backdrop blurs, Escape closes it, and Tab
              cycles through available actions.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onClose}>
                Confirm <Check className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DataTable() {
  const [sortAsc, setSortAsc] = useState(false);
  const [loading, setLoading] = useState(false);
  const rows = useMemo(
    () =>
      [...tableRows].sort((a, b) =>
        sortAsc ? a.score - b.score : b.score - a.score,
      ),
    [sortAsc],
  );

  function toggleLoading() {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 900);
  }

  return (
    <Card id="table" className="p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <SectionHeader
          eyebrow="06 / Data Table"
          title="Rows react without stealing attention"
          copy="Sort animation, row hover, and a temporary skeleton state demonstrate table feedback."
        />
        <Button variant="ghost" onClick={toggleLoading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Database className="h-4 w-4" />
          )}
          Reload
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.2em] text-[#766f65]">
            <tr>
              <th className="py-3">Interaction</th>
              <th>Pattern</th>
              <th>Status</th>
              <th>
                <button
                  onClick={() => setSortAsc((value) => !value)}
                  className="inline-flex items-center gap-2 rounded px-2 py-1 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b66a]/70"
                >
                  Score
                  <motion.span
                    animate={{ rotate: sortAsc ? 180 : 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </motion.span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td colSpan={4} className="py-3">
                      <div className="h-8 animate-pulse rounded-md bg-white/[0.07]" />
                    </td>
                  </tr>
                ))
              : rows.map((row) => (
                  <motion.tr
                    key={row.name}
                    layout
                    className="group border-t border-white/10 transition hover:bg-[#d6b66a]/[0.055]"
                  >
                    <td className="py-4 text-[#f7f0e2]">{row.name}</td>
                    <td className="text-[#a9a194]">{row.type}</td>
                    <td>
                      <span className="rounded-md border border-white/10 px-2 py-1 text-xs text-[#d8cbb7]">
                        {row.status}
                      </span>
                    </td>
                    <td className="text-[#d6b66a]">{row.score}</td>
                  </motion.tr>
                ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function FormSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const valid = /\S+@\S+\.\S+/.test(email);
  const showError = email.length > 0 && !valid;

  return (
    <Card id="form" className="p-5">
      <SectionHeader
        eyebrow="07 / Form Section"
        title="Validation speaks softly"
        copy="Focus states, inline validation, and success feedback are present without becoming theatrical."
      />
      <form
        className="grid gap-4 md:grid-cols-[1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(valid);
        }}
      >
        <label className="block">
          <span className="text-sm text-[#d8cbb7]">Team email</span>
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setSubmitted(false);
            }}
            placeholder="ops@company.com"
            aria-invalid={showError}
            aria-describedby="email-feedback"
            className={cn(
              "mt-2 w-full rounded-md border bg-black/20 px-4 py-3 text-sm text-[#f7f0e2] outline-none transition placeholder:text-[#766f65] focus:border-[#d6b66a] focus:shadow-[0_0_0_3px_rgba(214,182,106,0.16)]",
              showError ? "border-[#d6b66a]" : "border-white/10",
            )}
          />
        </label>
        <Button type="submit" className="self-end">
          <Send className="h-4 w-4" /> Send invite
        </Button>
      </form>
      <p
        id="email-feedback"
        aria-live="polite"
        className={cn(
          "mt-3 text-sm transition",
          showError
            ? "text-[#d6b66a]"
            : submitted
              ? "text-[#d6b66a]"
              : "text-[#766f65]",
        )}
      >
        {showError
          ? "Enter a valid work email."
          : submitted
            ? "Invite staged successfully."
            : "Feedback appears as soon as the field has enough signal."}
      </p>
    </Card>
  );
}

function ScrollChoreography() {
  return (
    <RevealSection id="scroll">
      <Card className="overflow-hidden p-5">
        <SectionHeader
          eyebrow="12 / Scroll Choreography"
          title="Sections reveal with staged depth"
          copy="Cards enter on scroll, the timeline marker progresses, and each step has a tiny secondary motion."
        />
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="relative pl-7">
              <span className="absolute bottom-2 left-2 top-2 w-px bg-white/10" />
              {scrollSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="relative pb-6 last:pb-0"
                >
                  <span className="absolute -left-[1.68rem] top-0 grid h-5 w-5 place-items-center rounded-full border border-[#d6b66a]/40 bg-[#0b0a08]">
                    <CircleDot className="h-3 w-3 text-[#d6b66a]" />
                  </span>
                  <p className="font-[var(--font-display)] text-lg uppercase tracking-normal text-[#f7f0e2]">
                    {step}
                  </p>
                  <p className="mt-1 text-sm text-[#9b9488]">
                    Scroll brings this step into focus and gives the marker a
                    soft settle.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Fade up", "Slide in", "Scale settle", "Glow trace"].map(
              (label, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 22, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="group rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#d6b66a]/35"
                >
                  <Eye className="h-5 w-5 text-[#d6b66a] transition group-hover:scale-110" />
                  <p className="mt-4 font-[var(--font-display)] text-xl uppercase tracking-normal">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#a9a194]">
                    Triggered only as the section enters the viewport.
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </Card>
    </RevealSection>
  );
}

function ControlsLab() {
  const [enabled, setEnabled] = useState([true, false, true]);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);

  function copyToken() {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  function showToast() {
    setToast(true);
    window.setTimeout(() => setToast(false), 1800);
  }

  return (
    <RevealSection id="controls">
      <Card className="relative overflow-hidden p-5">
        <SectionHeader
          eyebrow="13 / Controls Lab"
          title="Toggles, copy feedback, and toast confirmation"
          copy="Small control interactions use immediate press feedback, thumb travel, copy-state swap, and a restrained toast."
        />
        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-3">
            {controlItems.map((label, index) => (
              <button
                key={label}
                type="button"
                aria-pressed={enabled[index]}
                onClick={() =>
                  setEnabled((items) =>
                    items.map((item, itemIndex) =>
                      itemIndex === index ? !item : item,
                    ),
                  )
                }
                className="group flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] p-4 text-left outline-none transition hover:border-[#d6b66a]/35 focus-visible:ring-2 focus-visible:ring-[#d6b66a]/70"
              >
                <span>
                  <span className="block text-sm text-[#f7f0e2]">{label}</span>
                  <span className="mt-1 block text-xs text-[#9b9488]">
                    Toggle thumb uses spring travel and color staging.
                  </span>
                </span>
                <span
                  className={cn(
                    "flex h-7 w-12 items-center rounded-full p-1 transition",
                    enabled[index] ? "bg-[#d6b66a]" : "bg-white/10",
                  )}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    className={cn(
                      "h-5 w-5 rounded-full",
                      enabled[index]
                        ? "ml-5 bg-[#080705]"
                        : "ml-0 bg-[#766f65]",
                    )}
                  />
                </span>
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#766f65]">
              Clipboard token
            </p>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.035] px-3 py-3">
              <code className="text-sm text-[#d8cbb7]">motion.gold.01</code>
              <button
                onClick={copyToken}
                className="rounded-md p-2 text-[#d6b66a] transition hover:bg-[#d6b66a]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b66a]/70"
                aria-label="Copy motion token"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                    >
                      <Copy className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
            <Button className="mt-4 w-full" onClick={showToast}>
              <Bell className="h-4 w-4" />
              Trigger toast
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {toast ? (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              role="status"
              className="absolute bottom-5 right-5 rounded-lg border border-[#d6b66a]/30 bg-[#12100d] px-4 py-3 text-sm text-[#f7f0e2] shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
            >
              Interaction saved to the set.
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Card>
    </RevealSection>
  );
}

function AnimatedContentButton() {
  const [armed, setArmed] = useState(false);

  return (
    <RevealSection id="animated-button">
      <Card className="overflow-hidden p-5">
        <SectionHeader
          eyebrow="14 / Animated Button"
          title="Content animates inside the button"
          copy="The label, shimmer line, orbiting spark, and confirmation text transition inside one compact control."
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <motion.button
            type="button"
            onClick={() => {
              setArmed(true);
              window.setTimeout(() => setArmed(false), 1600);
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex w-full max-w-sm items-center justify-center overflow-hidden rounded-md bg-[#d6b66a] px-6 py-4 text-sm font-semibold text-[#090806] outline-none shadow-[0_0_0_1px_rgba(214,182,106,0.35),0_20px_70px_rgba(214,182,106,0.2)] transition focus-visible:ring-2 focus-visible:ring-[#d6b66a]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] sm:w-auto"
          >
            <motion.span
              aria-hidden
              className="absolute inset-y-0 -left-16 w-12 rotate-12 bg-white/45 blur-sm"
              animate={{ x: armed ? 360 : 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              aria-hidden
              className="absolute right-4 top-2 text-[#090806]/50"
              animate={{
                rotate: armed ? 360 : 0,
                scale: armed ? [1, 1.35, 1] : 1,
              }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <Stars className="h-3.5 w-3.5" />
            </motion.span>
            <span className="relative flex h-5 items-center gap-2">
              <AnimatePresence mode="wait" initial={false}>
                {armed ? (
                  <motion.span
                    key="armed"
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Sequence armed
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
                    Animate content
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.button>
          <p className="max-w-md text-sm leading-6 text-[#a9a194]">
            Click it: the inner copy swaps vertically, the spark orbits, and the
            shimmer passes through the control while the button frame stays
            stable.
          </p>
        </div>
      </Card>
    </RevealSection>
  );
}

function SpotlightCards() {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  return (
    <RevealSection id="spotlight">
      <Card className="p-5">
        <SectionHeader
          eyebrow="15 / Spotlight Hover"
          title="Pointer position bends the light"
          copy="The card tracks pointer location with a soft radial sheen, plus a tiny icon response on hover."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {["Intent", "Precision", "Restraint"].map((label, index) => (
            <motion.article
              key={label}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setSpotlight({
                  x: ((event.clientX - rect.left) / rect.width) * 100,
                  y: ((event.clientY - rect.top) / rect.height) * 100,
                });
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-5"
              style={{
                background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(214,182,106,0.14), rgba(255,255,255,0.035) 34%, rgba(255,255,255,0.02) 68%)`,
              }}
            >
              <motion.span
                animate={{ rotate: index * 18 }}
                className="grid h-10 w-10 place-items-center rounded-md border border-[#d6b66a]/25 bg-[#d6b66a]/10 text-[#d6b66a] transition group-hover:scale-105"
              >
                <Sparkles className="h-4 w-4" />
              </motion.span>
              <h3 className="mt-5 font-[var(--font-display)] text-xl uppercase tracking-normal">
                {label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#a9a194]">
                Move across the card to see the highlight follow without
                overpowering the content.
              </p>
            </motion.article>
          ))}
        </div>
      </Card>
    </RevealSection>
  );
}

function SegmentedAndProgressLab() {
  const [segment, setSegment] = useState("Balanced");
  const [progress, setProgress] = useState(64);

  return (
    <RevealSection id="precision-controls">
      <Card className="p-5">
        <SectionHeader
          eyebrow="16 / Precision Controls"
          title="Selection and progress settle into place"
          copy="The segmented control uses a shared layout highlight, while the progress ring responds to small nudges."
        />
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div
              role="radiogroup"
              aria-label="Motion intensity"
              className="flex rounded-lg border border-white/10 bg-white/[0.035] p-1"
            >
              {segmentOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={segment === option}
                  onClick={() => setSegment(option)}
                  className={cn(
                    "relative flex-1 rounded-md px-3 py-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#d6b66a]/70",
                    segment === option
                      ? "text-[#090806]"
                      : "text-[#9b9488] hover:text-[#f7f0e2]",
                  )}
                >
                  {segment === option ? (
                    <motion.span
                      layoutId="segment-pill"
                      className="absolute inset-0 rounded-md bg-[#d6b66a]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  ) : null}
                  <span className="relative">{option}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-[#a9a194]">
              Current mode: <span className="text-[#d6b66a]">{segment}</span>.
              The highlight moves as one object instead of redrawing.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center gap-5">
              <div className="relative grid h-28 w-28 place-items-center">
                <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="rgba(255,255,255,0.09)"
                    strokeWidth="10"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke={accent}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={289}
                    animate={{ strokeDashoffset: 289 - (289 * progress) / 100 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  />
                </svg>
                <span className="absolute font-[var(--font-display)] text-2xl text-[#f7f0e2]">
                  {progress}%
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {[48, 64, 82].map((value) => (
                  <Button
                    key={value}
                    variant={progress === value ? "primary" : "ghost"}
                    onClick={() => setProgress(value)}
                  >
                    {value}%
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </RevealSection>
  );
}

function ReorderLab() {
  const [items, setItems] = useState(reorderItems);

  function moveItem(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) return;
    setItems((current) => {
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(nextIndex, 0, item);
      return next;
    });
  }

  return (
    <RevealSection id="reorder">
      <Card className="p-5">
        <SectionHeader
          eyebrow="17 / Reorder Feedback"
          title="List items glide into their new order"
          copy="Keyboard-friendly move controls trigger layout animation so the list rearranges smoothly."
        />
        <motion.ul layout className="grid gap-3">
          {items.map((item, index) => (
            <motion.li
              layout
              key={item}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3"
            >
              <span className="flex items-center gap-3 text-sm text-[#f7f0e2]">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-[#d6b66a]/10 text-xs text-[#d6b66a]">
                  {index + 1}
                </span>
                {item}
              </span>
              <span className="flex gap-2">
                <button
                  type="button"
                  aria-label={`Move ${item} up`}
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="rounded-md border border-white/10 px-2 py-1 text-xs text-[#d8cbb7] transition hover:border-[#d6b66a]/35 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Up
                </button>
                <button
                  type="button"
                  aria-label={`Move ${item} down`}
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  className="rounded-md border border-white/10 px-2 py-1 text-xs text-[#d8cbb7] transition hover:border-[#d6b66a]/35 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Down
                </button>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Card>
    </RevealSection>
  );
}

function WaterDropletButton() {
  const [ripples, setRipples] = useState<number[]>([]);

  function triggerRipple() {
    const id = Date.now();
    setRipples((items) => [...items, id]);
    window.setTimeout(() => {
      setRipples((items) => items.filter((item) => item !== id));
    }, 900);
  }

  return (
    <RevealSection id="water-droplet">
      <Card className="p-5">
        <SectionHeader
          eyebrow="18 / Water Droplet Button"
          title="A normal button with watery refraction"
          copy="The control keeps a familiar CTA shape while internal highlights, shimmer, ripples, and soft distortion create the liquid feel."
        />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <motion.button
            type="button"
            onClick={triggerRipple}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.975 }}
            transition={{ type: "spring", stiffness: 430, damping: 28 }}
            className="group relative inline-flex min-h-14 min-w-64 items-center justify-center overflow-hidden rounded-md border border-[#d6b66a]/35 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(214,182,106,0.24)_24%,rgba(214,182,106,0.12)_50%,rgba(14,11,7,0.92)_100%)] px-6 py-4 text-sm font-semibold text-[#f7f0e2] shadow-[inset_0_1px_0_rgba(255,255,255,0.34),inset_10px_0_28px_rgba(255,255,255,0.08),inset_-18px_-16px_36px_rgba(0,0,0,0.42),0_20px_70px_rgba(214,182,106,0.18)] outline-none backdrop-blur focus-visible:ring-2 focus-visible:ring-[#d6b66a]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            aria-label="Activate watery button interaction"
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 opacity-70"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage:
                  "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.22) 18%, transparent 34%, rgba(214,182,106,0.22) 58%, transparent 76%)",
                backgroundSize: "220% 100%",
              }}
            />
            <span className="absolute left-4 top-2 h-6 w-20 rounded-full bg-white/30 blur-[10px] transition group-hover:translate-x-8 group-hover:opacity-90" />
            <span className="absolute inset-x-3 top-1 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)]" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_24%),radial-gradient(circle_at_78%_75%,rgba(214,182,106,0.18),transparent_28%)] mix-blend-screen" />
            <AnimatePresence>
              {ripples.map((id) => (
                <motion.span
                  key={id}
                  initial={{ scale: 0.2, opacity: 0.5 }}
                  animate={{ scale: 5.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                  className="absolute h-10 w-10 rounded-full border border-white/45"
                />
              ))}
              <h1>
                dont suggest the layout of any frontend things i have an mcp
                server of ui-design and microinteractions and for the
                functioning the main page of /lab will be like a problem section
                where{" "}
              </h1>
            </AnimatePresence>
            <motion.span
              animate={{ x: [0, 1.5, -1, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 inline-flex items-center gap-2 tracking-[0.08em]"
            >
              Liquid action
            </motion.span>
          </motion.button>
          <p className="max-w-xl text-sm leading-6 text-[#a9a194]">
            It reads as a regular button first. The water effect comes from
            layered refraction, moving caustic light, and a click ripple held
            inside the CTA bounds.
          </p>
        </div>
      </Card>
    </RevealSection>
  );
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-white/10">
      <button
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-[#f7f0e2] outline-none transition hover:text-[#d6b66a] focus-visible:ring-2 focus-visible:ring-[#d6b66a]/70"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {title}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm leading-6 text-[#a9a194]">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function MicrointeractionsPlayground() {
  const [activeNav, setActiveNav] = useState("Hero");
  const [modalOpen, setModalOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 26,
    mass: 0.25,
  });

  return (
    <main className="min-h-screen bg-[#050505] text-[#f7f0e2]">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[90] h-px origin-left bg-[#d6b66a]"
      />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(214,182,106,0.13),transparent_28%),radial-gradient(circle_at_80%_4%,rgba(214,182,106,0.08),transparent_20%),linear-gradient(180deg,#070706,#030303)]" />

      <div className="relative flex min-h-screen">
        <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#080807]/92 p-2 backdrop-blur-xl lg:inset-y-0 lg:left-0 lg:right-auto lg:w-20 lg:border-r lg:border-t-0 lg:hover:w-64 lg:hover:shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
          <nav
            aria-label="Microinteraction sections"
            className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveNav(item.label)}
                  className={cn(
                    "group flex min-w-12 items-center gap-3 rounded-md px-3 py-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#d6b66a]/70 lg:overflow-hidden",
                    active
                      ? "bg-[#d6b66a] text-[#090806]"
                      : "text-[#9b9488] hover:bg-white/[0.055] hover:text-[#f7f0e2]",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 transition group-hover:scale-110" />
                  <span className="whitespace-nowrap lg:opacity-0 lg:transition lg:duration-200 lg:group-hover:opacity-100 lg:[aside:hover_&]:opacity-100">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>
        </aside>

        <div className="w-full pb-24 lg:pl-24">
          <section
            id="hero"
            className="px-4 pb-8 pt-10 sm:px-6 lg:px-10 lg:py-10"
          >
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-7xl"
            >
              <Card className="overflow-hidden p-5 sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#d6b66a]">
                      01 / Hero Section
                    </p>
                    <h1 className="mt-4 font-[var(--font-display)] text-5xl uppercase leading-[0.95] tracking-normal text-[#f7f0e2] sm:text-7xl">
                      Microinteractions{" "}
                      <span className="bg-[linear-gradient(90deg,#f7f0e2,#d6b66a)] bg-clip-text text-transparent">
                        playground
                      </span>
                    </h1>
                    <motion.p
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0% 0 0)" }}
                      transition={{
                        duration: 0.75,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="mt-5 max-w-2xl text-base leading-7 text-[#a9a194]"
                    >
                      A single premium surface demonstrating hover, focus,
                      loading, sorting, validation, modal, accordion, and
                      empty-state feedback.
                    </motion.p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button>
                        <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />{" "}
                        Explore interactions
                      </Button>
                      <Button variant="ghost">
                        <Command className="h-4 w-4" /> View patterns
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <div className="grid gap-3">
                      {["Hover", "Focus", "Press", "Success"].map(
                        (label, index) => (
                          <motion.div
                            key={label}
                            initial={{ opacity: 0, x: 18 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.35,
                              delay: 0.2 + index * 0.08,
                            }}
                            className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.035] px-4 py-3"
                          >
                            <span className="text-sm text-[#d8cbb7]">
                              {label}
                            </span>
                            <span className="h-2 w-16 rounded-full bg-[#d6b66a]" />
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </section>

          <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:px-10">
            <RevealSection>
              <Card className="p-5">
                <SectionHeader
                  eyebrow="02 / Sidebar"
                  title="Hover expands navigation"
                  copy="On desktop, the rail widens on hover and labels fade in while the active item keeps a strong accent fill."
                />
              </Card>
            </RevealSection>

            <AccessibleTabs />

            <RevealSection id="cards">
              <SectionHeader
                eyebrow="04 / Cards Grid"
                title="Cards lift, scale, and answer back"
                copy="Each card uses hover lift, 1.02 scale, shadow change, and a secondary icon response."
              />
              <div className="grid gap-4 md:grid-cols-3">
                {cardItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.article
                      key={item.title}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ duration: 0.16 }}
                      className="group rounded-lg border border-white/10 bg-[#0b0a08]/88 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_28px_82px_rgba(0,0,0,0.46)]"
                    >
                      <Icon className="h-6 w-6 text-[#d6b66a] transition group-hover:rotate-6 group-hover:scale-110" />
                      <h3 className="mt-5 font-[var(--font-display)] text-xl uppercase tracking-normal">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#a9a194]">
                        {item.copy}
                      </p>
                    </motion.article>
                  );
                })}
              </div>
            </RevealSection>

            <RevealSection id="stats">
              <SectionHeader
                eyebrow="05 / Stats Cards"
                title="Numbers count into place"
                copy="Stats animate once, then use subtle color and trend feedback on hover."
              />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statItems.map((stat) => (
                  <Card
                    key={stat.label}
                    className="group p-5 transition hover:border-[#d6b66a]/35"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.22em] text-[#9b9488]">
                        {stat.label}
                      </span>
                      <TrendingUp className="h-4 w-4 text-[#d6b66a] transition group-hover:-translate-y-0.5" />
                    </div>
                    <p className="mt-5 font-[var(--font-display)] text-4xl text-[#f7f0e2] transition group-hover:text-[#d6b66a]">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-sm text-[#d6b66a]">{stat.trend}</p>
                  </Card>
                ))}
              </div>
            </RevealSection>

            <DataTable />
            <FormSection />
            <ScrollChoreography />
            <ControlsLab />
            <AnimatedContentButton />
            <WaterDropletButton />
            <SpotlightCards />
            <SegmentedAndProgressLab />
            <ReorderLab />

            <RevealSection id="modal">
              <Card className="p-5">
                <SectionHeader
                  eyebrow="08 / Modal"
                  title="Overlay with blur and focus trap"
                  copy="Open the modal to test animated entry, Escape close, backdrop close, and trapped keyboard focus."
                />
                <Button onClick={() => setModalOpen(true)}>
                  <MousePointer2 className="h-4 w-4" /> Open modal
                </Button>
              </Card>
            </RevealSection>

            <RevealSection id="accordion">
              <Card className="p-5">
                <SectionHeader
                  eyebrow="09 / Accordion"
                  title="Height and icon movement stay synchronized"
                  copy="The panel animates height while the chevron rotates with the same timing language."
                />
                <AccordionItem title="How much motion is enough?" defaultOpen>
                  Enough to confirm cause and effect. Hover, focus, press, and
                  validation each get one clear response.
                </AccordionItem>
                <AccordionItem title="What happens with reduced motion?">
                  Count animation short-circuits to final values and core
                  interactions remain functional.
                </AccordionItem>
                <AccordionItem title="Why one accent color?">
                  The gold accent carries CTAs, active states, focus, and key
                  indicators so hierarchy stays quiet.
                </AccordionItem>
              </Card>
            </RevealSection>

            <RevealSection id="empty">
              <Card className="p-8 text-center">
                <motion.div
                  whileHover={{ rotate: -2, scale: 1.04 }}
                  className="mx-auto grid h-20 w-20 place-items-center rounded-lg border border-[#d6b66a]/30 bg-[#d6b66a]/10"
                >
                  <Database className="h-8 w-8 text-[#d6b66a]" />
                </motion.div>
                <h2 className="mt-5 font-[var(--font-display)] text-3xl uppercase tracking-normal">
                  No dormant states
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#a9a194]">
                  Even an empty state can guide the next action with a clear
                  illustration, calm copy, and responsive CTA feedback.
                </p>
                <Button className="mt-6">
                  <UserPlus className="h-4 w-4" /> Add first pattern
                </Button>
              </Card>
            </RevealSection>

            <RevealSection id="cta" className="pb-8">
              <Card className="overflow-hidden p-6 sm:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#d6b66a]">
                      11 / CTA Section
                    </p>
                    <h2 className="mt-3 font-[var(--font-display)] text-3xl uppercase tracking-normal sm:text-4xl">
                      Ship feedback that feels expensive
                    </h2>
                    <p className="mt-3 text-sm text-[#a9a194] transition group-hover:text-[#d8cbb7]">
                      Microcopy stays direct, and the button glow only
                      intensifies on intent.
                    </p>
                  </div>
                  <Button className="group min-w-44">
                    <span className="transition group-hover:-translate-x-0.5">
                      Publish set
                    </span>
                    <Rocket className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </div>
              </Card>
            </RevealSection>
          </div>
        </div>
      </div>

      <PlaygroundModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
