import {FC} from 'react';
import RestoreIcon from '@mui/icons-material/RestoreOutlined';
import {IconButton, IconButtonProps} from '@mui/material';
import {UseMutateFunction} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

interface Props extends IconButtonProps {
  restoreMethod: UseMutateFunction<unknown, Error, number, unknown>;
  entityId: number;
}

export const RestoreButton: FC<Props> = ({
  restoreMethod,
  entityId,
  ...restProps
}) => {
  const {enqueueSnackbar} = useSnackbar();

  return (
    <IconButton
      size="small"
      title="Восстановить"
      onClick={() => {
        restoreMethod(entityId, {
          onSuccess: () => {
            enqueueSnackbar('Запись восстановлена', {
              variant: 'success',
            });
          },
          onError: () => {
            enqueueSnackbar('Ошибка! Не удалось восстановить запись', {
              variant: 'error',
            });
          },
        });
      }}
      {...restProps}
    >
      <RestoreIcon />
    </IconButton>
  );
};
