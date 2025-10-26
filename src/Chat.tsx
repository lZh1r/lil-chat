import {useParams, useSearchParams} from "react-router";
import ChatInput from "@/components/chat/ChatInput.tsx";
import {db} from "@/lib/db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import MessageBox from "@/components/chat/MessageBox.tsx";
import type {ModelMessage, ModelRequest, ModelResponse} from "@/lib/types.ts";
import {useCallback, useEffect, useState} from "react";
import {currentModel} from "@/lib/atoms.ts";
import {useAtomValue} from "jotai/react";

const defaultModel = "phi4-mini:latest";

export default function Chat() {
    const [searchParams, _] = useSearchParams();
    const {chatId} = useParams<{chatId: string}>();
    const [pendingMessage, setPendingMessage] = useState<null | ModelMessage>(null);
    const [inProgress, setInProgress] = useState(false);
    const selectedModel = useAtomValue(currentModel);

    const messages = useLiveQuery(async () => {
        return db.messages.where("chatId").equals(chatId!).toArray();
    }, [chatId, db.messages]);

    const sendRequest = useCallback(async (message: string) => {
        setInProgress(true);
        const model = selectedModel === "auto" ? defaultModel : selectedModel;
        const context = (messages ?? []) as ModelMessage[];
        context.push({
            role: "user",
            content: message,
        });
        const requestBody: ModelRequest = {
            model,
            messages: context
        };
        const response = await fetch("http://localhost:11434/api/chat", {
            method: "POST",
            body: JSON.stringify(requestBody)
        });
        const streamReader = response.body?.getReader();
        let intermediateResult: ModelResponse | undefined = undefined;
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
                window.scrollBy({left: 0, top: window.innerHeight * 1000});
            }
        } while (!intermediateResult!.done);

        db.transaction("rw", [db.responseDetails, db.messages], async tx => {
            const messageId = await tx.messages.add({
                chatId: chatId!,
                content: result,
                role: "assistant"
            });
            tx.responseDetails.add({
                messageId,
                model,
                total_duration: intermediateResult?.total_duration,
                load_duration: intermediateResult?.load_duration,
                prompt_eval_count: intermediateResult?.prompt_eval_count,
                prompt_eval_duration: intermediateResult?.prompt_eval_duration,
                eval_count: intermediateResult?.eval_count,
                eval_duration: intermediateResult?.eval_duration
            });
        });
        setInProgress(false);
        setPendingMessage(null);
    }, [selectedModel, messages]);

    const sendMessage = useCallback(async (message: string) => {
        try {
            await db.messages.add({
                chatId: chatId!,
                role: "user",
                content: message
            });
            window.scrollBy({left: 0, top: window.innerHeight * 1000});
            await sendRequest(message);
        } catch (e) {
            console.log(e);
            setPendingMessage(null);
        }
    }, [chatId, sendRequest]);

    useEffect(() => {
        window.scrollBy({left: 0, top: window.innerHeight * 1000});
    }, [messages]);

    useEffect(() => {
        if (messages?.length === 0) {
            sendMessage(searchParams.get("initial")!);
        }
    }, [messages, searchParams, sendMessage]);

    return (
        <div className={"h-screen w-full flex flex-col justify-between"}>
            <div
                className={`
                    sm:w-2/3 sm:max-w-2/3 p-4 pb-[15vh] max-md:pt-[7vh] place-self-center space-y-2 wrap-anywhere
                `}
            >
                {
                    messages?.map(msg => <MessageBox key={msg.id} message={msg}/>)
                }
                {pendingMessage && <MessageBox message={pendingMessage}/>}
            </div>
            <div className={"p-2 md:w-1/2 max-md:w-4/5 place-self-center fixed bottom-0"}>
                <ChatInput inProgress={inProgress} sendMessage={sendMessage} className={"place-self-center w-full"}/>
            </div>
        </div>
    );
}