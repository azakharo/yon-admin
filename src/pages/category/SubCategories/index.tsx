import {useParams} from 'react-router-dom';

import {SubCategoryTable} from '@widgets/category';

export const SubCategoriesPage = () => {
  const {categoryId} = useParams<{categoryId: string}>();

  if (!categoryId) {
    return null;
  }

  return <SubCategoryTable categoryId={categoryId} />;
};
