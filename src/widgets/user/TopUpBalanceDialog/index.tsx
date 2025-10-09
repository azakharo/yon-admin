import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {create, InstanceProps} from 'react-modal-promise';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Dialog, DialogActions, DialogContent} from '@mui/material';
import {InferType, object} from 'yup';

import {DialogTitle, InputType, RhfNumberInput} from '@shared/components';
import {numberTransformEmptyStringToNull} from '@shared/utils';

type Props = InstanceProps<number, void>;

const v8nSchema = object().shape({
  dollars: numberTransformEmptyStringToNull.integer().required(),
});

type FormValues = InferType<typeof v8nSchema>;

const TopUpBalanceDialog: FC<Props> = ({onReject, onResolve}) => {
  const {control, handleSubmit} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      dollars: 5,
    },
  });

  const onSubmit = ({dollars}: FormValues): void => {
    onResolve(dollars);
  };

  const handleClose = () => {
    onReject();
  };

  return (
    <Dialog onClose={handleClose} open={true}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle title="Top up balance" onClose={handleClose} />

        <DialogContent
          sx={{
            minWidth: 300,
            paddingTop: '30px !important',
            paddingBottom: '20px',
          }}
        >
          <RhfNumberInput
            name="dollars"
            label="Amount (in US dollar)"
            control={control}
            inputType={InputType.positiveInteger}
          />
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              onReject();
            }}
          >
            Cancel
          </Button>

          <Button type="submit" fullWidth>
            OK
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const openTopUpBalanceDialog = create(TopUpBalanceDialog);
