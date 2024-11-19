import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { HTTP_STATUS } from '$lib/constants/HttpStatusCode';
import { captureException } from '$lib/server/sentry';
import { createServerClient } from '@supabase/ssr';
import { type Handle, type HandleServerError, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const ROUTE = {
	home: '/',
	auth: {
		root: '/auth',
		login: '/auth/login',
		logout: '/auth/logout'
	},
	dashboard: {
		root: '/dashboard',
		projects: '/dashboard/projects',
		about: '/dashboard/about'
	}
};

const supabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});

	event.locals.safeGetSession = async () => {
		const resetSessionAndUser = () => ({ session: null, user: null });

		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();

		if (!session) return resetSessionAndUser();

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();

		if (error) return resetSessionAndUser();

		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;

	const urlPathName = event.url.pathname;

	const isDashboardRoute = (path: string) => path.startsWith(ROUTE.dashboard.root);
	const isAuthRoute = (path: string) => path.startsWith(ROUTE.auth.root);

	if (!session && isDashboardRoute(urlPathName)) {
		redirect(303, ROUTE.auth.login);
	}

	if (session && isAuthRoute(urlPathName)) {
		redirect(303, ROUTE.dashboard.projects);
	}

	return resolve(event);
};

export const handleError: HandleServerError = async ({ error, event, status }) => {
	captureException({ error, event, status });

	return {
		message: status === HTTP_STATUS.NOT_FOUND ? 'Page not found 123' : 'Internal error'
	};
};

export const handle: Handle = sequence(supabase, authGuard);
