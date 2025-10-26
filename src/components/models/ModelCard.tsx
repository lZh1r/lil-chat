import type {OllamaModel} from "@/lib/types.ts";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Cloud} from "lucide-react";
import ModelMoreActionsButton from "@/components/models/ModelMoreActionsButton.tsx";

export default function ModelCard({model}: {model: OllamaModel}) {
    return (
        <Card className={"p-4"}>
            <CardHeader className={"p-0 flex justify-between"}>
                <div className={"flex space-x-2"}>
                    {model.remote_model && <Tooltip>
                        <TooltipTrigger>
                            <Cloud/>
                        </TooltipTrigger>
                        <TooltipContent>
                            Cloud Model
                        </TooltipContent>
                    </Tooltip>}
                    <p className={"text-lg wrap-anywhere"}>{model.name}</p>
                    {/*<span className={"text-sm text-muted-foreground place-self-center"}>{model.model}</span>*/}
                </div>
                <ModelMoreActionsButton/>
            </CardHeader>
            <CardContent className={"font-light flex flex-col space-y-2 text-muted-foreground"}>
                <span>Parameters: {model.details.parameter_size}</span>
                <span>Quantization level: {model.details.quantization_level}</span>
                <span>Family: {model.details.family}</span>
                <span>Modified at: {(new Date(model.modified_at)).toLocaleString()}</span>
            </CardContent>
        </Card>
    );
}