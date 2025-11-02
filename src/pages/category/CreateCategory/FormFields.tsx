import {FC} from 'react';
import {useFormContext} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {Stack} from '@mui/material';

import {FileInput, imageFileTypes} from '@shared/components';
import {FormValues} from './v8nSchema';

interface Props {
  existingLogoUrl?: string;
  existingBannerUrl?: string;
}

export const FormFields: FC<Props> = ({existingLogoUrl, existingBannerUrl}) => {
  const {control} = useFormContext<FormValues>();

  return (
    <Stack spacing={6} mt={2}>
      <TextFieldElement
        name="name"
        label="Name"
        control={control}
        autoFocus
        placeholder="name"
      />

      <TextFieldElement
        name="description"
        label="Description"
        control={control}
        placeholder="description"
        multiline
        rows={4}
        InputProps={{
          inputComponent: 'textarea',
        }}
      />

      <FileInput
        fieldName="logoFile"
        acceptedFileTypes={imageFileTypes}
        existingFileUrl={existingLogoUrl}
      />

      <FileInput
        fieldName="bannerFile"
        acceptedFileTypes={imageFileTypes}
        existingFileUrl={existingBannerUrl}
      />
    </Stack>
  );
};
