import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/common/Card";

export function Pipelines() {
  return (
    <div>
      <Header
        title="Pipelines"
        description="GitLab pipeline ingestion lands in Milestone 2"
      />
      <div className="p-8">
        <Card>
          <CardContent className="py-16 text-center text-sm text-muted-foreground">
            No GitLab API client yet. This page is a placeholder so navigation and routing are in
            place before pipeline data arrives.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
