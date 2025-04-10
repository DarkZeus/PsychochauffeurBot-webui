import {createFileRoute} from "@tanstack/react-router";
import {DashboardPage} from "@/pages/dashboard.page.tsx";

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});