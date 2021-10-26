import pgp from 'pg-promise';
const db_url = process.env['DATABASE_URL'] || 'postgres://localhost:5432/live_vote';
let ssl = null;
const config = {
	connectionString: db_url,
	ssl: {
		rejectUnauthorized: false
	}
};

const db = pgp()(config);

export { pgp, db };
