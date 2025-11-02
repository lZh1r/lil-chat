import {clsx} from "clsx";
import Markdown from "react-markdown";
import type {ChatMessage, ModelMessage} from "@/lib/types.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@/lib/db.ts";
import ChatMoreActionsButton from "@/components/chat/ChatMoreActionsButton.tsx";
import StatsButton from "@/components/chat/StatsButton.tsx";
import RedoButton from "@/components/chat/RedoButton.tsx";
import BranchButton from "@/components/chat/BranchButton.tsx";
import CopyButton from "@/components/chat/CopyButton.tsx";
import LoadingState from "@/components/LoadingState.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Check, Pen, X} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {useCallback, useState} from "react";
import {useAtomValue} from "jotai/react";
import {inProgressAtom} from "@/lib/atoms.ts";
import {Textarea} from "@/components/ui/textarea.tsx";

export default function MessageBox (
    {
        message,
        sendRequest
    }: {
        message: ChatMessage | ModelMessage,
        sendRequest: (message: string, messageId?: number, edit?: boolean) => void
    }
) {
    const responseDetails = useLiveQuery(async () => {
        return "id" in message ? db.responseDetails.get(message.id) : undefined;
    }, [message, db.responseDetails]);
    const [editing, setEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(message.content);
    const inProgress = useAtomValue(inProgressAtom);
    const editMessage = useCallback(async () => {
        if (editedMessage.trim().length > 0) {
            try {
                const msg = message as ChatMessage;
                await db.messages.put({...msg, content: editedMessage.trim()});
                sendRequest(msg.content, msg.id, true);
            } catch (e) {
                console.log(e);
            }
        }
        setEditing(false);
    }, [editedMessage, message, sendRequest]);

    return (
        <div
            className={clsx(
                // {"place-self-end bg-stone-800 text-white": message.role === "user"},
                {"place-self-start": message.role === "assistant"},
                {"place-self-center": message.role === "system"},
                {"hidden": message.role === "tool"},
                "text-foreground leading-8 w-full max-w-[100%]"
            )}
        >
            {
                message.content?.length === 0 ?
                    (inProgress && <LoadingState/>) :
                    <div
                        className={`
                            ${message.role === "user" && "place-self-end bg-stone-800 text-white"}
                            p-2 rounded-2xl w-fit max-w-[100%]
                        `}
                    >
                        {
                            editing ?
                                <Textarea
                                    onKeyDown={(e) => {
                                        if (e.shiftKey && e.key === "Enter") return;
                                        if (e.key === "Enter") editMessage();
                                    }}
                                    onChange={(e) => {
                                        setEditedMessage(e.currentTarget.value);
                                    }}
                                    className={"resize-none"}
                                    value={editedMessage}/> :
                                <Markdown>{message.content}</Markdown>
                        }
                    </div>
            }
            {message.role === "assistant" && <div className={"flex space-x-1 mt-2"}>
                <ChatMoreActionsButton id={responseDetails?.messageId}/>
                <CopyButton text={message.content}/>
                <RedoButton handler={() => sendRequest(message.content, responseDetails?.messageId ?? 0)}/>
                <BranchButton/>
                {responseDetails && <StatsButton responseDetails={responseDetails!}/>}
            </div>}
            {
                message.role === "user" &&
                <div className={"w-full flex justify-end p-1"}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                disabled={inProgress}
                                aria-label={editing ? "Apply changes" : "Edit message"}
                                onClick={() => {
                                    if (!editing) setEditing(true);
                                    else editMessage();
                                }}
                                variant={"ghost"}
                                size={"icon"}
                            >
                                {editing ? <Check/> : <Pen/>}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {editing ? "Apply" : "Edit message"}
                        </TooltipContent>
                    </Tooltip>
                    {editing && <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                disabled={inProgress}
                                aria-label={"Cancel"}
                                onClick={() => {
                                    setEditedMessage(message.content);
                                    setEditing(false);
                                }}
                                variant={"ghost"}
                                size={"icon"}
                            >
                                <X/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Cancel
                        </TooltipContent>
                    </Tooltip>}
                </div>
            }
        </div>
    );
}