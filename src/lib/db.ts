import Dexie, { type EntityTable } from 'dexie';
import type {Chat, ChatMessage} from "@/lib/types.ts";

export const db = new Dexie("ChatDatabase") as Dexie & {
    chats: EntityTable<
        Chat,
        "id"
    >,
    messages: EntityTable<
        ChatMessage,
        "id"
    >
};

db.version(1).stores({
    chats: "id, name",
    messages: "++id, chatId, role, content"
});