import {useNavigate} from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import {Alert, Box, Button, IconButton, Tooltip} from '@mui/material';
import {MRT_ColumnDef} from 'material-react-table';
import {useSnackbar} from 'notistack';

import {
  useGetUsers,
  User,
  UserAvatar,
  useSetAdmin,
  useTopUpBalance,
} from '@entities/user';
import {
  CurrencyValue,
  MrTable,
  rightAlignmentColumnProps,
  TableRowActionsContainer,
} from '@shared/components';
import {entityTableCommonProps, ROUTE__USER_ORDERS} from '@shared/constants';
import {openTopUpBalanceDialog} from '@widgets/user';

const columns: MRT_ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 140,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    grow: true,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    size: 140,
  },
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    Cell: ({row}) => {
      const {name, avatar} = row.original;

      return <UserAvatar name={name} src={avatar} />;
    },
    size: 120,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 140,
    grow: true,
  },
  {
    accessorKey: 'country',
    header: 'Country',
    size: 120,
  },
  {
    accessorKey: 'isVerified',
    header: 'Is verified?',
    Cell: ({row}) => {
      return row.original.isVerified ? 'Yes' : 'No';
    },
    size: 140,
  },
  {
    accessorKey: 'isAdmin',
    header: 'Is admin?',
    Cell: ({row}) => {
      return row.original.isAdmin ? 'Yes' : 'No';
    },
    size: 130,
  },
  {
    accessorKey: 'fundsReal',
    header: 'Funds real',
    Cell: ({row}) => {
      return <CurrencyValue value={row.original.fundsReal} />;
    },
    maxSize: 160,
    ...rightAlignmentColumnProps,
  },
  {
    accessorKey: 'fundsPromo',
    header: 'Funds promo',
    Cell: ({row}) => {
      return <CurrencyValue value={row.original.fundsPromo} />;
    },
    maxSize: 160,
    ...rightAlignmentColumnProps,
  },
];

const localStorageKey = 'userTable';

export const UsersPage = () => {
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const {data: users, isPending: isLoading, error} = useGetUsers();
  const {mutate: setAdmin, isPending: isSettingAdmin} = useSetAdmin();
  const {mutate: topUpBalance, isPending: isToppingUpBalance} =
    useTopUpBalance();

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
      data={users ?? []}
      renderRowActions={({row}) => {
        const {id, isAdmin} = row.original;

        return (
          <TableRowActionsContainer>
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                navigate(ROUTE__USER_ORDERS.replace(':userId', id));
              }}
            >
              Orders
            </Button>

            <IconButton
              title="Grant admin permissions"
              disabled={isSettingAdmin}
              onClick={() => {
                if (isAdmin) {
                  enqueueSnackbar('The selected user is already admin', {
                    variant: 'info',
                  });
                  return;
                }

                setAdmin(id);
              }}
            >
              <AccountCircleOutlinedIcon />
            </IconButton>

            <IconButton
              title="Top up balance"
              disabled={isToppingUpBalance}
              onClick={() => {
                void openTopUpBalanceDialog()
                  .then((dollars: number) => {
                    topUpBalance({userId: id, dollars});
                    return;
                  })
                  .catch(() => {});
              }}
            >
              <AttachMoneyOutlinedIcon />
            </IconButton>
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
      // layoutMode="grid-no-grow"
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
