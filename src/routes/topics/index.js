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

export async function post(request) {
	console.log(request);
	return {
		body: {
			status: 'OK',
			request
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
