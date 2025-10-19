import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button} from "@/components/ui/button.tsx";
import {User} from "lucide-react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/AppSidebar.tsx";

export default function Layout() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar/>
                <Button className={"z-10 m-3"} variant={"outline"} size={"icon-lg"}>
                    <SidebarTrigger/>
                </Button>
                <div className={"absolute right-0 p-3 flex space-x-3"}>
                    <ModeToggle/>
                    <Button size={"icon-lg"} variant={"outline"}>
                        <User className={"aspect-square w-8 h-8"}/>
                    </Button>
                </div>
            </SidebarProvider>

        </>

    );
}