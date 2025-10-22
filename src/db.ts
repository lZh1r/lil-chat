import Dexie, { type EntityTable } from 'dexie';

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