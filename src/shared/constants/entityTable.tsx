import {Box} from '@mui/material';

const commonProps = {
  enableRowActions: true,
  positionActionsColumn: 'last',
  enableStickyHeader: true,
  muiTableContainerProps: {
    sx: {
      // 85px - header, 32px - bottom padding
      maxHeight: 'calc(100dvh - 85px - 32px)',
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
