// import type { PageServerLoad } from './$types';
// import { db } from '$lib/server';
// import { images } from '$lib/server/schema';
//
// export const load: PageServerLoad = async ({ locals: { supabase } }) => {
// 	const imagesData = await db.select().from(images);
// 	const { data } = await supabase.from('images').select();
// 	console.log(data);
// 	return { images: data };
// };