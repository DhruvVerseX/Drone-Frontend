import { cn } from "@/lib/utils";

type SystemShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function SystemShell({ children, className }: SystemShellProps) {
  return (
    <div
      className={cn(
        "panel scan-border rounded-[var(--radius-lg)] px-5 py-5 sm:px-6 sm:py-6",
        className
      )}
    >
      {children}
    </div>
  );
}
