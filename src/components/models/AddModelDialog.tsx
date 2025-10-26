import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";

export default function AddModelDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"flex"} variant={"outline"}>
                    <Plus/>
                    Add more
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add a new model</DialogTitle>
                <DialogDescription>
                    Pull a model from supported providers
                </DialogDescription>
                <label htmlFor={"modelId"}>Model name</label>
                <Input id={"modelId"} placeholder={"i.e. llama3.2:latest"}/>
                <DialogFooter className={"flex place-self-end space-x-2"}>
                    <DialogClose asChild>
                        <Button variant={"outline"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button>
                        Add
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}