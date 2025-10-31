import {FC} from 'react';
import {Delete as DeleteIcon} from '@mui/icons-material';
import {IconButton, IconButtonProps, Typography} from '@mui/material';
import {UseMutateFunction} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {openConfirmation} from '../../dialogs';

interface Props extends IconButtonProps {
  removeMethod: UseMutateFunction<unknown, Error, number | string, unknown>;
  entityId: number | string;
  confirmationTitle?: string;
  confirmationMainText?: string;
}

export const DeleteButton: FC<Props> = ({
  removeMethod,
  entityId,
  confirmationTitle = 'Delete?',
  confirmationMainText = 'Are you sure that you want to delete the selected recored?',
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
                <Typography>This action can not be undone!</Typography>
              </>
            ),
            okButtonText: 'Delete',
          });
        } catch (_) {
          return;
        }

        removeMethod(entityId, {
          onSuccess: () => {
            enqueueSnackbar('The record has been deleted', {
              variant: 'success',
            });
          },
          onError: () => {
            enqueueSnackbar('Error! Could not delete the record', {
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
