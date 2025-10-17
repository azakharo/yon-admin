import {forwardRef} from 'react';
import {Box, MenuItem, Typography} from '@mui/material';

import {ObjectSelect, ObjectSelectProps} from '@shared/components';
import {useGetCategories} from '../../apiHooks';
import {Category} from '../../types';

type Props = Omit<
  ObjectSelectProps<Category>,
  'options' | 'labelProp' | 'valueProp'
>;

export const CategorySelect = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const {data, isPending: isLoading} = useGetCategories();

    return (
      <ObjectSelect
        disabled={isLoading}
        options={data}
        labelProp="name"
        valueProp="id"
        renderOption={({id, name, logoUrl}) => {
          return (
            <MenuItem key={id} value={id}>
              <Box key={id} display="flex" alignItems="center" gap={1.5}>
                <img src={logoUrl} alt="" width="auto" height={24} />

                <Typography>{name}</Typography>
              </Box>
            </MenuItem>
          );
        }}
        {...props}
        ref={ref}
      />
    );
  },
);
