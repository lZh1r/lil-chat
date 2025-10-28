import type {Chat} from "@/lib/types.ts";
import {SidebarMenuSubButton, SidebarMenuSubItem} from "@/components/ui/sidebar.tsx";
import {Link} from "react-router";
import DeleteChatDialog from "@/components/layout/DeleteChatDialog.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Ellipsis} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import RenameChatDialog from "@/components/layout/RenameChatDialog.tsx";
import {useState} from "react";

export default function ChatSelectButton({chat}: {chat: Chat}) {
    const [open, setOpen] = useState(false);

    return (
        <SidebarMenuSubItem className={"flex justify-between"}>
            <SidebarMenuSubButton className={"w-full"} asChild>
                <Link to={`/chat/${chat.id}`}>
                    <span className={"line-clamp-1 wrap-anywhere"}>
                        {chat.name}
                    </span>
                </Link>
            </SidebarMenuSubButton>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant={"ghost"} size={"icon-sm"}>
                        <Ellipsis/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={"p-0 w-fit h-fit flex flex-col"}>
                    <RenameChatDialog setOpen={setOpen} chat={chat}/>
                    <DeleteChatDialog setOpen={setOpen} chat={chat}/>
                </PopoverContent>
            </Popover>
        </SidebarMenuSubItem>
    );
}