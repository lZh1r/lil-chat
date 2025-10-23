import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {db} from "@/lib/db.ts";
import {useNavigate} from "react-router";
import type {Chat} from "@/lib/types.ts";
import {SidebarMenuAction} from "@/components/ui/sidebar.tsx";
import {Trash} from "lucide-react";

export default function DeleteChatDialog(
    {
        chat
    }: {
        chat: Chat
    }
) {
    const navigate = useNavigate();

    async function deleteChat(chatId: string) {
        await db.chats.delete(chatId);
        await db.messages.where("chatId").equals(chatId).delete();
        if (window.location.href.includes(chatId)) {
            navigate("/");
        }
    }

    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <SidebarMenuAction
                    className={"p-1 w-fit h-fit static place-self-center"}>
                    <Trash/>
                </SidebarMenuAction>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle className={"flex line-clamp-2"}>
                    Do you want to delete <q>{chat.name}</q>?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteChat(chat.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}