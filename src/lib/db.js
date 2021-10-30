import pgp from 'pg-promise';
const db_url = process.env['DATABASE_URL'] || 'postgres://localhost:5432/live_vote';
let ssl = null;
if (process.env['NODE_ENV'] !== 'development') {
	ssl = {
		rejectUnauthorized: false
	};
}
const config = {
	connectionString: db_url,
	ssl
};

const db = pgp()(config);

(async function setup() {
	await db.none(`CREATE TABLE IF NOT EXISTS topics (
  id SERIAL PRIMARY KEY,
  title TEXT UNIQUE,
  vote INTEGER DEFAULT 0,
  show BOOLEAN DEFAULT true
);
CREATE TABLE IF NOT EXISTS voters (
id SERIAL PRIMARY KEY,
cookie TEXT,
insert_at TIMESTAMP DEFAULT NOW()
)`);
})();

export { pgp, db };
