import {FC, PropsWithChildren, ReactElement} from 'react';
import {useIsMobile} from '@features/responsive';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box, ButtonBase} from '@mui/material';
import useToggle from 'ahooks/es/useToggle';

interface Props {
  label: ReactElement;
  value: ReactElement | null;
  paddingLeft: number;
  isListExpandable: boolean;
  isExpandable?: boolean;
  initialExpandState?: boolean;
}

export const Item: FC<PropsWithChildren<Props>> = ({
  label,
  value,
  paddingLeft,
  children,
  isListExpandable,
  isExpandable = false,
  initialExpandState = false,
}) => {
  const isMobile = useIsMobile();
  const [isExpanded, {toggle: toggleIsExpanded}] =
    useToggle(initialExpandState);

  const heading = (
    <Box
      display="flex"
      alignItems="center"
      gap={isMobile ? 1 : 6}
      justifyContent="flex-start"
      pl={paddingLeft}
      // pr=4, because icon 24x24 + 1 gap
      pr={isListExpandable && !isExpandable ? 4 : undefined}
    >
      {label}
      <Box marginLeft="auto">{value}</Box>

      {isListExpandable &&
        isExpandable &&
        (isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
    </Box>
  );

  return (
    <>
      {isListExpandable && isExpandable ? (
        <ButtonBase onClick={toggleIsExpanded} sx={{display: 'contents'}}>
          {heading}
        </ButtonBase>
      ) : (
        heading
      )}

      {(!isListExpandable || !isExpandable || (isExpandable && isExpanded)) &&
        children}
    </>
  );
};
