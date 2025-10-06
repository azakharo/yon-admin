import {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {MRT_ColumnDef, MRT_ColumnFiltersState} from 'material-react-table';

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

const getCategories = async (nameFilter?: string): Promise<TaskCategory[]> => {
  await sleep(1000); // simulate delay

  if (nameFilter) {
    const searchString = nameFilter.toLowerCase();

    return allCategories.filter(({name}) => {
      return name.toLowerCase().includes(searchString);
    });
  }

  return allCategories;
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

  const [categories, setCategories] = useState<TaskCategory[]>([]);

  useEffect(() => {
    let nameSearchString = '';

    const nameFilter = columnFilters.find(filter => filter.id === 'name');
    if (nameFilter) {
      nameSearchString = nameFilter.value as string;
    }

    void getCategories(nameSearchString)
      .then(data => {
        setCategories(data);
        return;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [columnFilters]);

  return (
    <MrTable
      columns={columns}
      data={categories}
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
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
      manualFiltering
      enableHiding
      isLoading={loading}
      {...entityTableCommonProps}
    />
  );
};
