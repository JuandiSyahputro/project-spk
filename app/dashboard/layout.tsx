import { auth } from "@/auth";
import { AppSidebar } from "@/components/navbar/app-sidebar";
import NavBreadCrumb from "@/components/navbar/nav-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { notFound } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await auth();
  if (!user?.user) return notFound();

  return (
    <SidebarProvider>
      <AppSidebar user={user.user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <NavBreadCrumb />
          </div>
        </header>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0"> */}
        {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
        {children}
        {/* </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
