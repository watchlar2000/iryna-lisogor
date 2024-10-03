import type { Author } from './common';

type AuthorPayloadKeys = Pick<Author, 'about' | 'photoUrl'>;

export type AuthorPayload = {
	[K in keyof AuthorPayloadKeys]: NonNullable<AuthorPayloadKeys[K]>;
};
