import pgp from 'pg-promise';
const db_url =
	'postgres://iiqmyjfgajemby:94fc483d4954bfc83937df67040753025af7ff12ecf135c591255ef90314e31b@ec2-52-204-14-80.compute-1.amazonaws.com:5432/d9ec136g2sd7th' ||
	'postgres://localhost:5432/live_vote';
const db = pgp()(db_url);

export { pgp, db };
