import {FC} from 'react';

interface Props {
  countryIsoCode: string;
}

export const CountryFlag: FC<Props> = ({countryIsoCode}) => {
  return (
    <span
      className={`fi fi-${countryIsoCode.toLowerCase()} fis`}
      style={{width: 20, height: 20, borderRadius: '50%'}}
    ></span>
  );
};
