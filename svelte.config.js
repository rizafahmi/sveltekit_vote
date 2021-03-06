// import preprocess from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */
import node from '@sveltejs/adapter-node';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: node({
			env: {
				port: process.env.PORT,
				BASE_URL: process.env.BASE_URL || 'http://localhost:3000/'
			}
		})
	},

	preprocess: [
		// preprocess({
		// 	postcss: true
		// })
	]
};

export default config;
