import {InferType, object, string} from 'yup';

export const v8nSchema = object().shape({
  name: string().required(),
});

export type FormValues = InferType<typeof v8nSchema>;
