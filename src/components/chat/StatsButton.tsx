import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChartBar} from "lucide-react";
import type {ModelResponse} from "@/lib/types.ts";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export default function StatsButton({responseDetails}: {responseDetails: Omit<ModelResponse, "message" | "done" | "created_at">}) {
    return (
        <Popover>
            <Tooltip>
                <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                        <Button aria-label={"Message statistics"} variant={"ghost"} size={"icon"}>
                            <ChartBar/>
                        </Button>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    See response statistics
                </TooltipContent>
            </Tooltip>
            <PopoverContent className={"text-sm space-y-2 flex flex-col w-fit"}>
                <p>Output tokens: {responseDetails.eval_count}</p>
                <p>Time elapsed: {(responseDetails.total_duration! / 10 ** 9).toFixed(2)} s</p>
                <p>Tokens per
                    second: {(responseDetails.eval_count! / responseDetails.eval_duration! * 10 ** 9).toFixed(2)}</p>
            </PopoverContent>
        </Popover>
    );
}