import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea} from "@/components/ui/input-group.tsx";
import {ArrowUp, Plus} from "lucide-react";

import {useState} from "react";
import ChatModelDropdown from "@/components/chat/ChatModelDropdown.tsx";

export default function ChatInput(
    {
        className,
        inProgress,
        sendMessage
    }: {
        className: string,
        inProgress: boolean,
        sendMessage: (msg: string) => void
    }
) {
    const [message, setMessage] = useState("");

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
                <InputGroupButton
                    aria-label={"Attach files"}
                    size={"icon-sm"}
                    variant={"outline"}
                    className={"rounded-full"}
                >
                    <Plus/>
                </InputGroupButton>
                <ChatModelDropdown/>
                <InputGroupButton
                    aria-label={"Send message"}
                    disabled={inProgress}
                    size={"icon-sm"}
                    variant={"default"}
                    className={"rounded-full ml-auto"}
                    onClick={() => {
                        if (message.trim().length > 0) {
                            sendMessage(message);
                            setMessage("");
                        }
                    }}
                >
                    <ArrowUp/>
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    );
}