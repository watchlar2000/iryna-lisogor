import { createServerClient } from '@supabase/ssr';
import { type Handle, type HandleServerError, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { isRoutingReady, start } from '$lib/api';

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
	/**
	 * Creates a Supabase client specific to this server request.
	 *
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			/**
			 * SvelteKit's cookies API requires `path` to be explicitly set in
			 * the cookie options. Setting `path` to `/` replicates previous/
			 * standard behavior.
			 */
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: ROUTE.home });
				});
			}
		}
	});

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT before returning the session.
	 */
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
			// JWT validation has failed
			return { session: null, user: null };
		}

		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
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

const checkIfRouteApiReady: Handle = async ({ event, resolve }) => {
	try {
		if (!isRoutingReady) await start();
	} catch (error) {
		console.error(error);
		throw 'Route API is not built';
	}

	return resolve(event);
};

export const handleError: HandleServerError = async () => {
	return {
		message: 'Whoops!'
	};
};

export const handle: Handle = sequence(checkIfRouteApiReady, supabase, authGuard);
