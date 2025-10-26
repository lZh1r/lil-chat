import {Button} from "@/components/ui/button.tsx";
import {RefreshCw} from "lucide-react";

export default function ModelListErrorState({retry}: {retry: () => void}) {
    return (
        <div className={"text-center"}>
            <h3>Looks like something went wrong!</h3>
            <p>Make sure Ollama is running (<code>ollama serve</code>) and try again.</p>
            <Button
                onClick={retry}
                className={"mt-2 group"}>
                <RefreshCw className={"group-active:rotate-360 transition-transform"}/>
                Refresh
            </Button>
        </div>
    );
}