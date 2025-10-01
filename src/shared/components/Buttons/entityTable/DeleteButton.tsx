import {FC} from 'react';
import {Delete as DeleteIcon} from '@mui/icons-material';
import {IconButton, IconButtonProps, Typography} from '@mui/material';
import {UseMutateFunction} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {openConfirmation} from '../../dialogs';

interface Props extends IconButtonProps {
  removeMethod: UseMutateFunction<unknown, Error, number, unknown>;
  entityId: number;
  confirmationTitle?: string;
  confirmationMainText?: string;
}

export const DeleteButton: FC<Props> = ({
  removeMethod,
  entityId,
  confirmationTitle = 'Удалить?',
  confirmationMainText = 'Вы уверены, что хотите удалить выбранную запись?',
  ...restProps
}) => {
  const {enqueueSnackbar} = useSnackbar();

  return (
    <IconButton
      size="small"
      onClick={async () => {
        try {
          await openConfirmation({
            title: confirmationTitle,
            content: (
              <>
                <Typography>{confirmationMainText}</Typography>
                <br />
                <Typography>
                  Позже при необходимости вы сможете восстановить удалённую
                  запись.
                </Typography>
              </>
            ),
            okButtonText: 'Удалить',
          });
        } catch (_) {
          return;
        }

        removeMethod(entityId, {
          onSuccess: () => {
            enqueueSnackbar('Запись удалена', {
              variant: 'success',
            });
          },
          onError: () => {
            enqueueSnackbar('Ошибка! Не удалось удалить запись', {
              variant: 'error',
            });
          },
        });
      }}
      {...restProps}
    >
      <DeleteIcon />
    </IconButton>
  );
};
