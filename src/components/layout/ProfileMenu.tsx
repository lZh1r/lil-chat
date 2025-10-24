import {Cog, LogOut, User} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export default function ProfileMenu() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button aria-label={"Open profile menu"} size={"icon-lg"} variant={"outline"}>
                    <User className={"aspect-square w-8 h-8"}/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className={"space-y-2 p-0 w-50"}>
                <div className={"flex justify-between p-2 pt-3 pl-3"}>
                    <h3>Admin</h3>
                </div>
                <Separator className={"m-0"} orientation={"horizontal"}/>
                <div className={"flex flex-col"}>
                    <Button className={"flex justify-start"} variant={"ghost"}>
                        <Cog/>
                        Settings
                    </Button>
                    <Button className={"flex justify-start"} variant={"ghost"}>
                        <LogOut/>
                        Log Out
                    </Button>
                </div>
            </PopoverContent>
        </Popover>

    );
}