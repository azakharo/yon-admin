import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {format} from 'date-fns';
import {MRT_ColumnDef} from 'material-react-table';

import {
  EditButton,
  MrTable,
  rightAlignmentColumnProps,
  TableRowActionsContainer,
} from '@shared/components';
import {
  DATETIME_FORMAT,
  entityTableCommonProps,
  ROUTE__PROMOCODE_CREATE,
} from '@shared/constants';
import {useNotImplementedToast, useUrlState} from '@shared/hooks';

import {Promocode} from '@/entities/promocode';
import {useGetPromocodes} from '@/entities/promocode/apiHooks';
import {PaginationState} from '@/shared/types';

const localStorageKey = 'promocodeTable';

type UrlState = PaginationState;

const columns: MRT_ColumnDef<Promocode>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
    size: 140,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'promocodeType',
    header: 'Type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'created',
    header: 'Created',
    Cell: ({row}) => {
      const {created} = row.original;

      return format(created, DATETIME_FORMAT);
    },
    size: 140,
  },
  {
    accessorKey: 'Updated',
    header: 'Updated',
    Cell: ({row}) => {
      const {updated} = row.original;

      return format(updated, DATETIME_FORMAT);
    },
    size: 140,
  },
  {
    accessorKey: 'expiresAt',
    header: 'Expires',
    Cell: ({row}) => {
      const {expiresAt} = row.original;

      if (!expiresAt) {
        return null;
      }

      return format(expiresAt, DATETIME_FORMAT);
    },
    size: 140,
  },
  {
    accessorKey: 'applyCountLimit',
    header: 'Apply count limit',
    size: 140,
    ...rightAlignmentColumnProps,
  },
  {
    accessorKey: 'usageCountLimit',
    header: 'Usage count limit',
    size: 140,
    ...rightAlignmentColumnProps,
  },
  {
    accessorKey: 'usageAmountLimit',
    header: 'Usage amount limit',
    size: 140,
    ...rightAlignmentColumnProps,
  },
];

export const PromocodesPage = () => {
  const navigate = useNavigate();
  const showNotImplemented = useNotImplementedToast();

  const {urlState, setUrl} = useUrlState<UrlState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data,
    isPending: isLoading,
    error,
  } = useGetPromocodes({
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
              navigate(ROUTE__PROMOCODE_CREATE);
            }}
          >
            Create promo-code
          </Button>
        );
      }}
      renderRowActions={() => {
        return (
          <TableRowActionsContainer>
            <EditButton onClick={showNotImplemented} />
          </TableRowActionsContainer>
        );
      }}
      enableColumnOrdering
      enableColumnDragging={false}
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
        isLoading,
        pagination: urlState,
      }}
      enableColumnPinning
      initialState={{
        columnPinning: {
          left: ['id'],
          right: ['mrt-row-actions'],
        },
      }}
      {...entityTableCommonProps}
    />
  );
};
