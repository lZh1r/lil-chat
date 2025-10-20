import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea} from "@/components/ui/input-group.tsx";
import {ArrowUp, Plus} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {useState} from "react";

export default function ChatInput() {
    const [model, setModel] = useState("auto");

    return (
        <InputGroup className={"w-1/2 place-self-center rounded-2xl"}>
            <InputGroupTextarea placeholder={"Ask your hot local llm mommy..."}/>
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
                >
                    <ArrowUp/>
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    );
}