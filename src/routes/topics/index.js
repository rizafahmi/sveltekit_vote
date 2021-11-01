import { db } from '$lib/db.js';

export async function get() {
	try {
		const topics = await db.any('SELECT * FROM topics ORDER BY vote DESC LIMIT 10');
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

export async function patch({ body, locals }) {
	const data = JSON.parse(body);
	try {
		// check dulu sebelum vote
		const res = await fetch(`${data.baseUrl}/checkvoter?sessid=${locals.user}`);
		const voter = await res.json();
		const topicsTable = await get();
		if (voter.status) {
			await db.none(`UPDATE topics SET vote=vote+1 WHERE id=${data.id}`);
		}
		// insert or update if exist
		const sql = `INSERT INTO voters (cookie) VALUES('${locals.user}') ON CONFLICT (cookie) DO UPDATE SET insert_at=NOW();`;
		await db.none(sql);

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
