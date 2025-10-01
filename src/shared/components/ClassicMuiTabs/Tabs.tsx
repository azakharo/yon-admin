import {Tabs, tabsClasses, TabsProps} from '@mui/material';

import {ClassicMuiTab} from './Tab';

import {COLOR__BACK, COLOR__MAIN_BLACK} from '@/theme/colors';

export const classicMuiTabsStyles = {
  minHeight: 'auto',
  [`& .${tabsClasses.indicator}`]: {
    backgroundColor: COLOR__MAIN_BLACK,
  },
  borderBottom: 1,
  borderColor: COLOR__BACK,
} as const;

export interface ClassicMuiTabAttrs<TTabValue> {
  value: TTabValue;
  label: string;
}

interface Props<TTabValue> extends Omit<TabsProps, 'value' | 'onChange'> {
  tabs: ClassicMuiTabAttrs<TTabValue>[];
  currentTab: TTabValue;
  onCurrentTabChange: (newTab: TTabValue) => void;
}

export const ClassicMuiTabs = <TTabValue,>({
  tabs,
  currentTab,
  onCurrentTabChange,
  sx,
  ...restProps
}: Props<TTabValue>) => {
  const handleTabChange = (_: unknown, newValue: TTabValue) => {
    onCurrentTabChange(newValue);
  };

  return (
    <Tabs
      value={currentTab}
      onChange={handleTabChange}
      sx={{
        ...classicMuiTabsStyles,
        ...sx,
      }}
      {...restProps}
    >
      {tabs.map(({value, label}) => (
        <ClassicMuiTab key={label} value={value} label={label} />
      ))}
    </Tabs>
  );
};
