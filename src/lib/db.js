import pgp from 'pg-promise';
const db_url = `${process.env['DATABASE_URL']}?ssl=false` || 'postgres://localhost:5432/live_vote';
let ssl = null;
const config = {
	connectionString: db_url
};

const db = pgp()(config);

export { pgp, db };
