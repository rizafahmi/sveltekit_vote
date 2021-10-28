import { db } from '$lib/db.js';

export async function post({ body }) {
	const { message, amount_raw } = body;
	const boost = Math.floor(amount_raw / 1000);

	let sql = `SELECT id, title FROM topics`;
	const topics = await db.any(sql);
	for (let i = 0; i < topics.length; i += 1) {
		const words = topics[i].title.split(' ');
		for (let j = 0; j < words.length; j += 1) {
			if (message.toLowerCase().indexOf(words[j].toLowerCase()) > -1) {
				sql = `UPDATE topics SET vote = vote + ${boost} WHERE id=${topics[i].id}`;
				await db.none(sql);
				console.log(`Boost: ${topics[i].title} ${boost}x`);
			}
		}
	}

	return {
		body: {
			status: 'OK',
			topics
		}
	};
}
