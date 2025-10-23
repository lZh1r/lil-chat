import {useParams, useSearchParams} from "react-router";
import ChatInput from "@/components/ChatInput.tsx";
import {db} from "@/lib/db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import MessageBox from "@/components/MessageBox.tsx";
import type {ModelMessage, ModelRequest, ModelResponse} from "@/lib/types.ts";
import {useEffect, useRef, useState} from "react";

export default function Chat() {
    const [searchParams, _] = useSearchParams();
    const params = useParams<{chatId: string}>();
    const [pendingMessage, setPendingMessage] = useState<null | ModelMessage>(null);
    const scrollAreaRef = useRef<null | HTMLDivElement>(null);

    const messages = useLiveQuery(async () => {
        return db.messages.where("chatId").equals(params.chatId!).toArray();
    }, [params, db.messages]);

    async function sendMessage(message: string) {
        try {
            await db.messages.add({
                chatId: params.chatId!,
                role: "user",
                content: message
            });
            scrollAreaRef.current!.scrollTop = scrollAreaRef.current!.scrollHeight;
            await sendRequest(message);
        } catch (e) {
            console.log(e);
        }
    }

    async function sendRequest(message: string) {
        const context = (messages ?? []) as ModelMessage[];
        context.push({
            role: "user",
            content: message,
        });
        const requestBody: ModelRequest = {
            model: "phi4-mini:latest",
            messages: context
        };
        const response = await fetch("http://localhost:11434/api/chat", {
            method: "POST",
            body: JSON.stringify(requestBody)
        });
        const streamReader = response.body?.getReader();
        let intermediateResult;
        let result = "";
        do {
            const chunk = await streamReader?.read();
            const decoded = new TextDecoder().decode(chunk?.value);
            const decodedArray = decoded.split("\n").filter(s => s.length !== 0);
            for (const i of decodedArray) {
                intermediateResult = JSON.parse(i) as ModelResponse;
                result += intermediateResult.message.content;
                setPendingMessage({
                    role: "assistant",
                    content: result
                });
                scrollAreaRef.current!.scrollTop = scrollAreaRef.current!.scrollHeight;
            }
        } while (!intermediateResult!.done);
        db.messages.add({
            chatId: params.chatId!,
            content: result,
            role: "assistant"
        });
        setPendingMessage(null);
    }

    useEffect(() => {
        scrollAreaRef.current!.scrollTop = scrollAreaRef.current!.scrollHeight;
    }, [messages]);

    useEffect(() => {
        if (messages?.length === 0) {
            sendMessage(searchParams.get("initial")!);
        }
    }, [messages, searchParams, sendMessage]);

    return (
        <div className={"h-screen w-full flex flex-col justify-between p-2"}>
            <div
                ref={scrollAreaRef}
                className={`
                    w-2/3 max-w-2/3 p-4 max-h-[85vh] place-self-center space-y-2 wrap-anywhere overflow-y-scroll
                    [&::-webkit-scrollbar-thumb]:hover:bg-white [&::-webkit-scrollbar-thumb]:transition-all
                    [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full 
                    [&::-webkit-scrollbar-track]:bg-stone-900 [&::-webkit-scrollbar-thumb]:rounded-full 
                    [&::-webkit-scrollbar-thumb]:bg-stone-800
                `}
            >
                {
                    messages?.map(msg => <MessageBox key={msg.id} message={msg}/>)
                }
                {
                    pendingMessage && <MessageBox message={pendingMessage}/>
                }
            </div>
            <div className={"p-2 w-1/2 place-self-center fixed bottom-0"}>
                <ChatInput sendMessage={sendMessage} className={"place-self-center w-full"}/>
            </div>
        </div>
    );
}