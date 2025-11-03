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
