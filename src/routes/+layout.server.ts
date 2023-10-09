import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { ROUTES } from '$lib/routes';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';
import type { Part } from '$lib/types/Part';

export const load = (async ({ url, locals }: ServerLoadEvent) => {
  if (locals.user && !locals.user.setup_complete && url.pathname !== (ROUTES.FINALIZE_SETUP || ROUTES.LOGOUT)) {
    throw redirect(302, ROUTES.FINALIZE_SETUP);
  }

  const markup = (await locals.pb.collection('markups').getFullList({ expand: 'category' }))
    .reduce((acc: Record<string, number>, markup) => {
        acc[markup.category] = markup.amount;

        return acc;
      },
      {},
    );

  const categories = (await locals.pb.collection('parts_categories').getFullList())
    .map((category: RecordModel) => ({
      id: category.id,
      name: category.name,
    }));

  const subCategories = (await locals.pb.collection('parts_sub_categories').getFullList())
    .map((subCategory: RecordModel) => ({
      id: subCategory.id,
      name: subCategory.name,
      parentCategory: subCategory.parent_category,
    }));

  const partsCatalog: Part[] = await locals.pb.collection('parts_catalog')
    .getFullList({ expand: 'category,sub_category' });
  // const partsCatalog = partsRecords.map(part => ({
  //   ...part,
  //   ...{
  //     imageUrl: pb.files.getUrl(part, part.image, { 'thumb': '0x200'})
  //   },
  // }));

  return {
    appSettings: structuredClone({
      categories,
      subCategories,
      discount: 0,
      markup,
      partsCatalog,
    }),
    user: structuredClone(locals.user)
  };
}) satisfies LayoutServerLoad;
