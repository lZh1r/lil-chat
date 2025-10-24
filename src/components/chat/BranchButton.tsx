import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Split} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export default function BranchButton() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button aria-label={"Create a branch"} variant={"ghost"} size={"icon"}>
                    <Split/>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                Create chat branch
            </TooltipContent>
        </Tooltip>
    );
}