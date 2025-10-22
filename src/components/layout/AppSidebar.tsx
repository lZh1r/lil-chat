import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar.tsx";
import {ChevronRight, Trash} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import AppSidebarTopGroup from "@/components/layout/AppSidebarTopGroup.tsx";
import {useEffect} from "react";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@/db.ts";
import {Link, useNavigate} from "react-router";

export default function AppSidebar() {

    const navigate = useNavigate();
    const sidebarState = useSidebar();
    const chats = useLiveQuery(() => {
        return db.chats.toArray();
    }, [db.chats]);

    async function deleteChat(chatId: string) {
        await db.chats.delete(chatId);
        await db.messages.where("chatId").equals(chatId).delete();
        if (window.location.href.includes(chatId)) {
            navigate("/");
        }
    }

    useEffect(() => {
        localStorage.setItem("sidebar_state", String(sidebarState.open));
    }, [sidebarState.open]);

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
                                            {
                                                chats?.map(chat =>
                                                    <SidebarMenuSubItem className={"flex space-x-2"} key={chat.id}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link to={`/chat/${chat.id}`}>
                                                                <span className={"line-clamp-1 wrap-anywhere"}>
                                                                    {chat.name}
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                        <SidebarMenuAction
                                                            className={"p-1 w-fit h-fit static place-self-center"}
                                                            onClick={() => deleteChat(chat.id)}>
                                                            <Trash/>
                                                        </SidebarMenuAction>
                                                    </SidebarMenuSubItem>
                                                )
                                            }
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