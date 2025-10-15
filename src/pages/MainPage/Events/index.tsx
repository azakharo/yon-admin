import {Link as RouterLink} from 'react-router-dom';
import {Button, Link} from '@mui/material';
import {MRT_ColumnDef} from 'material-react-table';

import {Event, useGetEvents} from '@entities/event';
import {
  CurrencyValue,
  MrTable,
  rightAlignmentColumnProps,
  TableRowActionsContainer,
} from '@shared/components';
import {entityTableCommonProps, ROUTE__EVENT_DETAILS} from '@shared/constants';
import {useNotImplementedToast} from '@shared/hooks';

const columns: MRT_ColumnDef<Event>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    Cell: ({row}) => {
      const {id} = row.original;

      return (
        <Link
          component={RouterLink}
          to={ROUTE__EVENT_DETAILS.replace(':id', id)}
        >
          {id}
        </Link>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    grow: true,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 140,
  },
  {
    accessorKey: 'yesPrice',
    header: 'Yes price',
    Cell: ({row}) => {
      return <CurrencyValue value={row.original.yesPrice} />;
    },
    maxSize: 160,
    ...rightAlignmentColumnProps,
  },
  {
    accessorKey: 'noPrice',
    header: 'No price',
    Cell: ({row}) => {
      return <CurrencyValue value={row.original.noPrice} />;
    },
    maxSize: 160,
    ...rightAlignmentColumnProps,
  },
];

const localStorageKey = 'eventTable';

export const EventsPage = () => {
  const showNotImplemented = useNotImplementedToast();
  const {data, isPending, error} = useGetEvents({page: 1, pageSize: 10});

  return (
    <MrTable
      error={error}
      columns={columns}
      data={data?.items ?? []}
      renderRowActions={() => {
        return (
          <TableRowActionsContainer>
            <Button
              variant="text"
              color="secondary"
              onClick={showNotImplemented}
            >
              Stop trading
            </Button>
          </TableRowActionsContainer>
        );
      }}
      enableColumnOrdering
      enableColumnDragging
      localStorageKeyForSettings={localStorageKey}
      enableHiding
      state={{
        isLoading: isPending,
      }}
      // enableColumnPinning
      // initialState={{
      //   columnPinning: {
      //     left: ['id'],
      //     right: ['mrt-row-actions'],
      //   },
      // }}
      {...entityTableCommonProps}
    />
  );
};
