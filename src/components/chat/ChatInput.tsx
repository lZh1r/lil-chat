import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea} from "@/components/ui/input-group.tsx";
import {ArrowUp, Plus} from "lucide-react";

import {useState} from "react";
import ChatModelDropdown from "@/components/chat/ChatModelDropdown.tsx";
import ChatInputOptions from "@/components/chat/ChatInputOptions.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {useSetAtom} from "jotai/react";
import {reasoningAtom} from "@/lib/atoms.ts";
import ChatInputSystemPrompt from "@/components/chat/ChatInputSystemPrompt.tsx";

export default function ChatInput(
    {
        className,
        inProgress,
        sendMessage,
        systemPrompt,
        setSystemPrompt
    }: {
        className: string,
        inProgress: boolean,
        sendMessage: (msg: string) => void
        systemPrompt: string | undefined
        setSystemPrompt: (prompt: string) => void
    }
) {
    const [message, setMessage] = useState("");
    const setReasoning = useSetAtom(reasoningAtom);

    return (
        <InputGroup className={`${className} rounded-2xl pt-1`}>
            <InputGroupTextarea
                className={`
                    max-h-60
                    [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full 
                    [&::-webkit-scrollbar-track]:opacity-0 [&::-webkit-scrollbar-thumb]:rounded-full 
                    [&::-webkit-scrollbar-thumb]:bg-stone-700
                `}
                id={"message-input"}
                onKeyDown={(e) => {
                    if ((e.shiftKey && e.key === "Enter") || inProgress) return;
                    if (e.key === "Enter") {
                        e.preventDefault();
                        if (message.trim().length > 0) {
                            sendMessage(message);
                            setMessage("");
                        }
                    }
                }}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                placeholder={"Ask your hot local llm mommy..."}/>
            <InputGroupAddon align={"block-end"}>
                <div className={"flex flex-col space-y-2"}>
                    <div className={"flex items-center"}>
                        <InputGroupButton
                            aria-label={"Attach files"}
                            size={"icon-sm"}
                            variant={"outline"}
                            className={"rounded-full"}
                        >
                            <Plus/>
                        </InputGroupButton>
                        <ChatModelDropdown/>
                    </div>
                    <div className={"space-x-2 flex items-center p-1"}>
                        <Switch onClick={() => setReasoning(s => !s)} className={"mt-0.5"} id={"reasoning"}/>
                        <label className={"place-self-center"} htmlFor={"reasoning"}>
                            Reasoning
                        </label>
                    </div>
                </div>
                <div className={"ml-auto flex space-x-3 place-self-end"}>
                    <ChatInputSystemPrompt
                        systemPrompt={systemPrompt}
                        setSystemPrompt={setSystemPrompt}
                    />
                    <ChatInputOptions/>
                    <InputGroupButton
                        aria-label={"Send message"}
                        disabled={inProgress}
                        size={"icon-sm"}
                        variant={"default"}
                        className={"rounded-full"}
                        onClick={() => {
                            if (message.trim().length > 0) {
                                sendMessage(message);
                                setMessage("");
                            }
                        }}
                    >
                        <ArrowUp/>
                    </InputGroupButton>
                </div>

            </InputGroupAddon>
        </InputGroup>
    );
}