// src/routes/api/projects/+server.ts
import { getProjects } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function GET() {
	try {
		const projects = await getProjects();
		return json(projects);
	} catch (error) {
		console.error('Database error:', error);
		return json({ error: 'Failed to fetch projects' }, { status: 500 });
	}
}
