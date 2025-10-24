import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/layout/AppSidebar.tsx";
import {Outlet} from "react-router";
import ProfileMenu from "@/components/layout/ProfileMenu.tsx";
import {useState} from "react";

export default function Layout() {

    const [open, setOpen] = useState(localStorage.getItem("sidebar_state") === "true");

    return (
        <>
            <SidebarProvider open={open} onOpenChange={setOpen} defaultOpen={localStorage.getItem("sidebar_state") === "true"}>
                <AppSidebar/>
                <Button asChild className={`${open && "md:translate-x-[13rem]"} md:left-[3rem] z-10 m-3 md:absolute`} variant={"outline"} size={"icon-lg"}>
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