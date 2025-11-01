import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Split} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useAtomValue} from "jotai/react";
import {inProgressAtom} from "@/lib/atoms.ts";

export default function BranchButton() {
    const inProgress = useAtomValue(inProgressAtom);
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    disabled={inProgress}
                    aria-label={"Create a branch"}
                    variant={"ghost"}
                    size={"icon"}
                >
                    <Split/>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                Create chat branch
            </TooltipContent>
        </Tooltip>
    );
}