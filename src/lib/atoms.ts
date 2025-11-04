import {atom} from "jotai/vanilla";
import type {RequestOptions} from "@/lib/types.ts";

export const currentModel = atom("auto");
export const inProgressAtom = atom(false);
export const requestOptionsAtom = atom<RequestOptions | undefined>(undefined);
export const reasoningAtom = atom(false);