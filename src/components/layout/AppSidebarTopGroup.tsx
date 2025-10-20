import {SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton} from "@/components/ui/sidebar.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Link} from "react-router";
import {Bot, MessageCirclePlus, Timer} from "lucide-react";

export default function AppSidebarTopGroup(
    {
        sidebarOpen
    }: {
        sidebarOpen: boolean
    }
) {
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={"/"}>
                                <SidebarMenuButton className={"cursor-pointer"}>
                                    <MessageCirclePlus/>
                                    <span>New Chat</span>
                                </SidebarMenuButton>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className={`${sidebarOpen && "hidden"}`} side={"right"}>
                            New Chat
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={"/models"}>
                                <SidebarMenuButton className={"cursor-pointer"}>
                                    <Bot/>
                                    <span>Models</span>
                                </SidebarMenuButton>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className={`${sidebarOpen && "hidden"}`} side={"right"}>
                            Models
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={"/benchmarks"}>
                                <SidebarMenuButton className={"cursor-pointer"}>
                                    <Timer/>
                                    <span>Benchmarks</span>
                                </SidebarMenuButton>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className={`${sidebarOpen && "hidden"}`} side={"right"}>
                            Benchmarks
                        </TooltipContent>
                    </Tooltip>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}