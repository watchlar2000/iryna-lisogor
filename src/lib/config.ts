export const siteConfig = {
	name: 'Iryna Lisogor Portfoio Page',
	url: 'https://www.irynalisogor.art/',
	ogImage: 'https://www.irynalisogor.art/og.jpg',
	description: '',
	links: {
		github: 'https://github.com/watchlar2000/iryna-lisogor'
	},
	keywords: ''
};

type NavItem = {
	title: string;
	href: string;
};

type NavItemWithChildren = NavItem & {
	items?: NavItem[];
};

export const navConfig: NavItemWithChildren[] = [
	{
		title: 'works',
		href: '/works',
		items: [
			{
				title: 'visual development',
				href: '/visual-development'
			},
			{
				title: 'background painting',
				href: '/background-painting'
			}
		]
	},
	{
		title: 'playground',
		href: '/playground'
	},
	{
		title: 'about',
		href: '/about'
	}
];
