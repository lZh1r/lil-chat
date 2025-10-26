import {useCallback, useEffect, useState} from "react";
import type {OllamaModel} from "@/lib/types.ts";
import ModelCard from "@/components/models/ModelCard.tsx";
import AddModelDialog from "@/components/models/AddModelDialog.tsx";

export default function Models() {
    const [models, setModels] = useState<null | OllamaModel[]>(null);

    const fetchModels = useCallback(async () => {
        return await fetch("http://localhost:11434/api/tags")
            .then((res) => res.json() as unknown as {models: OllamaModel[]});
    }, []);

    useEffect(() => {
        fetchModels().then(list => setModels(list.models));
    }, [fetchModels]);
//grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 auto-rows-max
    return (
        <div className={"w-full md:pt-[4rem] p-4 flex flex-col gap-2"}>
            {
                models && models.map((model) => <ModelCard key={model.model} model={model}/>)
            }
            <AddModelDialog/>
        </div>
    );
}