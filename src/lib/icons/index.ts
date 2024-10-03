import AppMenu from './app-menu.svg?raw';
import Email from './email.svg?raw';
import Instagram from './instagram.svg?raw';
import Linkedin from './linkedin.svg?raw';

export const icons = {
	email: {
		alt: 'email icon',
		src: Email
	},
	linkedin: {
		alt: 'linkedin icon',
		src: Linkedin
	},
	instagram: {
		alt: 'instagram icon',
		src: Instagram
	},
	appMenu: {
		alt: 'burger menu icon',
		src: AppMenu
	}
} as const;
