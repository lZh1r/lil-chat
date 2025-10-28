import {useParams, useSearchParams} from "react-router";
import ChatInput from "@/components/chat/ChatInput.tsx";
import {db} from "@/lib/db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import MessageBox from "@/components/chat/MessageBox.tsx";
import type {ModelMessage, ModelRequest, ModelResponse} from "@/lib/types.ts";
import {useCallback, useEffect, useRef, useState} from "react";
import {currentModel} from "@/lib/atoms.ts";
import {useAtomValue} from "jotai/react";
import useScroll from "@/hooks/useScroll.ts";

const defaultModel = "phi4-mini:latest";

export default function Chat() {
    const [searchParams, _] = useSearchParams();
    const {chatId} = useParams<{chatId: string}>();
    const [inProgress, setInProgress] = useState(false);
    const selectedModel = useAtomValue(currentModel);
    const [error, setError] = useState<null | string>(null);
    const currentMessageIdRef = useRef<null | number>(null);
    const scroll = useScroll();

    const messages = useLiveQuery(async () => {
        return db.messages.where("chatId").equals(chatId!).toArray();
    }, [chatId, db.messages]);

    const sendRequest = useCallback(async (message: string, messageId?: number) => {
        setError(null);
        setInProgress(true);
        const model = selectedModel === "auto" ? defaultModel : selectedModel;
        let context = (messages ?? []) as ModelMessage[];
        if (!messageId) {
            context.push({
                role: "user",
                content: message,
            });
        } else {
            const target = await db.messages.get(messageId);
            const index = messages?.findIndex(msg => msg.id === target?.id);
            context = context.slice(0, index);
        }

        const requestBody: ModelRequest = {
            model,
            messages: context
        };

        try {
            const response = await fetch("http://localhost:11434/api/chat", {
                method: "POST",
                body: JSON.stringify(requestBody)
            });
            if (!messageId) {
                currentMessageIdRef.current = await db.messages.add(
                    {
                        chatId: chatId!,
                        content: "",
                        role: "assistant"
                    }
                );
            } else currentMessageIdRef.current = messageId;

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
                    await db.messages.put({
                        id: currentMessageIdRef.current,
                        chatId: chatId!,
                        role: "assistant",
                        content: result
                    });
                    scroll();
                }
            } while (!intermediateResult!.done);

            await db.responseDetails.put({
                    messageId: currentMessageIdRef.current,
                    chatId: chatId!,
                    model,
                    total_duration: intermediateResult?.total_duration,
                    load_duration: intermediateResult?.load_duration,
                    prompt_eval_count: intermediateResult?.prompt_eval_count,
                    prompt_eval_duration: intermediateResult?.prompt_eval_duration,
                    eval_count: intermediateResult?.eval_count,
                    eval_duration: intermediateResult?.eval_duration
            });
        } catch (e) {
            console.log(e);
            setError((e as Error).message);
            if (currentMessageIdRef.current) {
                db.messages.delete(currentMessageIdRef.current);
                currentMessageIdRef.current = null;
            }
        }

        setInProgress(false);
    }, [selectedModel, messages, chatId, scroll]);

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
        }
    }, [chatId, sendRequest]);

    useEffect(() => {
        scroll();
    }, [messages, scroll]);

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
                    messages?.map(msg => <MessageBox key={msg.id} sendRequest={sendRequest} message={msg}/>)
                }
                {/*{pendingMessage && <MessageBox message={pendingMessage}/>}*/}
                {error && <p className={"text-muted-foreground"}>Something went wrong...</p>}
            </div>
            <div className={"p-2 md:w-1/2 max-md:w-4/5 place-self-center fixed bottom-0"}>
                <ChatInput inProgress={inProgress} sendMessage={sendMessage} className={"place-self-center w-full"}/>
            </div>
        </div>
    );
}