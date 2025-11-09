// src/routes/api/projects/[project_id]/+server.ts
import { getProjectById } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	try {
		const project = await getProjectById(params.project_id);

		if (!project) {
			return json({ error: 'Project not found' }, { status: 404 });
		}

		return json(project);
	} catch (error) {
		console.error('Database error:', error);
		return json({ error: 'Failed to fetch project' }, { status: 500 });
	}
}
