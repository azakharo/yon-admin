import {MRT_ColumnDef} from 'material-react-table';

import {GeoFilterOption, useGetGeoFilterOptions} from '@entities/common';
import {DeleteButton, EditButton, MrTable} from '@shared/components';
import {entityTableCommonProps} from '@shared/constants';
import {useNotImplementedToast} from '@shared/hooks';
import {BaseComponentLayout} from '@shared/layouts';
import {TableRowActionsContainer} from '../../common';

const columns: MRT_ColumnDef<GeoFilterOption>[] = [
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
    accessorKey: 'logo_url',
    header: 'Logo',
    Cell: ({
      row: {
        original: {logo_url},
      },
    }) => {
      if (!logo_url) {
        return null;
      }

      return <img src={logo_url} alt="" width="auto" height={24} />;
    },
  },
];

export const GeoCategoryTable = () => {
  const showNotImplemented = useNotImplementedToast();
  const {data, isPending, error} = useGetGeoFilterOptions();

  const renderContent = (categories: GeoFilterOption[] | undefined) => {
    if (!categories) {
      return null;
    }

    return (
      <MrTable
        columns={columns}
        data={categories}
        renderRowActions={({row}) => (
          <TableRowActionsContainer>
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
