import {useMemo} from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import {IconButton} from '@mui/material';
import {format} from 'date-fns';
import {MRT_ColumnDef} from 'material-react-table';
import {useSnackbar} from 'notistack';

import {
  CurrencyValue,
  MrTable,
  rightAlignmentColumnProps,
  TableRowActionsContainer,
} from '@shared/components';
import {DATETIME_FORMAT, entityTableCommonProps} from '@shared/constants';
import {useNotImplementedToast, useUrlState} from '@shared/hooks';

import {
  Transaction,
  TransactionTypeFilter,
  useGetPromoMoneyTransactions,
} from '@/entities/transaction';
import {useTopUpBalance} from '@/entities/user';
import {useAuth} from '@/features/auth';
import {PaginationState} from '@/shared/types';
import {COLOR__ERROR, COLOR__SUCCESS} from '@/theme/colors';
import {openTopUpBalanceDialog} from '@/widgets/user';

const localStorageKey = 'promoMoneyTransactionTable';

type UrlState = PaginationState;

// WORKAROUND
// Currently the API doesn't provide account ID (other API will be used later).
// Use the current user's account ID.
interface ExtendedTransaction extends Transaction {
  accountId: string;
}

const columns: MRT_ColumnDef<ExtendedTransaction>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 140,
  },
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'accountId',
    header: 'Account ID',
  },
  {
    accessorKey: 'value',
    header: 'Real amount',
    Cell: ({row}) => {
      return <CurrencyValue value={row.original.value} />;
    },
    maxSize: 160,
    ...rightAlignmentColumnProps,
  },
  {
    accessorKey: 'bonus',
    header: 'Promo amount',
    Cell: ({row}) => {
      return <CurrencyValue value={row.original.bonus} />;
    },
    maxSize: 160,
    ...rightAlignmentColumnProps,
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
    accessorKey: 'relatedEntity',
    header: 'Related entity',
  },
  {
    accessorKey: 'relatedEntityId',
    header: 'Related entity ID',
  },
  {
    accessorKey: 'paymentType',
    header: 'Payment type',
  },
];

export const PromoMoneyTransactionsPage = () => {
  const {enqueueSnackbar} = useSnackbar();
  const showNotImplemented = useNotImplementedToast();
  const {currentUser} = useAuth();

  const {urlState, setUrl} = useUrlState<UrlState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data,
    isPending: isLoading,
    error,
  } = useGetPromoMoneyTransactions({
    page: urlState.pageIndex + 1,
    pageSize: urlState.pageSize,
    typeFilter: TransactionTypeFilter.all,
  });

  const transactions = useMemo<ExtendedTransaction[]>(() => {
    return (
      data?.items.map(item => ({
        ...item,
        accountId: currentUser?.username ?? '',
      })) ?? []
    );
  }, [data?.items, currentUser?.username]);

  const {mutate: topUpBalance, isPending: isToppingUpBalance} =
    useTopUpBalance();

  return (
    <MrTable
      error={error}
      columns={columns}
      data={transactions}
      // renderTopToolbarCustomActions={() => {
      //   return <Button onClick={showNotImplemented}>TBD</Button>;
      // }}
      renderRowActions={({row}) => {
        return (
          <TableRowActionsContainer>
            <IconButton
              size="small"
              title="Top up balance"
              sx={{color: COLOR__SUCCESS}}
              disabled={isToppingUpBalance}
              onClick={() => {
                void openTopUpBalanceDialog()
                  .then((dollars: number) => {
                    topUpBalance(
                      {userId: row.original.accountId, dollars},
                      {
                        onSuccess: () => {
                          enqueueSnackbar('Done', {
                            variant: 'success',
                          });
                        },
                        onError: () => {
                          enqueueSnackbar(
                            'Error! Could not top up the balance',
                            {
                              variant: 'error',
                            },
                          );
                        },
                      },
                    );
                    return;
                  })
                  .catch(() => {});
              }}
            >
              <AddCircleOutlineOutlinedIcon />
            </IconButton>

            <IconButton
              size="small"
              title="Spend some funds"
              sx={{color: COLOR__ERROR}}
              onClick={showNotImplemented}
            >
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
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
