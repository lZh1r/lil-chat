import Dexie, { type EntityTable } from 'dexie';
import type {Chat, ChatMessage, ModelResponse} from "@/lib/types.ts";

export const db = new Dexie("ChatDatabase") as Dexie & {
    chats: EntityTable<
        Chat,
        "id"
    >,
    messages: EntityTable<
        ChatMessage,
        "id"
    >,
    responseDetails: EntityTable<
        {messageId: number} & Omit<ModelResponse, "message" | "done" | "created_at">,
        "messageId"
    >
};

db.version(1).stores({
    chats: "id, name",
    messages: "++id, chatId, role, content",
    responseDetails: "messageId, model, total_duration, load_duration, prompt_eval_count, prompt_eval_duration, eval_count"
});