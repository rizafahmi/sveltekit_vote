import betterSqlite from 'better-sqlite3';

const db = betterSqlite('topics.db', {});

db.exec(`CREATE TABLE IF NOT EXISTS topics (
  id INTEGER PRIMARY KEY ASC,
  title TEXT,
  vote INTEGER DEFAULT 0
)`);

export async function get(request) {
	const stmt = db.prepare('SELECT * FROM topics ORDER BY vote DESC');
	const topics = stmt.all();
	return {
		body: {
			topics,
			request
		}
	};
}

export async function post({ body }) {
	let stmt;
	switch (body.action) {
		case 'reset-vote':
			stmt = db.prepare(`UPDATE topics SET vote=0`);
			stmt.run();
			break;
		case 'add':
			stmt = db.prepare(`INSERT INTO topics (title) VALUES ('${body.payload.title}')`);
			stmt.run();
			// TODO: Refresh localStorage
			break;
		case 'update':
			stmt = db.prepare(
				`UPDATE topics SET vote=${body.payload.vote} WHERE title='${body.payload.title}'`
			);
			stmt.run();
			break;
		case 'remove':
			stmt = db.prepare(`DELETE FROM topics WHERE title='${body.payload.title}'`);
			stmt.run();
			break;
	}
	const topicsApi = await get();
	return {
		headers: {
			'content-type': 'application/json'
		},
		body: {
			status: 'OK',
			body,
			topics: topicsApi.body.topics
		}
	};
}

export async function patch({ body }) {
	console.log('PATCH');
	const data = JSON.parse(body);
	const stmt = db.prepare(`UPDATE topics SET vote=vote+1 WHERE id=${data.id}`);
	stmt.run();

	const topicsTable = await get();

	return {
		body: {
			status: 'OK',
			topics: topicsTable.body.topics
		}
	};
}
