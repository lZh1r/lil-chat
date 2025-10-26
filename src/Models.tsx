import ModelCard from "@/components/models/ModelCard.tsx";
import AddModelDialog from "@/components/models/AddModelDialog.tsx";
import ModelListErrorState from "@/components/models/ModelListErrorState.tsx";
import useInstalledModels from "@/hooks/useInstalledModels.ts";

export default function Models() {
    const {models, error, refresh} = useInstalledModels();
//grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 auto-rows-max
    return (
        <div className={"w-full md:pt-[4rem] p-4 flex flex-col gap-2"}>
            {
                error ? <ModelListErrorState retry={refresh}/>
                    : models && models.map((model) => <ModelCard key={model.model} model={model}/>)
            }
            {!error && <AddModelDialog/>}
        </div>
    );
}