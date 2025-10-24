import {RefreshCw} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export default function RedoButton() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button aria-label={"Redo this message"} variant={"ghost"} size={"icon"}>
                    <RefreshCw/>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                Redo this response
            </TooltipContent>
        </Tooltip>

    );
}