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

type NavConfig = {
	website: NavItemWithChildren[];
	dashboard: NavItemWithChildren[];
};

const navConfig: NavConfig = {
	website: [
		{
			title: 'Works',
			href: '/works',
			items: [
				{
					title: 'Visual development',
					href: '/visual-development'
				},
				{
					title: 'Background painting',
					href: '/background-painting'
				}
			]
		},
		{
			title: 'Playground',
			href: '/playground'
		},
		{
			title: 'About',
			href: '/about'
		}
	],
	dashboard: [
		{
			title: 'Projects',
			href: '/dashboard/projects'
		},
		{
			title: 'About',
			href: '/dashboard/about'
		},
		{
			title: 'Auth',
			href: '/auth',
			items: [
				{
					title: 'Login',
					href: '/auth/login'
				},
				{
					title: 'Logout',
					href: '/auth/logout'
				}
			]
		}
	]
} as const;

export const webSiteNavConfig = navConfig.website;
export const dashboardNavConfig = navConfig.dashboard;

// type RouteLookup = Map<string, NavItemWithChildren>;

type ExtractTitles<T extends readonly NavItem[]> =
	| T[number]['title']
	| (T[number] extends { items: infer I }
			? I extends NavItem[]
				? ExtractTitles<I>
				: never
			: never);

const createRouteLookup = (navList: NavItemWithChildren[]) => {
	type MapKey = ExtractTitles<NavConfig['website']>;
	// const routeLookup = new Map<MapKey, NavItemWithChildren>();

	const routeLookup: Record<MapKey, NavItemWithChildren> = {};

	const addRoutes = (items: NavItemWithChildren[]) => {
		for (const item of items) {
			// routeLookup.set(item.title.toLocaleLowerCase(), item);
			// routeLookup.set('FAQ', { title: 'FAQ', href: '/asdasd' });
			routeLookup[item.title.toLocaleLowerCase()] = item;
			if (item.items) {
				addRoutes(item.items);
			}
		}
	};

	addRoutes(navList);
	return routeLookup;
};

export const websiteRouteLookup = createRouteLookup(webSiteNavConfig);
export const dashboardRouteLookup = createRouteLookup(dashboardNavConfig);
