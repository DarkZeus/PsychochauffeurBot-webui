import {Outlet, createRootRoute} from '@tanstack/react-router'
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/sidebar/app-sidebar.tsx";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
    component: () => (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <main className="flex-1 overflow-y-auto p-4">
                    <Outlet/>
                    <TanStackRouterDevtools/>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
});