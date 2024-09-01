import type { Config } from 'tailwindcss';

import forms from '@tailwindcss/forms';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				urbanist: ['Urbanist', 'sans-serif'],
				ubuntu: ['Ubuntu', 'sans-serif']
			}
		}
	},
	plugins: [forms]
} satisfies Config;
