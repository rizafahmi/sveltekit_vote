import { db } from '$lib/db.js';

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

export async function patch({ body, request }) {
	console.log(request);
	const data = JSON.parse(body);
	try {
		// await db.none(`UPDATE topics SET vote=vote+1 WHERE id=${data.id}`);
		const topicsTable = await get();
		// await db.none(`INSERT INTO voters (cookie) VALUES(${cookie})`);

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
