import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Button, Link} from '@mui/material';
import {MRT_ColumnDef} from 'material-react-table';

import {Event, useGetEvents} from '@entities/event';
import {
  CurrencyValue,
  MrTable,
  rightAlignmentColumnProps,
  TableRowActionsContainer,
} from '@shared/components';
import {
  entityTableCommonProps,
  ROUTE__CREATE_EVENT,
  ROUTE__EVENT_DETAILS,
} from '@shared/constants';
import {useNotImplementedToast, useUrlState} from '@shared/hooks';

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

type UrlState = {
  pageIndex: number;
  pageSize: number;
};

export const EventsPage = () => {
  const navigate = useNavigate();
  const showNotImplemented = useNotImplementedToast();

  const {urlState, setUrl} = useUrlState<UrlState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {data, isPending, error} = useGetEvents({
    page: urlState.pageIndex + 1,
    pageSize: urlState.pageSize,
  });

  return (
    <MrTable
      error={error}
      columns={columns}
      data={data?.items ?? []}
      renderTopToolbarCustomActions={() => {
        return (
          <Button
            onClick={() => {
              navigate(ROUTE__CREATE_EVENT);
            }}
          >
            Create event
          </Button>
        );
      }}
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
      /////////////////////////////
      // pagination + state
      enablePagination
      manualPagination
      onPaginationChange={setUrl}
      rowCount={data?.total ?? 0}
      /////////////////////////////
      state={{
        isLoading: isPending,
        pagination: urlState,
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
