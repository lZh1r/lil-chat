import {useNavigate} from "react-router";
import {Plus} from "lucide-react";
import {useAtom} from "jotai/react";
import {currentModel} from "@/lib/atoms.ts";
import {InputGroupButton} from "@/components/ui/input-group.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

export default function ChatModelDropdown() {
    const navigate = useNavigate();
    const [model, setModel] = useAtom(currentModel);

    return  (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <InputGroupButton>{model}</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                    <DropdownMenuRadioItem value={"auto"}>Auto</DropdownMenuRadioItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className={"flex space-x-2"}>
                            <span className={"place-self-center font-bold"}>Cloud Models</span>
                        </DropdownMenuLabel>
                        <DropdownMenuRadioItem value={"gpt-oss-120b"}>GPT OSS 120B</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value={"kimi-k2-1t"}>Kimi K2 1T</DropdownMenuRadioItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className={"flex space-x-2"}>
                            <span className={"place-self-center font-bold"}>Local Models</span>
                        </DropdownMenuLabel>
                        <DropdownMenuRadioItem value={"mistral-7B"}>Mistral 7B</DropdownMenuRadioItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                </DropdownMenuRadioGroup>
                <DropdownMenuItem onClick={() => navigate("/models")}>
                    <Plus/>
                    Add more
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}