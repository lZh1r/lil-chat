import {Settings} from "lucide-react";
import {InputGroupButton} from "@/components/ui/input-group.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {RequestOptions} from "@/lib/types.ts";
import {Input} from "@/components/ui/input.tsx";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAtom} from "jotai/react";
import {requestOptionsAtom} from "@/lib/atoms.ts";
import {useState} from "react";

const parseNum = (val: unknown) => {
    if (typeof val === "string") {
        if (val.length === 0) return undefined;
        return Number.parseInt(val);
    }
    return undefined;
};

const formSchema = z.object({
    seed: z.preprocess(parseNum, z.int().optional()),
    temperature: z.preprocess(parseNum, z.number().min(0).optional()),
    top_k: z.preprocess(parseNum, z.int().min(1).optional()),
    top_p: z.preprocess(parseNum, z.number().min(0).optional()),
    min_p: z.preprocess(parseNum, z.number().min(0).optional()),
    stop: z.preprocess((val) => {
        const str = String(val);
        if (str.trim().length === 0) return undefined;
        return str.split(",");
    }, z.array(z.string()).optional()),
    num_ctx: z.preprocess(parseNum, z.int().min(0).optional()),
    num_predict: z.preprocess(parseNum, z.int().min(1).optional())
});

export default function ChatInputOptions() {
    const [options, setOptions] = useAtom(requestOptionsAtom);
    const [open, setOpen] = useState(false);
    const form = useForm<z.input<typeof formSchema>, unknown, z.output<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: options
    });

    function handleSubmit(values: RequestOptions) {
        setOptions(values);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <InputGroupButton
                            aria-label={"Send message"}
                            size={"icon-sm"}
                            variant={"outline"}
                            className={"rounded-full"}
                        >
                            <Settings/>
                        </InputGroupButton>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    Options
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogTitle>Configuring request options</DialogTitle>
                <DialogDescription>
                    Here you can tweak all of the available parameters to squeeze more out of your llm's.
                </DialogDescription>
                <form className={"flex flex-col space-y-4"} onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className={"overflow-y-scroll max-h-60 basic-scroll p-1 pr-4"}>
                        <div className={"flex-col flex space-y-2"}>
                            <label>
                                Seed
                            </label>
                            <Input
                                onScroll={(e) => e.preventDefault()}
                                type={"number"}
                                step={"any"}
                                placeholder={"15436238796"}
                                {...form.register("seed")}
                            />
                            <p className={"text-destructive"}>
                                {form.formState.errors.seed?.message}
                            </p>
                        </div>
                        <div className={"flex-col flex space-y-2"}>
                            <label>
                                Temperature
                            </label>
                            <Input
                                onScroll={(e) => e.preventDefault()}
                                type={"number"}
                                step={"any"}
                                placeholder={"3.5"}
                                {...form.register("temperature")}
                            />
                            <p className={"text-destructive"}>
                                {form.formState.errors.temperature?.message}
                            </p>
                        </div>
                        <div className={"flex-col flex space-y-2"}>
                            <label>
                                Top k
                            </label>
                            <Input
                                onScroll={(e) => e.preventDefault()}
                                type={"number"}
                                step={"any"}
                                placeholder={"4"}
                                {...form.register("top_k")}
                            />
                            <p className={"text-destructive"}>
                                {form.formState.errors.top_k?.message}
                            </p>
                        </div>
                        <div className={"flex-col flex space-y-2"}>
                            <label>
                                Top p
                            </label>
                            <Input
                                onScroll={(e) => e.preventDefault()}
                                type={"number"}
                                step={"any"}
                                placeholder={"0.3"}
                                {...form.register("top_p")}
                            />
                            <p className={"text-destructive"}>
                                {form.formState.errors.top_p?.message}
                            </p>
                        </div>
                        <div className={"flex-col flex space-y-2"}>
                            <label>
                                Min p
                            </label>
                            <Input
                                onScroll={(e) => e.preventDefault()}
                                type={"number"}
                                step={"any"}
                                placeholder={"0.01"}
                                {...form.register("min_p")}
                            />
                            <p className={"text-destructive"}>
                                {form.formState.errors.min_p?.message}
                            </p>
                        </div>
                        <div className={"flex-col flex space-y-2"}>
                            <label>
                                Stop Sequence
                            </label>
                            <Input
                                spellCheck={"false"}
                                type={"text"}
                                placeholder={"\\n\\n"}
                                {...form.register("stop")}
                            />
                            <p className={"text-destructive"}>
                                {form.formState.errors.stop?.message}
                            </p>
                        </div>
                        <div className={"flex-col flex space-y-2"}>
                            <label>
                                Context length
                            </label>
                            <Input
                                onScroll={(e) => e.preventDefault()}
                                type={"number"}
                                placeholder={"4096"}
                                {...form.register("num_ctx")}
                            />
                            <p className={"text-destructive"}>
                                {form.formState.errors.num_ctx?.message}
                            </p>
                        </div>
                        <div className={"flex-col flex space-y-2"}>
                            <label>
                                Response length
                            </label>
                            <Input
                                onScroll={(e) => e.preventDefault()}
                                type={"number"}
                                placeholder={"128"}
                                {...form.register("num_predict")}
                            />
                            <p className={"text-destructive"}>
                                {form.formState.errors.num_predict?.message}
                            </p>
                        </div>
                    </div>

                    <Button>Apply</Button>
                </form>
            </DialogContent>
        </Dialog>


    );
}