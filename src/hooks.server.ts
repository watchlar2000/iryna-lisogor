import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';
import { type Handle, type HandleServerError, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const ROUTE = {
	home: '/',
	auth: {
		base: '/auth',
		login: '/auth/login',
		logout: '/auth/login'
	},
	dashboard: '/dashboard'
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
		(!event.locals.session && urlPathName.startsWith(ROUTE.dashboard)) ||
		urlPathName === ROUTE.auth.base
	) {
		redirect(303, ROUTE.auth.login);
	}

	if (event.locals.session && urlPathName.startsWith(ROUTE.auth.base)) {
		redirect(303, ROUTE.dashboard);
	}

	return resolve(event);
};

// const checkIfRouteApiReady: Handle = async ({ event, resolve }) => {
// 	try {
// 		if (!isRoutingReady) await start();
// 	} catch (error) {
// 		console.error(error);
// 		throw 'Route API is not built';
// 	}

// 	return resolve(event);
// };

export const handleError: HandleServerError = async () => {
	return {
		message: 'Something went wrong'
	};
};

export const handle: Handle = sequence(supabase, authGuard);
