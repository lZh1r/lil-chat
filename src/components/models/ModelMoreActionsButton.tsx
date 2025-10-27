import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Ellipsis, Trash} from "lucide-react";
import type {OllamaModel} from "@/lib/types.ts";

export default function ModelMoreActionsButton(
    {
        model,
        refresh
    }: {
        model: OllamaModel,
        refresh: () => void
    }
) {
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
            <PopoverContent className={"text-sm space-y-2 flex flex-col w-fit p-0"}>
                <Button
                    onClick={() => {
                        fetch(
                            "http://localhost:11434/api/delete",
                            {
                                method: "DELETE",
                                body: JSON.stringify({
                                    model: model.name
                                })
                            }
                        ).then(_ => refresh());
                    }}
                    className={"flex space-x-4 text-destructive"}
                    variant={"outline"}
                >
                    <Trash/>
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    );
}