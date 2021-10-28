import { db } from '$lib/db.js';

(async function setup() {
	await db.none(`CREATE TABLE IF NOT EXISTS topics (
  id SERIAL PRIMARY KEY,
  title TEXT UNIQUE,
  vote INTEGER DEFAULT 0,
  show BOOLEAN DEFAULT true
)`);
})();

export async function get() {
	try {
		const topics = await db.any('SELECT * FROM topics ORDER BY vote DESC LIMIT 6');
		return {
			body: {
				topics
			}
		};
	} catch (error) {
		return {
			body: {
				status: 'KO',
				error
			}
		};
	}
}

export async function patch({ body }) {
	const data = JSON.parse(body);
	try {
		await db.none(`UPDATE topics SET vote=vote+1 WHERE id=${data.id}`);
		const topicsTable = await get();

		return {
			body: {
				status: 'OK',
				topics: topicsTable.body.topics
			}
		};
	} catch (error) {
		return {
			body: {
				status: 'KO',
				error
			}
		};
	}
}
