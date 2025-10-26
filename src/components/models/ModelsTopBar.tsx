import {Button} from "@/components/ui/button.tsx";
import {Plus, RefreshCw} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Input} from "@/components/ui/input.tsx";

export default function ModelsTopBar(
    {
        refresh,
        dialogState,
        openDialog,
        searchQuery,
        setSearchQuery
    }: {
        refresh: () => void,
        dialogState: boolean,
        openDialog: (state: boolean) => void,
        searchQuery: string,
        setSearchQuery: (query: string) => void
    }
) {
    return (
        <div className={"flex space-x-4 p-2"}>
            <Tooltip>
                <TooltipTrigger
                    asChild
                    className={"group"}
                >
                    <Button
                        size={"icon"}
                        onClick={() => openDialog(!dialogState)}
                    >
                        <Plus className={"group-hover:scale-120 transition-transform"}/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Add more models
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger className={"group"} asChild>
                    <Button
                        onClick={refresh}
                        variant={"outline"}
                        size={"icon"}
                    >
                        <RefreshCw className={"group-active:rotate-360 group-hover:rotate-360 transition-transform ease-in-out"}/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Refresh
                </TooltipContent>
            </Tooltip>
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                placeholder={"Search for models..."}
                className={"float-end"}/>
        </div>
    );
}