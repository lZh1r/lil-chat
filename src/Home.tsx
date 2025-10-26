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
            <ChatInput inProgress={false} sendMessage={sendMessage} className={"place-self-center max-md:w-4/5 md:w-2/3 lg:w-1/2"}/>
        </div>
    );
}

export default Home;
