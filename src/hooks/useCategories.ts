import { categoryCache, getAllCategory } from '@/app/helpers/api/category';
import useSWR from 'swr';
const useCategories = () => {
  const { isLoading, error, data, mutate } = useSWR(
    categoryCache,
    getAllCategory
  );

  const categories: CategoryRaw[] = data;
  return {
    isLoading,
    error,
    categories,
    mutate,
  };
};
export default useCategories;

export const categorySelectOptions = (categoryRaw: CategoryRaw[]) => {
  const categoriesOptions: Category[] = [
    {
      value: 'default',
      label: 'Select Category...',
    },
  ];

  categoryRaw.map((category) => {
    categoriesOptions.push({
      value: category.slug!,
      label: category.name,
    });
  });
  return categoriesOptions;
};
