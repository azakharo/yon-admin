import {forwardRef} from 'react';

import {ObjectSelect, ObjectSelectProps} from '@shared/components';
import {useGetSubCategories} from '../../apiHooks';
import {SubCategory} from '../../types';

type Props = Omit<
  ObjectSelectProps<SubCategory>,
  'options' | 'labelProp' | 'valueProp'
> & {
  categoryId: string;
};

export const SubCategorySelect = forwardRef<HTMLInputElement, Props>(
  ({categoryId, ...restProps}: Props, ref) => {
    const {data, isPending: isLoading} = useGetSubCategories(categoryId, {
      enabled: !!categoryId,
    });

    return (
      <ObjectSelect
        disabled={isLoading}
        options={data}
        labelProp="name"
        valueProp="id"
        {...restProps}
        ref={ref}
      />
    );
  },
);
