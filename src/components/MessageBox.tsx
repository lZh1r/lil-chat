import type {ChatMessage} from "@/db.ts";
import {clsx} from "clsx";
import Markdown from "react-markdown";

export default function MessageBox({message}: {message: ChatMessage}) {
    return (
        <div
            className={clsx(
                {"place-self-end bg-stone-800": message.role === "user"},
                {"place-self-start": message.role === "assistant"},
                {"place-self-center": message.role === "system"},
                {"hidden": message.role === "tool"},
                "text-foreground p-2 rounded-2xl w-fit"
            )}
        >
            <Markdown>{message.content}</Markdown>
        </div>
    );
}