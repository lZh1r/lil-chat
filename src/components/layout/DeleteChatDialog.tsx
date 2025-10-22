import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader
} from "@/components/ui/alert-dialog.tsx";
import {type Chat, db} from "@/lib/db.ts";
import {useNavigate} from "react-router";

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
        <AlertDialogContent>
            <AlertDialogHeader className={"flex line-clamp-1"}>
                Deleting <q>{chat.name}</q>
            </AlertDialogHeader>
            <AlertDialogDescription>
                This action cannot be undone.
            </AlertDialogDescription>
            <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteChat(chat.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}