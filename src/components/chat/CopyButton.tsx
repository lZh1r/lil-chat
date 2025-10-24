import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ClipboardCopy} from "lucide-react";
import {useState} from "react";

export default function CopyButton({text}: {text: string}) {

    const [copied, setCopied] = useState(false);

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={() => {
                            window.navigator.clipboard.writeText(text).then(() => {
                                setCopied(true);
                                setTimeout(() => setCopied(false), 200);
                            });
                        }}
                        variant={"ghost"}
                        size={"icon"}>
                        <ClipboardCopy className={`transition-transform ease-in-out duration-200 ${copied && "rotate-180"}`}/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Copy text
                </TooltipContent>
            </Tooltip>
        </>

    );
}