import {useNavigate, useParams} from 'react-router-dom';

import {Event, useGetEvent} from '@entities/event';
import {CardBox} from '@shared/components';
import {BaseWidgetLayout, Header} from '@widgets/common';
import {EditEventForm} from '@widgets/event';

import {COLOR__WHITE} from '@/theme/colors';

export const EditEventPage = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const {data, isPending, error} = useGetEvent(id ?? '', {enabled: !!id});

  const handleClose = () => {
    navigate(-1);
  };

  const renderContent = (event: Event | undefined) => {
    if (!event) {
      return null;
    }

    return (
      <CardBox bgcolor={COLOR__WHITE}>
        <EditEventForm event={event} onClose={handleClose} />
      </CardBox>
    );
  };

  if (!id) {
    return 'Invalid event ID';
  }

  return (
    <>
      <Header title={`Event ${id}`} mb={1} />

      <BaseWidgetLayout isPending={isPending} error={error}>
        {renderContent(data)}
      </BaseWidgetLayout>
    </>
  );
};
