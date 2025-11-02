import {useNavigate, useParams} from 'react-router-dom';

import {Category, useGetCategory} from '@entities/category';
import {CardBox} from '@shared/components';
import {BaseWidgetLayout, Header} from '@widgets/common';
import {EditCategoryForm} from './EditCategoryForm';

import {COLOR__WHITE} from '@/theme/colors';

export const EditCategoryPage = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const {data, isPending, error} = useGetCategory(id ?? '', {enabled: !!id});

  const handleClose = () => {
    navigate(-1);
  };

  const renderContent = (category: Category | undefined) => {
    if (!category) {
      return null;
    }

    return (
      <CardBox bgcolor={COLOR__WHITE}>
        <EditCategoryForm category={category} onClose={handleClose} />
      </CardBox>
    );
  };

  if (!id) {
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
