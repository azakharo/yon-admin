import {useIsMobile} from '@features/responsive';
import {Stack, StackProps} from '@mui/material';
import isEmpty from 'lodash/isEmpty';

import {TabAttrs} from '../Tabs';
import {TabButton} from '../Tabs/TabButton';

const allButtonValue = '';

interface Props<TTabValue> extends StackProps {
  buttons: TabAttrs<TTabValue>[];
  selected: TTabValue[];
  onSelectedChange: (newSelected: TTabValue[]) => void;
}

export const MultipleToggleButtons = <TTabValue,>({
  buttons,
  selected,
  onSelectedChange,
  ...restProps
}: Props<TTabValue>) => {
  const isMobile = useIsMobile();

  const handleSelect = (value: TTabValue) => {
    if (value === allButtonValue) {
      onSelectedChange([]);
      return;
    }

    const isSelected = selected.includes(value);

    if (isSelected) {
      onSelectedChange([...selected].filter(item => item !== value));
    } else {
      onSelectedChange([...selected, value]);
    }
  };

  return (
    <Stack
      direction="row"
      gap={isMobile ? 1 : 1.5}
      flexWrap="wrap"
      {...restProps}
    >
      {buttons.map(({value, label, counter}) => (
        <TabButton
          key={label}
          value={value}
          label={label}
          counter={counter}
          isSelected={
            selected.includes(value) ||
            (value === allButtonValue && isEmpty(selected))
          }
          onSelect={() => handleSelect(value)}
        />
      ))}
    </Stack>
  );
};
