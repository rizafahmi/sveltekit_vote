import pgp from 'pg-promise';
const db_url = process.env.DATABASE_URL || 'postgres://localhost:5432/live_vote';
console.log(process.env);
const db = pgp()(db_url);

export { pgp, db };
