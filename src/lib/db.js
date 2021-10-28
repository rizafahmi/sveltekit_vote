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

export { pgp, db };
