import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {useRef, useState} from "react";

interface PullResult {
    status: string
    digest?: string
    total?: number
    completed?: number
}

export default function AddModelDialog(
    {
        open,
        setOpen
    }: {
        open: boolean,
        setOpen: (state: boolean) => void
    }
) {
    const [model, setModel] = useState("");
    const [result, setResult] = useState<null | PullResult>(null);
    const [inProgress, setInProgress] = useState(false);
    const readerRef = useRef<null | ReadableStreamDefaultReader<Uint8Array>>(null);

    async function pullModel(model: string) {
        try {
            setInProgress(true);
            const response = await fetch("http://localhost:11434/api/pull",
                {
                    method: "POST",
                    body: JSON.stringify({model: model})
                }
            );
            const reader = response.body?.getReader();
            readerRef.current = reader!;
            let chunk;
            do {
                chunk = await readerRef.current.read();
                const decoded = new TextDecoder().decode(chunk?.value);
                console.log(decoded);
                const split = decoded.split("\n").filter(e => e.length !== 0);
                setResult(JSON.parse(split[split.length - 1]));
                if (decoded.includes("error") || decoded.includes("success")) break;
            } while (chunk);
            setInProgress(false);
        } catch (e) {
            console.log(e);
            setInProgress(false);
        }
    }

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                className={"flex"}
                variant={"outline"}
            >
                <Plus/>
                Add more
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogTitle>Add a new model</DialogTitle>
                    <DialogDescription>
                        Pull a model from supported providers
                    </DialogDescription>
                    <label htmlFor={"modelId"}>Model name</label>
                    <Input
                        value={model}
                        onChange={e => setModel(e.currentTarget.value)}
                        id={"modelId"}
                        placeholder={"i.e. llama3.2:latest"}
                    />
                    {
                        result &&
                        <div>
                            <p>Status: {result.status}</p>
                            {
                                result.total &&
                                <p className={"flex space-x-2"}>
                                    <span>
                                        Downloading: {(result.completed! / 1000**3).toFixed(2)}GB
                                        / {(result.total / 1000 **3).toFixed(2)}GB
                                    </span>
                                    <span>({(result.completed! / result.total * 100).toFixed(2)}%)</span>
                                </p>
                            }
                        </div>
                    }
                    <DialogFooter className={"flex place-self-end space-x-2"}>
                        <DialogClose asChild>
                            <Button
                                onClick={() => {
                                    readerRef.current?.cancel();
                                    setResult(null);
                                }}
                                variant={"outline"}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={inProgress}
                            onClick={() => {
                                pullModel(model);
                            }}
                        >
                            Add
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>

    );
}