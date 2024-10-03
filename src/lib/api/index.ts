import fsp from 'node:fs/promises';
import path from 'node:path';
import type { AuthorAPI } from './author.ts';
import type { ProjectAPI } from './project.ts';
import type { WorkAPI } from './work.ts';

const apiPath = path.join(process.cwd(), './src/lib/api');

export interface API {
	project: ProjectAPI;
	author: AuthorAPI;
	work: WorkAPI;
	// image: ImageAPI;
}

type apiKey = keyof API;

export const routing: API = {} as API;

export let isRoutingReady: boolean = false;

const prepareRouting = async () => {
	const files = await fsp.readdir(apiPath);
	for (const file of files) {
		if (!file.endsWith('.ts') || file === 'index.ts') continue;
		const filePath = path.join(apiPath, file);
		const serviceName = path.basename(file, '.ts') as apiKey;
		const action = await import(/* @vite-ignore */ filePath);
		routing[serviceName] = action[serviceName];
	}
};

export const start = async () => {
	try {
		await prepareRouting();
		isRoutingReady = true;
	} catch (error) {
		isRoutingReady = false;
		throw error;
	}
};
