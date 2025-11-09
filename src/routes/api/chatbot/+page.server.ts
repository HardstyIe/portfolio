// src/routes/api/chatbot/+page.server.ts
import { saveMessage } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	sendMessage: async ({ request, cookies }) => {
		try {
			const data = await request.formData();
			const chatInput = data.get('message') as string;

			// Récupérer userId depuis la session/cookies
			// Ajuste selon ton système d'authentification
			const userId = cookies.get('userId') || 'anonymous';
			const sessionId = cookies.get('sessionId') || `${userId}-${Date.now()}`;

			// Sauvegarder le sessionId dans les cookies pour les prochaines requêtes
			cookies.set('sessionId', sessionId, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // 24 heures
			});

			if (!chatInput?.trim()) {
				return fail(400, { error: 'Message vide' });
			}

			// Sauvegarde du message utilisateur
			await saveMessage({ userId, role: 'user', content: chatInput });

			const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
			if (!n8nWebhookUrl) {
				return fail(500, { error: 'N8N_WEBHOOK_URL not configured' });
			}

			const payload = { chatInput, userId, sessionId };
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 120000);

			let n8nResponse;
			try {
				n8nResponse = await fetch(n8nWebhookUrl, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload),
					signal: controller.signal
				});
				clearTimeout(timeoutId);
			} catch (fetchError) {
				clearTimeout(timeoutId);
				if (fetchError instanceof Error && fetchError.name === 'AbortError') {
					return fail(504, {
						error: 'n8n timeout (120s)',
						details: 'Request took too long'
					});
				}
				const details = fetchError instanceof Error ? fetchError.message : String(fetchError);
				return fail(502, {
					error: 'Failed to connect to n8n',
					details,
					url: n8nWebhookUrl
				});
			}

			if (!n8nResponse.ok) {
				const errorText = await n8nResponse.text();
				return fail(502, {
					error: 'n8n request failed',
					status: n8nResponse.status,
					body: errorText.substring(0, 500)
				});
			}

			const text = await n8nResponse.text();
			let responseData;
			try {
				responseData = JSON.parse(text);
			} catch {
				return fail(500, {
					error: 'Invalid JSON from n8n',
					raw: text.substring(0, 500)
				});
			}

			let reply: string | null = null;
			if (Array.isArray(responseData) && responseData.length > 0) {
				const firstItem = responseData[0];
				if (typeof firstItem === 'string') {
					reply = firstItem;
				} else if (firstItem?.output) {
					reply = firstItem.output;
				} else if (firstItem?.content?.[0]?.text) {
					reply = firstItem.content[0].text;
				}
			} else if (responseData?.output) {
				reply = responseData.output;
			} else if (responseData?.content?.[0]?.text) {
				reply = responseData.content[0].text;
			}

			if (!reply) {
				return fail(500, {
					error: 'Empty or invalid reply from n8n',
					dataReceived: responseData
				});
			}

			// Sauvegarde de la réponse
			await saveMessage({ userId, role: 'assistant', content: reply });

			return {
				success: true,
				message: reply,
				sessionId
			};
		} catch (error) {
			let message: string;
			let stack: string | undefined;

			if (error instanceof Error) {
				message = error.message;
				stack = error.stack;
			} else {
				try {
					message = JSON.stringify(error);
				} catch {
					message = String(error);
				}
			}

			return fail(500, {
				error: 'Internal server error',
				message,
				stack
			});
		}
	}
} satisfies Actions;
