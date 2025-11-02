import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Ellipsis, Trash} from "lucide-react";
import {db} from "@/lib/db.ts";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel
} from "@/components/ui/alert-dialog.tsx";

export default function ChatMoreActionsButton({id}: {id: number | undefined}) {
    async function deleteMessage(id: number | undefined) {
        if (!id) return;
        try {
            await db.messages.delete(id);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Popover>
            <Tooltip>
                <TooltipTrigger className={"group"} asChild>
                    <PopoverTrigger asChild>
                        <Button aria-label={"Message actions"} variant={"ghost"} size={"icon"}>
                            <Ellipsis className={"group-active:scale-120 transition-transform"}/>
                        </Button>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    More actions
                </TooltipContent>
            </Tooltip>
            <PopoverContent className={"text-sm p-0 space-y-2 flex flex-col w-fit"}>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={"text-destructive"}
                        >
                            <Trash/>
                            Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button variant={"destructive"} onClick={() => deleteMessage(id)}>
                                    Delete
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>

                </AlertDialog>

            </PopoverContent>
        </Popover>
    );
}