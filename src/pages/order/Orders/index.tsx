import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';

import {useGetOrders} from '@entities/order';
import {MrTable, TableRowActionsContainer} from '@shared/components';
import {
  entityTableCommonProps,
  ROUTE__ORDER_FULL_INFO,
} from '@shared/constants';
import {useUrlState} from '@shared/hooks';
import {Header} from '@widgets/common';
import {columns} from '../../user/UserOrders';

import {PaginationState} from '@/shared/types';

const localStorageKey = 'orderTable';

type UrlState = PaginationState;

export const OrdersPage = () => {
  const navigate = useNavigate();

  const {urlState, setUrl} = useUrlState<UrlState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data,
    isPending: isLoading,
    error,
  } = useGetOrders({
    page: urlState.pageIndex + 1,
    pageSize: urlState.pageSize,
  });

  return (
    <MrTable
      error={error}
      columns={columns}
      data={data?.items ?? []}
      renderTopToolbarCustomActions={() => {
        return <Header title="Orders" isBackButtonShown={false} />;
      }}
      renderRowActions={({row}) => {
        return (
          <TableRowActionsContainer>
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                navigate(
                  ROUTE__ORDER_FULL_INFO.replace(':id', row.original.id),
                );
              }}
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
