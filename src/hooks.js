import cookie from 'cookie';

export async function handle({ request, resolve }) {
	// request.locals.user = await getUserInformation(request.headers.cookie);
	const cookies = cookie.parse(request.headers.cookie || '');
	console.log(cookies);

	const response = await resolve(request);

	return {
		...response,
		headers: {
			...response.headers,
			'x-custom-header': 'potato'
		}
	};
}
