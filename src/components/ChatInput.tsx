import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea} from "@/components/ui/input-group.tsx";
import {ArrowUp, Plus} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {useState} from "react";

export default function ChatInput(
    {
        className,
        sendMessage
    }: {
        className: string,
        sendMessage: (msg: string) => void
    }
) {
    const [model, setModel] = useState("auto");
    const [message, setMessage] = useState("");

    return (
        <InputGroup className={`${className} rounded-2xl pt-1`}>
            <InputGroupTextarea
                id={"message-input"}
                onKeyDown={(e) => {
                    if (e.shiftKey && e.key === "Enter") return;
                    if (e.key === "Enter") {
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
                    size={"icon-sm"}
                    variant={"outline"}
                    className={"rounded-full"}
                >
                    <Plus/>
                </InputGroupButton>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <InputGroupButton>{model}</InputGroupButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                            <DropdownMenuRadioItem value={"auto"}>Auto</DropdownMenuRadioItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Cloud Models</DropdownMenuLabel>
                                <DropdownMenuRadioItem value={"gpt-oss-120b"}>GPT OSS 120B</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={"kimi-k2-1t"}>Kimi K2 1T</DropdownMenuRadioItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Local Models</DropdownMenuLabel>
                                <DropdownMenuRadioItem value={"mistral-7B"}>Mistral 7B</DropdownMenuRadioItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                        </DropdownMenuRadioGroup>
                        <DropdownMenuItem>
                            <Plus/>
                            Add more
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <InputGroupButton
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