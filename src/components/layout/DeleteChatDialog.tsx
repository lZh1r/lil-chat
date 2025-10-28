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
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";

export default function DeleteChatDialog(
    {
        chat,
        setOpen
    }: {
        chat: Chat,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }
) {
    const navigate = useNavigate();

    async function deleteChat(chatId: string) {
        await db.chats.delete(chatId);
        await db.messages.where("chatId").equals(chatId).delete();
        await db.responseDetails.where("chatId").equals(chatId).delete();
        if (window.location.href.includes(chatId)) {
            navigate("/");
        }
    }

    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    className={"p-2 space-x-2 w-fit text-destructive text-sm"}
                >
                    <Trash/> <p>Delete chat</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle className={"flex line-clamp-2"}>
                    Do you want to delete <q>{chat.name}</q>?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => setOpen(s => !s)}
                    >
                        Close
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            deleteChat(chat.id);
                            setOpen(s => !s);
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}