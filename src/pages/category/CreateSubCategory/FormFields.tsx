import {useFormContext} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {Stack} from '@mui/material';

import {FormValues} from './v8nSchema';

export const FormFields = () => {
  const {control} = useFormContext<FormValues>();

  return (
    <Stack>
      <TextFieldElement
        name="name"
        label="Name"
        control={control}
        autoFocus
        placeholder="name"
        sx={{
          marginTop: 2,
        }}
      />
    </Stack>
  );
};
