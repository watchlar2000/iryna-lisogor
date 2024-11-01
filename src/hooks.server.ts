import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { HTTP_STATUS } from '$lib/constants/HttpStatusCode';
import { captureException } from '$lib/server/sentry';
import { createServerClient } from '@supabase/ssr';
import { type Handle, type HandleServerError, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const ROUTE = {
	home: '/',
	auth: {
		root: '/auth',
		login: '/auth/login',
		logout: '/auth/logout'
	},
	dashboard: {
		root: '/dashboard',
		projects: '/dashboard/projects'
	}
};

const supabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: ROUTE.home });
				});
			}
		}
	});
	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null };
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			return { session: null, user: null };
		}

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

	if (
		(!event.locals.session && urlPathName.startsWith(ROUTE.dashboard.root)) ||
		urlPathName === ROUTE.auth.root
	) {
		redirect(303, ROUTE.auth.login);
	}

	if (event.locals.session && urlPathName.startsWith(ROUTE.auth.root)) {
		redirect(303, ROUTE.dashboard.projects);
	}

	return resolve(event);
};

export const handleError: HandleServerError = async ({ error, event, status }) => {
	console.error({ error, status });
	captureException({ error, event, status });

	return {
		message: status === HTTP_STATUS.NOT_FOUND ? 'Page not found' : 'Something went wrong'
	};
};

export const handle: Handle = sequence(supabase, authGuard);
