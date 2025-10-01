import {InfiniteData} from '@tanstack/react-query';

import {GetListOutput} from '../api';

const createInfiniteQueryInitialData = <TData>(): InfiniteData<
  GetListOutput<TData>,
  number
> => {
  return {
    pages: [{items: [], total: 0, page: 1, pageSize: 0, totalPages: 0}],
    pageParams: [1],
  };
};

export const createInfiniteQueryCommonParams = <TData>() => {
  return {
    initialPageParam: 1,
    getNextPageParam: ({
      page,
      totalPages,
    }: {
      page: number;
      totalPages: number;
    }) => {
      return page < totalPages ? page + 1 : null;
    },
    initialData: createInfiniteQueryInitialData<TData>(),
  } as const;
};

export const createInfiniteQueryUpdater = <TData, TMutationParams>(
  updaterFunc: (item: TData, mutationParams: TMutationParams) => TData,
  params: TMutationParams,
) => {
  return (data: InfiniteData<GetListOutput<TData>>) => {
    if (data) {
      return {
        ...data,
        pages: data.pages.map(page => {
          return {
            ...page,
            items: page.items.map(item => updaterFunc(item, params)),
          };
        }),
      };
    }

    return data;
  };
};
