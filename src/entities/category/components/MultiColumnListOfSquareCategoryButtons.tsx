import {Dispatch, FC, SetStateAction} from 'react';
import {useIsMobile} from '@features/responsive';
import {Box} from '@mui/material';

import {Category} from '../types';
import {SquareCategoryButton} from './SquareCategoryButton';

interface Props {
  columnCount: number;
  allCategories: Category[];
  selectedCategoryIds: string[];
  setSelectedCategoryIds: Dispatch<SetStateAction<string[]>>;
}

export const MultiColumnListOfSquareCategoryButtons: FC<Props> = ({
  columnCount,
  allCategories,
  selectedCategoryIds,
  setSelectedCategoryIds,
}) => {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 100px)`,
        gridAutoFlow: 'row',
        gap: isMobile ? '16px' : '24px',
      }}
    >
      {allCategories.map(({id, name, logoUrl}) => {
        const isSelected = selectedCategoryIds.includes(id);

        return (
          <SquareCategoryButton
            key={id}
            imageSrc={logoUrl}
            label={name}
            categoryId={id}
            isSelected={isSelected}
            onClick={() => {
              setSelectedCategoryIds((prevSelected: string[]) => {
                let newSelected = [...prevSelected];
                if (isSelected) {
                  newSelected = newSelected.filter(catId => catId !== id);
                } else {
                  newSelected.push(id);
                }

                return newSelected;
              });
            }}
          />
        );
      })}
    </Box>
  );
};
