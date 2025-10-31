import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {MRT_ColumnDef} from 'material-react-table';

import {Category, useGetCategories} from '@entities/category';
import {DeleteButton, EditButton, MrTable} from '@shared/components';
import {entityTableCommonProps, ROUTE__SUB_CATEGORIES} from '@shared/constants';
import {useNotImplementedToast} from '@shared/hooks';
import {BaseComponentLayout} from '@shared/layouts';
import {TableRowActionsContainer} from '../../common';

const columns: MRT_ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 0,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'logoUrl',
    header: 'Logo',
    Cell: ({
      row: {
        original: {logoUrl},
      },
    }) => {
      if (!logoUrl) {
        return null;
      }

      return <img src={logoUrl} alt="" width="auto" height={24} />;
    },
  },
  {
    accessorKey: 'bannerUrl',
    header: 'Banner',
    Cell: ({
      row: {
        original: {bannerUrl},
      },
    }) => {
      if (!bannerUrl) {
        return null;
      }

      return <img src={bannerUrl} alt="" width="auto" height={24} />;
    },
  },
];

export const CategoryTable = () => {
  const navigate = useNavigate();
  const showNotImplemented = useNotImplementedToast();
  const {data, isPending, error} = useGetCategories();

  const renderContent = (categories: Category[] | undefined) => {
    if (!categories) {
      return null;
    }

    return (
      <MrTable
        columns={columns}
        data={categories}
        renderRowActions={({row}) => (
          <TableRowActionsContainer>
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                navigate(
                  ROUTE__SUB_CATEGORIES.replace(':categoryId', row.original.id),
                );
              }}
            >
              Sub-categories
            </Button>

            <EditButton
              onClick={
                // async () => {
                //   try {
                //     await openChangeTaskCategoryDialog({
                //       originalCategory: row.original,
                //     });
                //   } catch (e) {
                //     // on cancel do nothing
                //     return;
                //   }
                // }
                showNotImplemented
              }
            />

            <DeleteButton
              removeMethod={showNotImplemented}
              entityId={row.original.id}
              confirmationTitle="Delete category?"
              confirmationMainText="Are you sure that you want to delete the selected category?"
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
