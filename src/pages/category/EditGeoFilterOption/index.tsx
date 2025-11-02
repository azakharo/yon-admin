import {useNavigate, useParams} from 'react-router-dom';

import {GeoFilterOption, useGetGeoFilterOptions} from '@entities/common';
import {CardBox} from '@shared/components';
import {BaseWidgetLayout, Header} from '@widgets/common';
import {EditGeoFilterOptionForm} from './EditGeoFilterOptionForm';

import {COLOR__WHITE} from '@/theme/colors';

export const EditGeoFilterOptionPage = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const {data, isPending, error} = useGetGeoFilterOptions();

  const handleClose = () => {
    navigate(-1);
  };

  const renderContent = (options: GeoFilterOption[] | undefined) => {
    if (!options) {
      return null;
    }

    const desiredOption = options.find(opt => opt.id === id);

    if (!desiredOption) {
      return 'GEO category not found';
    }

    return (
      <CardBox bgcolor={COLOR__WHITE}>
        <EditGeoFilterOptionForm option={desiredOption} onClose={handleClose} />
      </CardBox>
    );
  };

  if (!id) {
    return 'Invalid GEO category ID';
  }

  return (
    <>
      <Header title={`GEO category ${id}`} mb={1} />

      <BaseWidgetLayout isPending={isPending} error={error}>
        {renderContent(data)}
      </BaseWidgetLayout>
    </>
  );
};
