export type ModelMessage = Pick<ChatMessage, "role" | "content"> & {images?: string | null}

export interface ModelRequest {
    model: string,
    messages: ModelMessage[]
}
export interface ModelResponse {
    model: string,
    created_at: string,
    message: ModelMessage,
    done: boolean,
    total_duration?: number,
    load_duration?: number,
    prompt_eval_count?: number,
    prompt_eval_duration?: number,
    eval_count?: number,
    eval_duration?: number
}

export interface Chat {
    id: string,
    name: string,
}

export interface ChatMessage {
    id: number,
    chatId: string,
    role: "system" | "user" | "assistant" | "tool",
    content: string,
}