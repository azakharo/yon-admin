import {useIsMobile} from '@features/responsive';
import {Stack, StackProps} from '@mui/material';

import {TabButton} from './TabButton';

export interface TabAttrs<TTabValue> {
  value: TTabValue;
  label: string;
  counter?: number;
}

interface Props<TTabValue> extends StackProps {
  tabs: TabAttrs<TTabValue>[];
  currentTab: TTabValue;
  onCurrentTabChange: (newTab: TTabValue) => void;
}

export const Tabs = <TTabValue,>({
  tabs,
  currentTab,
  onCurrentTabChange,
  sx,
  ...restProps
}: Props<TTabValue>) => {
  const isMobile = useIsMobile();

  return (
    <Stack
      direction="row"
      gap={isMobile ? 1 : 1.5}
      flexWrap="wrap"
      sx={{
        // Fix portfolio active events squashing of tab buttons
        minHeight: 'fit-content',
        ...sx,
      }}
      {...restProps}
    >
      {tabs.map(({value, label, counter}) => (
        <TabButton
          key={label}
          value={value}
          label={label}
          counter={counter}
          isSelected={currentTab === value}
          onSelect={onCurrentTabChange}
        />
      ))}
    </Stack>
  );
};
