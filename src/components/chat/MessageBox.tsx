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
import * as React from "react";
import LoadingState from "@/components/LoadingState.tsx";

export const MessageBox = React.memo(function MessageBox(
    {
        message,
        sendRequest
    }: {
        message: ChatMessage | ModelMessage,
        sendRequest: (message: string, messageId?: number) => void
    }
) {
    const responseDetails = useLiveQuery(async () => {
        return "id" in message ? db.responseDetails.get(message.id) : undefined;
    }, [message, db.responseDetails]);

    return (
        <div
            className={clsx(
                {"place-self-end bg-stone-800 text-white": message.role === "user"},
                {"place-self-start": message.role === "assistant"},
                {"place-self-center": message.role === "system"},
                {"hidden": message.role === "tool"},
                "text-foreground p-2 rounded-2xl w-fit max-w-[100%] leading-8"
            )}
        >
            {
                message.content.length === 0 ? <LoadingState/> : <Markdown>{message.content}</Markdown>
            }
            {message.role === "assistant" && <div className={"flex space-x-1 mt-2"}>
                <ChatMoreActionsButton/>
                <CopyButton text={message.content}/>
                <RedoButton handler={() => sendRequest(message.content, responseDetails?.messageId)}/>
                <BranchButton/>
                {responseDetails && <StatsButton responseDetails={responseDetails!}/>}
            </div>}

        </div>
    );
});