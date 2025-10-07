import {Box} from '@mui/material';

const commonProps = {
  enableRowActions: true,
  positionActionsColumn: 'last',
  enableStickyHeader: true,
  muiTableContainerProps: {
    sx: {
      // 66px - header,
      // 32px - padding Y,
      // 56px - pagination,
      // 58px - top toolbar
      maxHeight: 'calc(100dvh - 66px - 32px - 56px - 58px)',
    },
  },
} as const;

export const entityTableCommonProps = {
  ...commonProps,
  renderEmptyRowsFallback: () => (
    <Box p={4} display="flex" justifyContent="center">
      Нет записей
    </Box>
  ),
} as const;

export const deletedEntityTableCommonProps = {
  ...commonProps,
  renderEmptyRowsFallback: () => (
    <Box p={4} display="flex" justifyContent="center">
      Нет удалённых записей
    </Box>
  ),
} as const;
