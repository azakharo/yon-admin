import {useNavigate, useParams} from 'react-router-dom';

import {SubCategory, useGetSubCategories} from '@entities/category';
import {CardBox} from '@shared/components';
import {BaseWidgetLayout, Header} from '@widgets/common';
import {EditSubCategoryForm} from './EditSubCategoryForm';

import {COLOR__WHITE} from '@/theme/colors';

export const EditSubCategoryPage = () => {
  const {categoryId, id} = useParams<{categoryId: string; id: string}>();
  const navigate = useNavigate();
  const {data, isPending, error} = useGetSubCategories(categoryId ?? '', {
    enabled: !!categoryId,
  });

  const handleClose = () => {
    navigate(-1);
  };

  const renderContent = (subCategories: SubCategory[] | undefined) => {
    if (!subCategories) {
      return null;
    }

    const subCategory = subCategories.find(subCat => subCat.id === id);

    if (!subCategory) {
      return 'Invalid sub-category ID';
    }

    return (
      <CardBox bgcolor={COLOR__WHITE}>
        <EditSubCategoryForm subCategory={subCategory} onClose={handleClose} />
      </CardBox>
    );
  };

  if (!categoryId) {
    return 'Invalid category ID';
  }

  return (
    <>
      <Header title={`Category ${id}`} mb={1} />

      <BaseWidgetLayout isPending={isPending} error={error}>
        {renderContent(data)}
      </BaseWidgetLayout>
    </>
  );
};
