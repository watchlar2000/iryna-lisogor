import AppMenu from './app-menu.svg?raw';
import Data from './data.svg?raw';
import Edit from './edit.svg?raw';
import Email from './email.svg?raw';
import Info from './info.svg?raw';
import Instagram from './instagram.svg?raw';
import Linkedin from './linkedin.svg?raw';
import Plus from './plus.svg?raw';
import Trash from './trash.svg?raw';

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
	},
	data: {
		alt: 'home icon',
		src: Data
	},
	info: {
		alt: 'information icon',
		src: Info
	},
	plus: {
		alt: 'plus icon',
		src: Plus
	},
	edit: {
		alt: 'edit icon',
		src: Edit
	},
	trash: {
		alt: 'trash icon',
		src: Trash
	}
} as const;
