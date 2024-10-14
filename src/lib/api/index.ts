// import fsp from 'fs/promises';
// import path from 'path';
import { author } from './author';
import { project } from './project';
import { work } from './work';

// const apiPath = path.join(process.cwd(), './src/lib/api');

// interface API {
// project: ProjectAPI;
// author: AuthorAPI;
// work: WorkAPI;
// image: ImageAPI;
// }

// type apiKey = keyof API;

export const routing = {
	author,
	project,
	work
};

// export let isRoutingReady: boolean = false;

// const prepareRouting = async () => {
// 	const files = await fsp.readdir(apiPath);
// 	for (const file of files) {
// 		if (!file.endsWith('.js') || file === 'index.js') continue;
// 		const filePath = path.join(apiPath, file);
// 		const serviceName = path.basename(file, '.js') as apiKey;
// 		const action = (await import(/* @vite-ignore */ filePath)).default;
// 		routing[serviceName] = action;
// 	}
// };

// export const start = async () => {
// 	try {
// 		await prepareRouting();
// 		isRoutingReady = true;
// 	} catch (error) {
// 		isRoutingReady = false;
// 		throw error;
// 	}
// };
