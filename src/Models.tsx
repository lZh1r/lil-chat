import ModelCard from "@/components/models/ModelCard.tsx";
import AddModelDialog from "@/components/models/AddModelDialog.tsx";
import ModelListErrorState from "@/components/models/ModelListErrorState.tsx";
import useInstalledModels from "@/hooks/useInstalledModels.ts";
import ModelsTopBar from "@/components/models/ModelsTopBar.tsx";
import {useState} from "react";

export default function Models() {
    const {models, error, refresh} = useInstalledModels();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className={"w-full md:pt-[4rem] p-4 flex flex-col gap-2"}>
            <ModelsTopBar
                dialogState={dialogOpen}
                openDialog={setDialogOpen}
                refresh={refresh}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {
                error ? <ModelListErrorState retry={refresh}/>
                    : models && models.filter(m => m.name.includes(searchQuery))
                    .map((model) => <ModelCard key={model.model} model={model}/>)
            }
            {!error && <AddModelDialog open={dialogOpen} setOpen={setDialogOpen}/>}
        </div>
    );
}