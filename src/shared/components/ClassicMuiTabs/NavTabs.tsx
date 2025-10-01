import {FC} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Tabs, TabsProps} from '@mui/material';

import {NavTabAttrs} from '../../types';
import {ClassicMuiTab} from './Tab';
import {classicMuiTabsStyles} from './Tabs';

interface Props extends Omit<TabsProps, 'value' | 'onChange'> {
  tabs: NavTabAttrs[];
}

export const ClassicMuiNavTabs: FC<Props> = ({tabs, sx, ...restProps}) => {
  const {pathname: currentRoute} = useLocation();

  return (
    <Tabs
      value={currentRoute}
      sx={{
        ...classicMuiTabsStyles,
        ...sx,
      }}
      {...restProps}
    >
      {tabs.map(({route, label}) => (
        <ClassicMuiTab
          key={route}
          value={route}
          label={label}
          component={Link}
          to={route}
          replace
          preventScrollReset
        />
      ))}
    </Tabs>
  );
};
