import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {MRT_ColumnDef} from 'material-react-table';

import {SubCategory, useGetSubCategories} from '@entities/category';
import {DeleteButton, EditButton, MrTable} from '@shared/components';
import {
  entityTableCommonProps,
  ROUTE__SUB_CATEGORY_CREATE,
  ROUTE__SUB_CATEGORY_EDIT,
} from '@shared/constants';
import {useNotImplementedToast} from '@shared/hooks';
import {BaseComponentLayout} from '@shared/layouts';
import {Header, TableRowActionsContainer} from '../../common';

const columns: MRT_ColumnDef<SubCategory>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 0,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
];

interface Props {
  categoryId: string;
}

export const SubCategoryTable: FC<Props> = ({categoryId}) => {
  const navigate = useNavigate();
  const showNotImplemented = useNotImplementedToast();

  const {data, isPending, error} = useGetSubCategories(categoryId ?? '', {
    enabled: !!categoryId,
  });

  const renderContent = (subCategories: SubCategory[] | undefined) => {
    if (!subCategories) {
      return null;
    }

    return (
      <MrTable
        columns={columns}
        data={subCategories}
        renderTopToolbarCustomActions={() => {
          return (
            <Header
              title={`Sub-categories of ${categoryId}`}
              rightPart={
                <Button
                  onClick={() => {
                    navigate(
                      ROUTE__SUB_CATEGORY_CREATE.replace(
                        ':categoryId',
                        categoryId,
                      ),
                    );
                  }}
                >
                  Create sub-category
                </Button>
              }
            />
          );
        }}
        renderRowActions={({row}) => (
          <TableRowActionsContainer>
            <EditButton
              onClick={() => {
                navigate(
                  ROUTE__SUB_CATEGORY_EDIT.replace(
                    ':categoryId',
                    categoryId,
                  ).replace(':id', row.original.id),
                );
              }}
            />

            <DeleteButton
              removeMethod={showNotImplemented}
              entityId={row.original.id}
              confirmationTitle="Delete sub-category?"
              confirmationMainText="Are you sure that you want to delete the selected sub-category?"
            />
          </TableRowActionsContainer>
        )}
        {...entityTableCommonProps}
      />
    );
  };

  return (
    <BaseComponentLayout isPending={isPending} error={error}>
      {renderContent(data)}
    </BaseComponentLayout>
  );
};
