import { getMessages, saveMessage } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { chatInput, userId, sessionId } = await request.json();

	// Génération automatique d'un sessionId si absent
	const sid = sessionId || `${userId}-${Date.now()}`;

	// Récupération de l'historique
	const history = await getMessages(userId);

	// Sauvegarde du message utilisateur
	await saveMessage({ userId, role: 'user', content: chatInput });

	// Vérification de l'URL du webhook
	const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
	if (!n8nWebhookUrl) {
		return new Response(JSON.stringify({ error: 'N8N_WEBHOOK_URL not configured' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Appel à n8n
	const n8nResponse = await fetch(n8nWebhookUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ chatInput, userId, history, sessionId: sid })
	});

	if (!n8nResponse.ok) {
		return new Response(
			JSON.stringify({ error: 'n8n request failed', status: n8nResponse.status }),
			{
				status: 502,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}

	const text = await n8nResponse.text();

	let data;
	try {
		data = JSON.parse(text);
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON from n8n', raw: text }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Récupération de l'output
	const reply = Array.isArray(data) ? data[0]?.output : (data?.output ?? null);

	if (!reply) {
		return new Response(JSON.stringify({ error: 'Empty reply from n8n', raw: data }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Sauvegarde de la réponse de l'assistant et retour au client
	await saveMessage({ userId, role: 'assistant', content: reply });

	return new Response(JSON.stringify({ reply, sessionId: sid }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
