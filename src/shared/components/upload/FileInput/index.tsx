import {Accept, FileWithPath, useDropzone} from 'react-dropzone';
import {Controller, Path, useFormContext, useWatch} from 'react-hook-form';
import {Box, Button, FormHelperText, Typography} from '@mui/material';

import {FileToUploadThumbnail} from '../FileToUploadThumbnail';

export const imageFileTypes: Accept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/webp': ['.webp'],
} as const;

const dropzoneCommonOptions = {
  // Disable click and keydown behavior
  noClick: true,
  noKeyboard: true,
} as const;

const fileInputContainerProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 1,
  minHeight: 58,
  sx: {
    marginTop: '18px !important',
  },
} as const;

interface Props<TFormValues extends object> {
  fieldName: Path<TFormValues>;
  acceptedFileTypes: Accept;
  existingFileUrl?: string;
}

export const FileInput = <TFormValues extends object>({
  fieldName,
  acceptedFileTypes,
  existingFileUrl,
}: Props<TFormValues>) => {
  const {control, setValue, trigger} = useFormContext<TFormValues>();
  const currentFile = useWatch({
    control,
    name: fieldName,
  }) as FileWithPath | null;
  const {
    getRootProps,
    getInputProps,
    open: openFileSelectDialog,
  } = useDropzone({
    accept: acceptedFileTypes,
    ...dropzoneCommonOptions,
    onDrop: newlySelectedFiles => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setValue(fieldName, newlySelectedFiles[0] ?? null);
      void trigger();
    },
  });

  return (
    <Controller
      render={({fieldState}) => (
        <Box {...fileInputContainerProps}>
          <Typography minWidth="10ch">Logo icon:</Typography>

          {existingFileUrl && !currentFile && (
            <img src={existingFileUrl} alt="" width="auto" height={24} />
          )}

          <Box
            {...(currentFile
              ? {
                  flex: 1,
                  display: 'flex',
                  gap: 1.25,
                  flexWrap: 'wrap',
                }
              : undefined)}
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            {currentFile && (
              <FileToUploadThumbnail
                key={currentFile.name}
                file={currentFile}
                onRemove={() => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setValue(fieldName, null);
                }}
              />
            )}
          </Box>

          {!currentFile && (
            <Button onClick={openFileSelectDialog} variant="outlined">
              {existingFileUrl ? 'Change...' : 'Select...'}
            </Button>
          )}

          {fieldState.invalid && (
            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
          )}
        </Box>
      )}
      name={fieldName}
      control={control}
    />
  );
};
