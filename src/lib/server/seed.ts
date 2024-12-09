import { db } from './db.ts';
import { authors, images, projects, projectsToImages, WorkType } from './schema.ts';

const authorsSeed = [
	{
		name: 'Alice',
		surname: 'Johnson',
		photoUrl: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8',
		about: 'Alice is a seasoned visual development artist.'
	}
];

const projectsSeed = [
	{
		id: 1,
		title: 'Mystic Landscapes',
		slug: 'mystic-landscapes',
		description: 'A collection of breathtaking background paintings inspired by fantasy worlds.',
		workType: WorkType.BACKGROUND_PAINTING,
		coverImageId: 1
	},
	{
		id: 2,
		title: 'Future Visions',
		slug: 'future-visions',
		description: 'Visual development concepts for a sci-fi universe.',
		workType: WorkType.VISUAL_DEVELOPMENT,
		coverImageId: 2
	},
	{
		id: 3,
		title: 'Playground Adventures',
		slug: 'playground-adventures',
		description: 'Interactive art and experimental playground designs.',
		workType: WorkType.PLAYGROUND,
		coverImageId: 3
	}
];

const imagesSeed = [
	{
		id: 1,
		url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		alt: 'A serene mountain landscape with snow-capped peaks.',
		width: 773,
		height: 512
	},
	{
		id: 2,
		url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=1226&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		alt: 'A futuristic cityscape at sunset with high-rise buildings.',
		width: 440,
		height: 784
	},
	{
		id: 3,
		url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		alt: 'A vibrant playground with colorful structures for children.',
		width: 523,
		height: 784
	},
	{
		id: 4,
		url: 'https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		alt: 'A magical forest scene with glowing light beams piercing through trees.',
		width: 523,
		height: 784
	},
	{
		id: 5,
		url: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		alt: 'An alien landscape with rugged terrain and a vibrant sunset.',
		width: 976,
		height: 651
	}
];

const projectsToImagesSeed = [
	{ projectId: 1, imageId: 1 },
	{ projectId: 1, imageId: 4 },
	{ projectId: 2, imageId: 2 },
	{ projectId: 2, imageId: 5 },
	{ projectId: 3, imageId: 3 }
];

const resetTablesData = async () => {
	const tables = [authors, projects, images, projectsToImages];

	for (const table of tables) {
		await db.delete(table);
	}
};

const main = async () => {
	try {
		await resetTablesData();
		await db.insert(images).values(imagesSeed);
		await db.insert(authors).values(authorsSeed);
		await db.insert(projects).values(projectsSeed);
		await db.insert(projectsToImages).values(projectsToImagesSeed);
		console.log('Seeding successful');
	} catch (error) {
		console.log(`'Error during seeding: ${error}`);
	}
};

main().finally(() => process.exit());
