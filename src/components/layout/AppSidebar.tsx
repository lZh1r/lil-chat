import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    useSidebar,
} from "@/components/ui/sidebar.tsx";
import {ChevronRight} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import AppSidebarTopGroup from "@/components/layout/AppSidebarTopGroup.tsx";

export default function AppSidebar() {

    const sidebarState = useSidebar();

    return (
        <Sidebar collapsible={"icon"}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <h1 className={"p-2 text-xl transition-all group-data-[state=collapsed]:-ml-8 group-data-[state=collapsed]:opacity-0"}>
                            67Chat
                        </h1>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <AppSidebarTopGroup sidebarOpen={sidebarState.open}/>
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup className={"group-data-[state=collapsed]:hidden"}>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className={"cursor-pointer"}>
                                            <span>All Chats</span>
                                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubButton><span>Chat #1</span></SidebarMenuSubButton>
                                            <SidebarMenuSubButton><span>Chat #2</span></SidebarMenuSubButton>
                                            <SidebarMenuSubButton><span>Chat #3</span></SidebarMenuSubButton>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenu>
                            </SidebarGroupContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
        </Sidebar>
    );
}