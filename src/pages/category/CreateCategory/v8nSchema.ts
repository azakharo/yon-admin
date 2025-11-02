import {FileWithPath} from 'react-dropzone';
import {InferType, mixed, object, string} from 'yup';

export const v8nSchema = object().shape({
  name: string().required(),
  description: string().required(),
  logoFile: mixed<FileWithPath>().required().nullable(),
  bannerFile: mixed<FileWithPath>().required().nullable(),
});

export type FormValues = InferType<typeof v8nSchema>;
