import {FC} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useIsMobile} from '@features/responsive';
import {Stack, StackProps} from '@mui/material';

import {NavTabAttrs} from '../../types';
import {TabButton} from './TabButton';

interface Props extends StackProps {
  tabs: NavTabAttrs[];
}

export const NavTabs: FC<Props> = ({tabs, sx, ...restProps}) => {
  const navigate = useNavigate();
  const {pathname: currentRoute} = useLocation();
  const isMobile = useIsMobile();

  return (
    <Stack
      direction="row"
      gap={isMobile ? 1 : 1.5}
      flexWrap="wrap"
      {...restProps}
    >
      {tabs.map(({route, label}) => (
        <TabButton
          key={label}
          value={route}
          label={label}
          isSelected={route === currentRoute}
          onSelect={() => {
            navigate(route, {replace: true, preventScrollReset: true});
          }}
        />
      ))}
    </Stack>
  );
};
