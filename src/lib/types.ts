export type ModelMessage = Pick<ChatMessage, "role" | "content"> & {images?: string | null}

export interface ModelRequest {
    model: string
    messages: ModelMessage[]
    options?: Partial<RequestOptions>
    think?: boolean | "high" | "medium" | "low"
}
export interface ModelResponse {
    model: string
    created_at: string
    message: ModelMessage
    done: boolean
    total_duration?: number
    load_duration?: number
    prompt_eval_count?: number
    prompt_eval_duration?: number
    eval_count?: number
    eval_duration?: number
}

export interface Chat {
    id: string
    name: string
    system_prompt: string | undefined
}

export interface ChatMessage {
    id: number
    chatId: string
    role: "system" | "user" | "assistant" | "tool"
    content: string
}

export type ParameterCount = `${number}${"M" | "B" | "T"}`

export interface OllamaModelDetails {
    parent_model?: string
    format: string
    family: string
    families?: string[]
    parameter_size: ParameterCount
    quantization_level: string
}

export interface OllamaModel {
    details: OllamaModelDetails
    digest: string
    model: string
    modified_at: string
    name: string
    remote_host?: string
    remote_model?: string
    size: number
}

export interface RequestOptions {
    seed?: number
    temperature?: number
    top_k?: number
    top_p?: number
    min_p?: number
    stop?: string[]
    num_ctx?: number
    num_predict?: number
}