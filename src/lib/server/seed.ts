import { db } from './db.ts';
import { authors, images, projects, works } from './schema.ts';

const worksValues = [
	{
		id: 1,
		title: 'visual development',
		slug: 'visual-development'
	},
	{
		id: 2,
		title: 'background painting',
		slug: 'background-painting'
	},
	{
		id: 3,
		title: 'playground',
		slug: 'playground'
	}
];

const author = {
	id: 1,
	name: 'Iryna',
	surname: 'Lisogor',
	photoUrl:
		'https://mqcgrpdiguxgzulcbqim.supabase.co/storage/v1/object/public/images/profile-photo-6570f3ea-234e-4b53-9f9e-ad0ef07e4c83',
	about: `
    <p>I'm Ira, an illustrator based in Kyiv, Ukraine, with a passion for creating and storytelling. I enjoy diving headfirst into projects, exploring, and creating vibrant artworks which tell stories and spark joy. Previously worked in various fields like editorial, advertising, and social media.</p>

    <p>Aside from work, I love having fun with my dog, reading books, hiking and exploring new things.</p>

    <p>You can reach out to me via <strong>iryna.lisogor.artwrk@gmail.com.</strong></p>

    <p>Resume available upon request.</p>
  `
};

const projectsValues = [
	{
		id: 1,
		title: 'Visual dev project',
		slug: 'visual-dev-project',
		work: 'visual-development',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur labore iste accusamus architecto dolor illo obcaecati repudiandae distinctio ad molestiae? Obcaecati quisquam dolores veniam. Error soluta impedit tenetur vitae. Minima.'
	},
	{
		id: 2,
		title: 'Background painting project',
		slug: 'background-painting-project',
		work: 'background-painting',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur labore iste accusamus architecto dolor illo obcaecati repudiandae distinctio ad molestiae? Obcaecati quisquam dolores veniam. Error soluta impedit tenetur vitae. Minima.'
	},
	{
		id: 3,
		title: 'Playground project',
		slug: 'playground-project',
		work: 'playground',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur labore iste accusamus architecto dolor illo obcaecati repudiandae distinctio ad molestiae? Obcaecati quisquam dolores veniam. Error soluta impedit tenetur vitae. Minima.'
	}
];

const imagesValues = [
	{
		url: 'https://mqcgrpdiguxgzulcbqim.supabase.co/storage/v1/object/public/images/4kshrek-animationscreencaps.com-2168.jpg',
		alt: 'test',
		isCoverImage: true,
		projectId: 1
	},
	{
		url: 'https://mqcgrpdiguxgzulcbqim.supabase.co/storage/v1/object/public/images/4kshrek-animationscreencaps.com-3464.jpg',
		alt: 'test',
		isCoverImage: false,
		projectId: 1
	},
	{
		url: 'https://mqcgrpdiguxgzulcbqim.supabase.co/storage/v1/object/public/images/4kshrek-animationscreencaps.com-394.jpg',
		alt: 'matilda 1',
		isCoverImage: true,
		projectId: 2
	},
	{
		url: 'https://mqcgrpdiguxgzulcbqim.supabase.co/storage/v1/object/public/images/mutantmayhem-animationscreencaps.com-1622.jpg',
		alt: 'matilda 2',
		isCoverImage: false,
		projectId: 2
	},
	{
		url: 'https://mqcgrpdiguxgzulcbqim.supabase.co/storage/v1/object/public/images/mutantmayhem-animationscreencaps.com-1779.jpg',
		alt: 'matilda 2',
		isCoverImage: true,
		projectId: 3
	},
	{
		url: 'https://mqcgrpdiguxgzulcbqim.supabase.co/storage/v1/object/public/images/mutantmayhem-animationscreencaps.com-3107.jpg',
		alt: 'matilda 2',
		isCoverImage: false,
		projectId: 3
	}
];

const resetTablesData = async () => {
	const tables = [works, authors, projects, images];

	for (const table of tables) {
		await db.delete(table);
	}
};

const main = async () => {
	try {
		await resetTablesData();

		await db.insert(works).values(worksValues);
		await db.insert(authors).values(author);
		await db.insert(projects).values(projectsValues);
		await db.insert(images).values(imagesValues);
	} catch (error) {
		console.log(`'Error during seeding: ${error}`);
	}
};

main().finally(() => process.exit());
