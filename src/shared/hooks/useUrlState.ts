import {NavigateOptions} from 'react-router-dom';
import {useUrlState as useUrlStateOriginal} from 'state-in-url/react-router';
import {JSON} from 'state-in-url/utils';

type JSONCompatible = {
  [prop: string]: JSON | JSON[];
};

interface Params extends NavigateOptions {
  useHistory?: boolean;
  searchParams?: object;
  replace?: boolean;
}

export const useUrlState = <T extends JSONCompatible>(
  defaultState: T,
  params?: Params,
) => {
  return useUrlStateOriginal(defaultState, {
    replace: true,
    preventScrollReset: true,
    ...params,
  });
};
