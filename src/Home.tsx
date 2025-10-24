import ChatInput from "@/components/chat/ChatInput.tsx";
import {db} from "@/lib/db.ts";
import {useNavigate} from "react-router";

function Home() {

    const navigate = useNavigate();

    async function sendMessage(message: string) {
        try {
            let chatId = crypto.randomUUID();

            while (await db.chats.get({id: chatId})) chatId = crypto.randomUUID();
            await db.chats.add({
                id: chatId,
                name: `Chat ${chatId}`
            });

            navigate(`/chat/${chatId}?initial=${message}`);

        } catch (e) {
            console.log(e);
        }
    }

    return(
        <div className={"h-screen w-full flex flex-col justify-center space-y-5"}>
            <h1 className={"text-center text-3xl"}>Welcome back</h1>
            <ChatInput sendMessage={sendMessage} className={"place-self-center w-1/2"}/>
        </div>
    );
}

export default Home;
