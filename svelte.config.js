import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			// $routes: 'src/routes',
			// '$routes/*': 'src/routes/*',
			// '$test-helpers': 'src/test-helpers',
			// $constants: 'src/constants',
			// $docs: 'src/docs',
			// '$docs/*': 'src/docs/*',
			// $components: 'src/docs/components',
			// '$components/*': 'src/docs/components/*',
			// $icons: 'src/docs/components/icons',
			// '$icons/*': 'src/docs/components/icons/*',
		}
	}
};

export default config;
