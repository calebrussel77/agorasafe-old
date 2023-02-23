import slugify from 'slugify';

import { getUserBySlug } from '../services';

export const createUniqueSlugByName = async (name: string) => {
  const slug = slugify(name, { lower: true, locale: 'fr' });
  let uniqueSlug = slug;
  while (await getUserBySlug(uniqueSlug)) {
    uniqueSlug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
  }
  return uniqueSlug;
};
