import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Spinner } from "@/components/common/Spinner";
import { useHealth, useSettings } from "@/api/queries";

export function Dashboard() {
  const { data: health, isLoading, error } = useHealth();
  const { data: settings } = useSettings();

  return (
    <div>
      <Header
        title="Dashboard"
        description="Foundation health for GitLab CI/CD intelligence. Ingestion and AI are not wired yet."
      />
      <div className="space-y-6 p-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatusCard
            title="API"
            loading={isLoading}
            ok={Boolean(health)}
            detail={health ? `v${health.version}` : error instanceof Error ? error.message : "checking"}
          />
          <StatusCard
            title="GitLab"
            loading={isLoading}
            ok={Boolean(health?.gitlab_configured)}
            detail={health?.gitlab_configured ? "token present" : "set GITLAB_TOKEN later"}
          />
          <StatusCard
            title="AI providers"
            loading={isLoading}
            ok={Boolean(health?.bedrock_configured || health?.strands_configured)}
            detail={`${health?.ai_provider ?? "bedrock"} stub`}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Milestone 1 scope</CardTitle>
            <CardDescription>
              Runnable platform only. No GitLab HTTP, no Bedrock InvokeModel, no Strands agents.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>GitLab host: {settings?.gitlab_base_url ?? "—"}</p>
            <p>AWS region: {settings?.aws_region ?? "—"}</p>
            <p>Bedrock model id: {settings?.bedrock_model_id ?? "—"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusCard({
  title,
  loading,
  ok,
  detail,
}: {
  title: string;
  loading: boolean;
  ok: boolean;
  detail: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        {loading ? (
          <Spinner className="mt-3" />
        ) : (
          <>
            <div className="mt-2">
              <Badge variant={ok ? "success" : "outline"}>{ok ? "ready" : "not configured"}</Badge>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{detail}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
