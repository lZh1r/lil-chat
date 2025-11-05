import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SquareTerminal} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useEffect, useState} from "react";

export default function ChatInputSystemPrompt(
    {
        systemPrompt,
        setSystemPrompt
    }: {
        systemPrompt: string | undefined
        setSystemPrompt: (prompt: string) => void
    }
) {
    const [wipPrompt, setWipPrompt] = useState(systemPrompt);

    useEffect(() => {
        setWipPrompt(systemPrompt);
    }, [systemPrompt]);

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button
                            aria-label={"System prompt"}
                            className={"place-self-center"}
                            size={"icon-sm"}
                            variant={"outline"}
                        >
                            <SquareTerminal/>
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    System prompt
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogTitle>Customize system prompt</DialogTitle>
                <DialogDescription>
                    In this prompt you can give the llm instructions on how to behave, what to avoid and how to act.
                    Make sure it isn't too big or otherwise the context window will suffer.
                </DialogDescription>
                <Textarea
                    value={wipPrompt}
                    onChange={(e) => setWipPrompt(e.currentTarget.value)}
                    placeholder={"You are Bowser from Super Mario..."}
                    className={"basic-scroll resize-none"}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => setSystemPrompt(wipPrompt ?? "")}
                        >
                            Confirm
                        </Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}