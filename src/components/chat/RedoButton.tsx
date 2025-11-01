import {RefreshCw} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {useAtomValue} from "jotai/react";
import {inProgressAtom} from "@/lib/atoms.ts";

export default function RedoButton({handler}: {handler: () => void}) {
    const inProgress = useAtomValue(inProgressAtom);
    return (
        <Tooltip>
            <TooltipTrigger className={"group"} asChild>
                <Button
                    disabled={inProgress}
                    onClick={handler}
                    aria-label={"Redo this message"}
                    variant={"ghost"}
                    size={"icon"}
                >
                    <RefreshCw className={"group-active:rotate-360 transition-transform ease-in-out"}/>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                Redo this response
            </TooltipContent>
        </Tooltip>

    );
}