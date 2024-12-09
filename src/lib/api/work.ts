// import { HTTP_STATUS } from '$lib/constants/HttpStatusCode';
// import { BaseError } from '$lib/errors/BaseError';
// import { api } from '$lib/server/db';
// import { works } from '$lib/server/schema';
// import type { Work } from '$lib/types/common';

// const workApi = api(works);

// export interface WorkAPI {
// 	read(): Promise<Work[]>;
// }

// export const work: WorkAPI = {
// 	async read() {
// 		const data = await workApi.read();

// 		if (!data.length)
// 			throw new BaseError({
// 				status: HTTP_STATUS.NOT_FOUND,
// 				message: 'No work data found'
// 			});

// 		return data as Work[];
// 	}
// };
