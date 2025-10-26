import {Button} from "@/components/ui/button.tsx";
import {RefreshCw} from "lucide-react";

export default function ModelDropdownErrorState({retry}: {retry: () => void}) {
    return (
        <div className={"p-2 flex flex-col"}>
            <p className={"mb-2"}>Failed to fetch local models!</p>
            <p>Make sure Ollama is running</p>
            <span>(run <code>ollama serve</code>)</span>
            <Button
                onClick={retry}
                className={"mt-2 group"}>
                <RefreshCw className={"group-active:rotate-360 transition-transform"}/>
                Refresh
            </Button>
        </div>
    );
}