import {Button} from '@mui/material';
import {MRT_ColumnDef} from 'material-react-table';

import {
  DeleteButton,
  EditButton,
  MrTable,
  TableRowActionsContainer,
} from '@shared/components';
import {entityTableCommonProps} from '@shared/constants';

interface TaskCategory {
  id: number;
  name: string;
  isDefault: boolean;
  typeId: number;
}

const categories: TaskCategory[] = [
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

export const columns: MRT_ColumnDef<TaskCategory>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 0,
  },
  {
    accessorKey: 'name',
    header: 'Название',
  },
  {
    accessorKey: 'isDefault',
    header: 'Группа по умолчанию',
    Cell: ({row}) => {
      return row.original.isDefault ? 'Да' : 'Нет';
    },
  },
  {
    accessorKey: 'typeId',
    header: 'ID типа',
    size: 0,
  },
];

export const TaskCategoryTable = () => {
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
      {...entityTableCommonProps}
    />
  );
};
