import { MutatorOptions } from 'swr';
import { checkEnvironment } from '../check-env';
import { categoryCache } from './category';
import { PathString } from 'react-hook-form';
import slug from 'slug';
export const addCategoryOptions = (categoryName: PathString) => {
  const newCategory: Category = {
    value: categoryName,
    label: slug(categoryName),
  };
  const options: MutatorOptions<any> | undefined = {
    optimisticData: (categories: Category[]) => [newCategory, ...categories],
    rollbackOnError: true,
    populateCache: (added: Category, categories: Category[]) => {
      return [added, ...categories];
    },
    revalidate: false,
  };
  return options;
};
