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
import useInstalledModels from "@/hooks/useInstalledModels.ts";
import ModelDropdownErrorState from "@/components/chat/ModelDropdownErrorState.tsx";
import {useMemo} from "react";

export default function ChatModelDropdown() {
    const navigate = useNavigate();
    const [model, setModel] = useAtom(currentModel);
    const {models, error, refresh} = useInstalledModels();

    const cloudModels = useMemo(() => {
        const list = models?.filter(m => m.remote_model !== undefined);
        const result = [];
        for (const m of list ?? []) {
            result.push(<DropdownMenuRadioItem key={m.name} value={m.name}>{m.name}</DropdownMenuRadioItem>);
        }
        return result;
    }, [models]);
    const localModels = useMemo(() => {
        const list = models?.filter(m => m.remote_model === undefined);
        const result = [];
        for (const m of list ?? []) {
            result.push(<DropdownMenuRadioItem key={m.name} value={m.name}>{m.name}</DropdownMenuRadioItem>);
        }
        return result;
    }, [models]);

    return  (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <InputGroupButton>{model}</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    error ? <ModelDropdownErrorState retry={refresh}/>
                        : <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                            <DropdownMenuRadioItem value={"auto"}>Auto</DropdownMenuRadioItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className={"flex space-x-2"}>
                                    <span className={"place-self-center font-bold"}>Cloud Models</span>
                                </DropdownMenuLabel>
                                {cloudModels}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className={"flex space-x-2"}>
                                    <span className={"place-self-center font-bold"}>Local Models</span>
                                </DropdownMenuLabel>
                                {localModels}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                        </DropdownMenuRadioGroup>
                }
                {!error && <DropdownMenuItem onClick={() => navigate("/models")}>
                    <Plus/>
                    Add more
                </DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}