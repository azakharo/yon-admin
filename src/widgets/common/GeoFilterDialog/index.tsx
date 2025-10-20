import {FC, FormEvent, useState} from 'react';
import {create, InstanceProps} from 'react-modal-promise';
import {useIsMobile} from '@features/responsive';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import isEmpty from 'lodash/isEmpty';

import {GeoFilterOption, useGetGeoFilterOptions} from '@entities/common';
import {Dialog} from '@shared/components';
import {BaseComponentLayout} from '@shared/layouts';
import {Item} from './Item';

import {COLOR__GRAY} from '@/theme/colors';

// Input: initial/current filter ids
// Output: a new filter ids
interface Props extends InstanceProps<string[]> {
  initialFilterOptionIds: string[];
}

const GeoFilterDialog: FC<Props> = ({
  initialFilterOptionIds,
  onReject,
  onResolve,
}) => {
  const isMobile = useIsMobile();
  const {
    data,
    isPending: isLoadingFilterOptions,
    error: errorLoadingFilterOptions,
  } = useGetGeoFilterOptions();
  const [filterOptionIds, setFilterOptionIds] = useState(
    initialFilterOptionIds,
  );

  const renderContent = (filterOptions: GeoFilterOption[] | undefined) => {
    if (!filterOptions) {
      return null;
    }

    return (
      <Stack
        divider={<Divider />}
        maxHeight="60vh"
        sx={{overflowY: 'auto'}}
        mt={2}
      >
        {isEmpty(filterOptions) ? (
          <Box pt={1} pl={2}>
            No data
          </Box>
        ) : (
          filterOptions.map(opt => {
            return (
              <Item
                key={opt.id}
                filterOption={opt}
                isSelected={filterOptionIds.includes(opt.id)}
                onSelect={(id, newValue) => {
                  let newFilterOptionIds = [...filterOptionIds];
                  if (newValue) {
                    newFilterOptionIds.push(id);
                  } else {
                    newFilterOptionIds = newFilterOptionIds.filter(
                      i => i !== id,
                    );
                  }
                  setFilterOptionIds(newFilterOptionIds);
                }}
              />
            );
          })
        )}
      </Stack>
    );
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onResolve(filterOptionIds);
  };

  return (
    <Dialog
      onClose={() => {
        onReject();
      }}
      open={true}
    >
      <form
        onSubmit={onSubmit}
        noValidate
        style={
          isMobile
            ? {height: '100%', display: 'flex', flexDirection: 'column'}
            : undefined
        }
      >
        <MuiDialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h1">Select GEO tags</Typography>

          <Button
            variant="text"
            sx={{
              color: COLOR__GRAY,
              paddingY: 1,
              paddingX: 2,
              marginLeft: 'auto',
              marginRight: 2,
            }}
            onClick={() => {
              setFilterOptionIds([]);
            }}
          >
            Reset
          </Button>

          <IconButton
            size="small"
            aria-label="close"
            onClick={() => {
              onReject();
            }}
            sx={{
              marginRight: 0.5,
            }}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>

        <DialogContent
          sx={{width: isMobile ? '100%' : 400, flex: isMobile ? 1 : undefined}}
        >
          <BaseComponentLayout
            isPending={isLoadingFilterOptions}
            error={errorLoadingFilterOptions}
          >
            {renderContent(data)}
          </BaseComponentLayout>
        </DialogContent>

        <DialogActions>
          <Button fullWidth type="submit">
            Apply
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const openGeoFilterDialog = create(GeoFilterDialog);
