// src/lib/server/db.ts
import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: 'localhost',
	database: process.env.POSTGRES_DB,
	password: String(process.env.POSTGRES_PASSWORD),
	port: 5432
});

export async function saveMessage({
	userId,
	role,
	content
}: {
	userId: string;
	role: string;
	content: string;
}) {
	await pool.query(
		`INSERT INTO messages(user_id, role, content, created_at) VALUES($1, $2, $3, NOW())`,
		[userId, role, content]
	);
}

export async function getMessages(userId: string) {
	const res = await pool.query(`SELECT * FROM messages WHERE user_id=$1 ORDER BY created_at`, [
		userId
	]);
	return res.rows;
}

export async function getProjects() {
	const res = await pool.query(`
    SELECT 
      id,
      project_id,
      name,
      status,
      type,
      short_description,
      full_description,
      features,
      technologies,
      tags,
      tech_stack,
      highlights,
      url,
      github_url,
      demo_url,
      homepage,
      image_url,
      language,
      category,
      is_featured,
      order_index,
      created_at,
      updated_at
    FROM projects 
    WHERE status = 'production'
    ORDER BY order_index ASC, created_at DESC
  `);
	return res.rows;
}

export async function getProjectById(projectId: string) {
	const res = await pool.query(
		`SELECT 
      id,
      project_id,
      name,
      status,
      type,
      short_description,
      full_description,
      features,
      technologies,
      tags,
      tech_stack,
      highlights,
      url,
      github_url,
      demo_url,
      homepage,
      image_url,
      language,
      category,
      is_featured,
      order_index,
      created_at,
      updated_at
    FROM projects 
    WHERE project_id = $1`,
		[projectId]
	);
	return res.rows[0];
}

export default pool;
