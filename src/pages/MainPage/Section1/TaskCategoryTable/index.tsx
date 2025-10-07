import {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
} from 'material-react-table';

import {GetListOutput, GetListParams} from '@shared/api';
import {
  DeleteButton,
  EditButton,
  MrTable,
  TableRowActionsContainer,
} from '@shared/components';
import {entityTableCommonProps} from '@shared/constants';
import {sleep} from '@shared/utils';

interface TaskCategory {
  id: number;
  name: string;
  isDefault: boolean;
  typeId: number;
}

const allCategories: TaskCategory[] = [
  {
    id: 1,
    name: 'Категория №1 для типа №1',
    isDefault: false,
    typeId: 12,
  },
  {
    id: 2,
    name: 'Категория №2 для типа №1',
    isDefault: false,
    typeId: 12,
  },
  {
    id: 3,
    name: 'Категория №1 для типа №2',
    isDefault: true,
    typeId: 13,
  },
  {
    id: 4,
    name: 'Категория №2 для типа №2',
    isDefault: false,
    typeId: 13,
  },
  {
    id: 5,
    name: 'Категория №1 для типа №3',
    isDefault: true,
    typeId: 14,
  },
  {
    id: 7,
    name: 'Категория №2 для типа №3',
    isDefault: false,
    typeId: 14,
  },
  {
    id: 8,
    name: 'Проверка ценников',
    isDefault: true,
    typeId: 29,
  },
  {
    id: 9,
    name: 'Zero pick',
    isDefault: true,
    typeId: 28,
  },
  {
    id: 10,
    name: 'Задача MRM',
    isDefault: true,
    typeId: 3,
  },
  {
    id: 12,
    name: 'Категория 3 для типа 1, попытка 3',
    isDefault: true,
    typeId: 13,
  },
];

interface GetCategoriesParams extends GetListParams {
  nameFilter?: string;
}

const getCategories = async ({
  nameFilter,
  page,
  pageSize,
}: GetCategoriesParams = {}): Promise<GetListOutput<TaskCategory>> => {
  await sleep(1000); // simulate delay

  let filteredCategories = allCategories;
  if (nameFilter) {
    const searchString = nameFilter.toLowerCase();

    filteredCategories = allCategories.filter(({name}) => {
      return name.toLowerCase().includes(searchString);
    });
  }

  if (page && pageSize) {
    const startPos = (page - 1) * pageSize;
    const items = filteredCategories.slice(startPos, startPos + pageSize);

    return {
      items: items,
      page,
      pageSize,
      total: filteredCategories.length,
      totalPages: Math.ceil(filteredCategories.length / pageSize),
    };
  }

  return {
    items: filteredCategories,
    page: 1,
    pageSize: 10,
    total: filteredCategories.length,
    totalPages: 1,
  };
};

const columns: MRT_ColumnDef<TaskCategory>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 0,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'name',
    header: 'Название',
    muiFilterTextFieldProps: {
      placeholder: 'name',
    },
  },
  {
    accessorKey: 'isDefault',
    header: 'Группа по умолчанию',
    Cell: ({row}) => {
      return row.original.isDefault ? 'Да' : 'Нет';
    },
    // filterVariant: 'checkbox',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'typeId',
    header: 'ID типа',
    size: 0,
    enableColumnFilter: false,
  },
];

const localStorageKey = 'section1Table';

export const TaskCategoryTable = () => {
  const [loading, setLoading] = useState(true);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });

  const [categories, setCategories] = useState<GetListOutput<TaskCategory>>({
    items: [],
    page: 1,
    pageSize: 2,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    let nameSearchString = '';

    const nameFilter = columnFilters.find(filter => filter.id === 'name');
    if (nameFilter) {
      nameSearchString = nameFilter.value as string;
    }

    void getCategories({
      page: pagination.pageIndex + 1,
      pageSize: 2,
      nameFilter: nameSearchString,
    })
      .then(data => {
        setCategories(data);
        return;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [columnFilters, pagination]);

  return (
    <MrTable
      columns={columns}
      data={categories.items}
      renderRowActions={({row}) => (
        <TableRowActionsContainer>
          <Button variant="text" color="secondary">
            Подкатегории
          </Button>

          <EditButton />

          <DeleteButton
            removeMethod={() => {}}
            entityId={row.original.id}
            disabled={false}
            confirmationTitle="Удалить категорию?"
            confirmationMainText="Вы уверены, что хотите удалить выбранную категорию задач?"
          />
        </TableRowActionsContainer>
      )}
      enableColumnOrdering
      localStorageKeyForSettings={localStorageKey}
      enableColumnFilters
      onColumnFiltersChange={setColumnFilters}
      manualFiltering
      enableHiding
      enableRowSelection
      // getRowId={originalRow => {
      //   console.log({originalRow});
      //
      //   if (!isNil(originalRow?.id)) {
      //     return originalRow.id.toString();
      //   }
      //
      //   return '';
      // }}
      renderTopToolbarCustomActions={({table}) => (
        <Button
          onClick={() => {
            const rowSelection = table.getState().rowSelection; //read state
            console.log({rowSelection});
          }}
        >
          Do something
        </Button>
      )}
      enablePagination
      manualPagination
      state={{
        isLoading: loading,
        columnFilters,
        pagination,
      }}
      onPaginationChange={setPagination}
      rowCount={categories.total}
      {...entityTableCommonProps}
    />
  );
};
