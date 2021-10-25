import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';

export async function handle({ request, resolve }) {
	// request.locals.user = await getUserInformation(request.headers.cookie);
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || uuid();

	const response = await resolve(request);
	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = cookie.serialize('userid', request.locals.userid, {
			path: '/',
			httpOnly: true
		});
	}
	return response;
}
