import { api } from '$lib/server/db';
import { works } from '$lib/server/schema';
import type { Work } from '$lib/types/common';

const workApi = api(works);

export interface WorkAPI {
	read(): Promise<Work[]>;
}

export default {
	async read() {
		return (await workApi.read()) as Work[];
	}
} as WorkAPI;
