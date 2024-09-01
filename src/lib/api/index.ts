import fsp from 'node:fs/promises';
import path from 'node:path';
import type { AuthorAPI } from './author';
import type { ProjectAPI } from './project';

const apiPath = path.join(process.cwd(), './src/lib/api');

export interface API {
	project: ProjectAPI;
	author: AuthorAPI;
}

type apiKey = keyof API;

export const routing: API = {} as API;

(async () => {
	const files = await fsp.readdir(apiPath);

	for (const file of files) {
		if (!file.endsWith('.ts') || file === 'index.ts') continue;

		const filePath = path.join(apiPath, file);
		const serviceName = path.basename(file, '.ts') as apiKey;

		const action = await import(filePath);
		routing[serviceName] = action.default;
	}
})();
