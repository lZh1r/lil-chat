import {useCallback, useEffect, useState} from "react";
import type {OllamaModel} from "@/lib/types.ts";
import ModelCard from "@/components/models/ModelCard.tsx";
import AddModelDialog from "@/components/models/AddModelDialog.tsx";
import ModelListErrorState from "@/components/models/ModelListErrorState.tsx";

export default function Models() {
    const [models, setModels] = useState<undefined | OllamaModel[]>(undefined);
    const [error, setError] = useState(false);

    const fetchModels = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:11434/api/tags");
            return await response.json() as unknown as { models: OllamaModel[] };
        } catch (e) {
            console.log(e);
            setError(true);
        }
    }, []);

    const tryFetch = useCallback(async () => {
        setError(false);
        try {
            const models = await fetchModels();
            setModels(models?.models);
        } catch (e) {
            console.log(e);
            setError(true);
        }
    }, [fetchModels]);

    useEffect(() => {
        tryFetch();
    }, [tryFetch]);
//grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 auto-rows-max
    return (
        <div className={"w-full md:pt-[4rem] p-4 flex flex-col gap-2"}>
            {
                error ? <ModelListErrorState retry={tryFetch}/>
                    : models && models.map((model) => <ModelCard key={model.model} model={model}/>)
            }
            {!error && <AddModelDialog/>}
        </div>
    );
}