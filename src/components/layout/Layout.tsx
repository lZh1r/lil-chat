import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/layout/AppSidebar.tsx";
import {Outlet} from "react-router";
import ProfileMenu from "@/components/layout/ProfileMenu.tsx";

export default function Layout() {

    return (
        <>
            <SidebarProvider defaultOpen={localStorage.getItem("sidebar_state") === "true"}>
                <AppSidebar/>
                <Button asChild className={"z-10 m-3"} variant={"outline"} size={"icon-lg"}>
                    <SidebarTrigger/>
                </Button>
                <div className={"absolute right-0 p-3 flex space-x-3"}>
                    <ModeToggle/>
                    <ProfileMenu/>
                </div>
                <Outlet/>
            </SidebarProvider>
        </>
    );
}