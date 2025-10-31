import {RefreshCw} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export default function RedoButton({handler}: {handler: () => void}) {
    return (
        <Tooltip>
            <TooltipTrigger className={"group"} asChild>
                <Button
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