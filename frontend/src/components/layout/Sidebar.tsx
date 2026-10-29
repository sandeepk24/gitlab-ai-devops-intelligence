import { NavLink } from "react-router-dom";
import { GitBranch, LayoutDashboard, Settings, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusIndicator } from "@/components/common/StatusIndicator";
import { useHealth } from "@/api/queries";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/pipelines", icon: Workflow, label: "Pipelines" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const { data: health, isLoading } = useHealth();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-3 border-b border-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
          <GitBranch className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground">GitLab AI</h1>
          <p className="text-xs text-muted-foreground">DevOps Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-sidebar-active"
                  : "text-sidebar-foreground hover:bg-accent/50 hover:text-sidebar-active"
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 border-t border-border px-5 py-4">
        <StatusIndicator
          status={health ? "connected" : isLoading ? "loading" : "disconnected"}
          label="Backend"
          detail={health?.version}
        />
        <StatusIndicator
          status={
            isLoading ? "loading" : health?.gitlab_configured ? "connected" : "disconnected"
          }
          label="GitLab"
          detail={health?.gitlab_configured ? "token set" : "not configured"}
        />
        <StatusIndicator
          status={
            isLoading
              ? "loading"
              : health?.bedrock_configured || health?.strands_configured
                ? "connected"
                : "disconnected"
          }
          label="AI"
          detail={health?.ai_provider ?? "stub"}
        />
      </div>
    </aside>
  );
}
