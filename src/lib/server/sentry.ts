import { PRIVATE_SENTRY_DSN } from '$env/static/private';

import * as Sentry from '@sentry/sveltekit';
import type { RequestEvent } from '@sveltejs/kit';

Sentry.init({
	dsn: PRIVATE_SENTRY_DSN,
	tracesSampleRate: 1.0
});

type CaptureErrorParams = {
	error: unknown;
	event: RequestEvent;
	status: number;
};

export const captureException = ({ error, event, status }: CaptureErrorParams) => {
	const errorId = crypto.randomUUID();

	Sentry.captureException(error, {
		extra: { event, errorId, status }
	});
};
