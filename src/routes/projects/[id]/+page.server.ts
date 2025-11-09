// src/routes/projects/[project_id]/+page.server.ts
import { getProjectById } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const project = await getProjectById(params.id);
		console.log(params.id);
		if (!project) {
			throw error(404, 'Project not found');
		}

		return {
			project
		};
	} catch (err) {
		console.error('Database error:', err);
		throw error(500, 'Failed to fetch project');
	}
}
