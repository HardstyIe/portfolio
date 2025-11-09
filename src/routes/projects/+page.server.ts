// src/routes/projects/+page.server.ts
import { getProjects } from '$lib/server/db';

export async function load() {
	try {
		const projects = await getProjects();
		return {
			projects
		};
	} catch (error) {
		console.error('Database error:', error);
		return {
			projects: [],
			error: 'Failed to fetch projects'
		};
	}
}
