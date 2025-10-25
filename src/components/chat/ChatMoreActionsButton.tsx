import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Ellipsis} from "lucide-react";

export default function ChatMoreActionsButton() {
    return (
        <Popover>
            <Tooltip>
                <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                        <Button aria-label={"Message actions"} variant={"ghost"} size={"icon"}>
                            <Ellipsis/>
                        </Button>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    More actions
                </TooltipContent>
            </Tooltip>
            <PopoverContent className={"text-sm space-y-2 flex flex-col w-fit"}>
                <p>Stuff</p>
            </PopoverContent>
        </Popover>
    );
}