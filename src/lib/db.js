import pgp from 'pg-promise';
const db_url = process.env['DATABASE_URL'] || 'postgres://localhost:5432/live_vote';
const db = pgp()(db_url);
pgp().pg.defaults.ssl = {
	rejectUnauthorized: false
};

export { pgp, db };
