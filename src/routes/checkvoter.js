import { db } from '$lib/db.js';

export async function get({ query }) {
	const sessid = query.get('sessid');
	const sql = `SELECT cookie FROM voters WHERE cookie='${sessid}' AND insert_at + INTERVAL '1 day' >= NOW()`;
	const voters = await db.any(sql);
	console.log(voters.length > 0);
	return { body: { status: voters.length > 0 } };
}
