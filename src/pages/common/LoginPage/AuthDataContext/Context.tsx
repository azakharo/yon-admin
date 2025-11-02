import React, {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';

export interface ContextProps {
  phone: string;
  setPhone: (value: string) => void;

  countryCode: string;
  setCountryCode: (value: string) => void;

  tokenToEnterSmsCode: string;
  setTokenToEnterSmsCode: (value: string) => void;
}

export const AuthDataContext = createContext<ContextProps>({
  phone: '',
  setPhone: () => {},
  countryCode: '',
  setCountryCode: () => {},
  tokenToEnterSmsCode: '',
  setTokenToEnterSmsCode: () => {},
});

export const AuthDataProvider: FC<PropsWithChildren> = ({children}) => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [tokenToEnterSmsCode, setTokenToEnterSmsCode] = useState('');

  const contextValue = useMemo(
    () => ({
      phone,
      setPhone,
      countryCode,
      setCountryCode,
      tokenToEnterSmsCode,
      setTokenToEnterSmsCode,
    }),
    [
      phone,
      setPhone,
      countryCode,
      setCountryCode,
      tokenToEnterSmsCode,
      setTokenToEnterSmsCode,
    ],
  );

  return (
    <AuthDataContext.Provider value={contextValue}>
      {children}
    </AuthDataContext.Provider>
  );
};
