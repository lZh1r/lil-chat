import {useParams} from "react-router";
import ChatInput from "@/components/ChatInput.tsx";
import {db} from "@/db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import MessageBox from "@/components/MessageBox.tsx";

export default function Chat() {
    const params = useParams<{chatId: string}>();

    const messages = useLiveQuery(async () => {
        return db.messages.where("chatId").equals(params.chatId!).toArray();
    }, [params, db.messages]);

    return (
        <div className={"h-screen w-full flex flex-col justify-between"}>
            <div className={"w-1/2 p-4 h-full place-self-center"}>
                {
                    messages?.map(msg => <MessageBox key={msg.id} message={msg}/>)
                }
            </div>
            <div className={"p-4 w-1/2 place-self-center"}>
                <ChatInput sendMessage={(_) => {}} className={"place-self-center w-full"}/>
            </div>
        </div>
    );
}