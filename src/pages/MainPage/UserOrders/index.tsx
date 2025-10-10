import {useParams} from 'react-router-dom';
import {Alert, Box, Button} from '@mui/material';
import {format} from 'date-fns';
import isNil from 'lodash/isNil';
import {MRT_ColumnDef} from 'material-react-table';

import {Order, useGetUserOrders} from '@entities/order';
import {
  CurrencyValue,
  MrTable,
  rightAlignmentColumnProps,
  TableRowActionsContainer,
} from '@shared/components';
import {entityTableCommonProps} from '@shared/constants';
import {useNotImplementedToast} from '@shared/hooks';
import {Header} from '@widgets/common';

const columns: MRT_ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 140,
  },
  {
    accessorKey: 'startDate',
    header: 'Start',
    Cell: ({row}) => {
      const {startDate} = row.original;

      return format(startDate, 'dd.MM.yyyy HH:mm');
    },
    size: 140,
  },
  {
    accessorKey: 'endDate',
    header: 'End',
    Cell: ({row}) => {
      const {endDate} = row.original;

      return format(endDate, 'dd.MM.yyyy HH:mm');
    },
    size: 140,
  },
  {
    accessorKey: 'orderType',
    header: 'Type',
  },
  {
    accessorKey: 'choice',
    header: 'Side',
    size: 140,
  },
  {
    accessorKey: 'eventId',
    header: 'Event ID',
    size: 140,
  },
  {
    accessorKey: 'requestedItemCount',
    header: 'Requested',
    size: 120,
  },
  {
    accessorKey: 'requestedMaxInv',
    header: 'Max Inv',
    size: 120,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    Cell: ({row}) => {
      const {price} = row.original;

      return isNil(price) ? null : <CurrencyValue value={price} />;
    },
    size: 140,
    ...rightAlignmentColumnProps,
  },
  {
    accessorKey: 'slippage',
    header: 'Slippage',
    size: 140,
    ...rightAlignmentColumnProps,
  },
  {
    accessorKey: 'matching',
    header: 'Matching',
    size: 120,
  },
];

const localStorageKey = 'userOrderTable';

export const UserOrdersPage = () => {
  const showNotImplemented = useNotImplementedToast();
  const {userId} = useParams();
  const {
    data: orders,
    isPending: isLoading,
    error,
  } = useGetUserOrders(userId ?? '', {enabled: !!userId});

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  return (
    <MrTable
      columns={columns}
      data={orders ?? []}
      renderTopToolbarCustomActions={() => {
        return <Header title={`Orders of user "${userId}"`} />;
      }}
      renderRowActions={() => {
        return (
          <TableRowActionsContainer>
            <Button
              variant="text"
              color="secondary"
              onClick={showNotImplemented}
            >
              Details
            </Button>
          </TableRowActionsContainer>
        );
      }}
      enableColumnOrdering
      enableColumnDragging={false}
      localStorageKeyForSettings={localStorageKey}
      enableHiding
      state={{
        isLoading,
      }}
      enableColumnPinning
      initialState={{
        columnPinning: {
          left: ['id'],
        },
      }}
      {...entityTableCommonProps}
      enableRowActions={false}
    />
  );
};
