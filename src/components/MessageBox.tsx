
import {clsx} from "clsx";
import Markdown from "react-markdown";
import type {ChatMessage, ModelMessage} from "@/lib/types.ts";

export default function MessageBox({message}: {message: ChatMessage | ModelMessage}) {
    return (
        <div
            className={clsx(
                {"place-self-end bg-stone-800 text-white": message.role === "user"},
                {"place-self-start": message.role === "assistant"},
                {"place-self-center": message.role === "system"},
                {"hidden": message.role === "tool"},
                "text-foreground p-2 rounded-2xl w-fit max-w-[100%]"
            )}
        >
            <Markdown>{message.content}</Markdown>
        </div>
    );
}