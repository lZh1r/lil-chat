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