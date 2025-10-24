
import {clsx} from "clsx";
import Markdown from "react-markdown";
import type {ChatMessage, ModelMessage} from "@/lib/types.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@/lib/db.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChartBar, Ellipsis} from "lucide-react";

export default function MessageBox(
    {
        message
    }: {
        message: ChatMessage | ModelMessage
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
                "text-foreground p-2 rounded-2xl w-fit max-w-[100%]"
            )}
        >
            <Markdown>{message.content}</Markdown>
            {message.role === "assistant" && <div className={"flex space-x-2 mt-2"}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button aria-label={"Message actions"} variant={"ghost"} size={"icon"}>
                            <Ellipsis/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className={"text-sm space-y-2 flex flex-col w-fit"}>
                        <p>Stuff</p>
                    </PopoverContent>
                </Popover>
                {
                    responseDetails &&
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button aria-label={"Message statistics"} variant={"ghost"} size={"icon"}>
                                <ChartBar/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className={"text-sm space-y-2 flex flex-col w-fit"}>
                            <p>Output tokens: {responseDetails.eval_count}</p>
                            <p>Time elapsed: {(responseDetails.total_duration! / 10 ** 9).toFixed(2)} s</p>
                            <p>Tokens per
                                second: {(responseDetails.eval_count! / responseDetails.eval_duration! * 10 ** 9).toFixed(2)}</p>
                        </PopoverContent>
                    </Popover>
                }
            </div>}

        </div>
    );
}