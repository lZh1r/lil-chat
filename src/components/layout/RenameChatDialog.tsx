import type {Chat} from "@/lib/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Pen} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {db} from "@/lib/db.ts";
import * as React from "react";

export default function RenameChatDialog(
    {
        chat,
        setOpen
    }: {
        chat: Chat,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
) {
    const [newName, setNewName] = useState(chat.name);

    async function renameChat(name: string) {
        try {
            db.chats.put({...chat, name: name});
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    className={"text-sm"}

                >
                    <Pen/> <p>Rename chat</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle className={"flex line-clamp-2"}>Renaming <q>{chat.name}</q></AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
                <Input
                    onChange={(e) => setNewName(e.currentTarget.value)}
                    value={newName}
                    type={"text"}
                    maxLength={64}
                />
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => setOpen(s => !s)}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            renameChat(newName);
                            setOpen(s => !s);
                        }}
                    >
                        Rename
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}