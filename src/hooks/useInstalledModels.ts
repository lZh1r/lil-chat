import type {OllamaModel} from "@/lib/types.ts";
import {useCallback, useEffect, useState} from "react";

interface useInstalledModelsResponse {
    models: OllamaModel[] | undefined
    refresh: () => void
    error: boolean
}

export default function useInstalledModels(): useInstalledModelsResponse {
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

    const refresh = useCallback(async () => {
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
        refresh();
    }, [refresh]);

    return {models, refresh, error};
}