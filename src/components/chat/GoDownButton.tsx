import {Button} from "@/components/ui/button.tsx";
import {ArrowDown} from "lucide-react";

export default function GoDownButton({setActive}: {setActive: (s: boolean) => void}) {
    return (
        <div className={"w-full flex justify-center"}>
            <Button
                size={"icon-lg"}
                aria-label={"Go to the bottom"}
                className={"bg-stone-900 text-foreground hover:bg-stone-800 rounded-full pointer-events-auto"}
                onClick={() => {
                    scroll();
                    setActive(true);
                }}
            >
                <ArrowDown/>
            </Button>
        </div>
    );
}