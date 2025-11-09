// src/lib/utils/chatStorage.ts
import { browser } from '$app/environment';

export interface ChatMessage {
	role: 'user' | 'assistant';
	content: string;
	timestamp: Date;
}

// Type pour les messages stockés (timestamp en string)
interface StoredChatMessage {
	role: 'user' | 'assistant';
	content: string;
	timestamp: string;
}

const STORAGE_KEY = 'portfolio_chat_messages';

/**
 * Charge les messages depuis le sessionStorage
 */
export function loadMessages(): ChatMessage[] {
	if (!browser) return [];

	try {
		const stored = sessionStorage.getItem(STORAGE_KEY);
		if (!stored) return [];

		const parsed = JSON.parse(stored) as StoredChatMessage[];
		// Reconvertir les timestamps en objets Date
		return parsed.map((msg) => ({
			...msg,
			timestamp: new Date(msg.timestamp)
		}));
	} catch (error) {
		console.error('Erreur lors du chargement des messages:', error);
		return [];
	}
}

/**
 * Sauvegarde les messages dans le sessionStorage
 */
export function saveMessages(messages: ChatMessage[]): void {
	if (!browser) return;

	try {
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
	} catch (error) {
		console.error('Erreur lors de la sauvegarde des messages:', error);
	}
}

/**
 * Efface tous les messages
 */
export function clearMessages(): void {
	if (!browser) return;
	sessionStorage.removeItem(STORAGE_KEY);
}
