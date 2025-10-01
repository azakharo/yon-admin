import {useContext} from 'react';

import {AuthDataContext, ContextProps} from './Context';

export const useAuthData = (): ContextProps =>
  useContext<ContextProps>(AuthDataContext);
