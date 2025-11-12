interface Project {
	id: number;
	project_id: string;
	name: string;
	status: string;
	type: string;
	short_description: string;
	full_description: string;
	features: string;
	technologies: string;
	tags: string;
	tech_stack: string;
	highlights: string;
	url: string;
	github_url: string;
	demo_url: string;
	homepage: string;
	image_url: string;
	language: string;
	category: string;
	is_featured: boolean;
	order_index: number;
	created_at: string;
	updated_at: string;
}

export type { Project };
