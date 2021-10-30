import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');

	request.locals.user = cookies.user || uuid();
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}
	const response = await resolve(request);
	response.headers['set-cookie'] = `user=${request.locals.user || ''}; Path=/; HttpOnly`;
	return response;
}

export function getSession(request) {
	return request.locals.user;
}
