import {useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import useUpdateEffect from 'ahooks/es/useUpdateEffect';
import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  MRT_ColumnOrderState,
  MRT_TableOptions,
  MRT_VisibilityState,
  useMaterialReactTable,
} from 'material-react-table';

import {loadDataFromLocalStorage, saveDataToLocalStorage} from '../../../utils';
import {ClickToSortIcon} from './icons/ClickToSortIcon';
import {SortIcon} from './icons/SortIcon';

import {COLOR__BACK, COLOR__LINE} from '@/theme/colors';
import {tablePaperStyles} from '@/theme/components/table';
import typographyOptions from '@/theme/typography';

const sortIconCommonStyles = {ml: 1} as const;

interface TablePersistentSettings {
  columnOrder?: MRT_ColumnOrderState;
  columnVisibility?: MRT_VisibilityState;
}

interface Props<T extends object> extends MRT_TableOptions<T> {
  localStorageKeyForSettings?: string;
  columnFilters?: MRT_ColumnFiltersState;
  isLoading?: boolean;
}

export const MrTable = <T extends object>({
  localStorageKeyForSettings,
  enableColumnOrdering,
  columnFilters,
  enableColumnFilters,
  enableHiding,
  isLoading,
  ...restProps
}: Props<T>) => {
  const persistentSettings: TablePersistentSettings | null =
    localStorageKeyForSettings
      ? (loadDataFromLocalStorage<TablePersistentSettings>(
          localStorageKeyForSettings,
        ) ?? null)
      : null;

  // The search value is taken from URL.
  // It will take effect only if enableGlobalFilter prop is set to True.
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search') ?? '';

  const colNames = useMemo(() => {
    return restProps.columns.map(col => col.accessorKey) as string[];
  }, [restProps.columns]);

  const [columnOrder, setColumnOrder] = useState<MRT_ColumnOrderState>(
    persistentSettings?.columnOrder ?? colNames,
  );

  const defaultColumnVisibility = {} as MRT_VisibilityState;
  for (const colName of colNames) {
    defaultColumnVisibility[colName] = true;
  }
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    persistentSettings?.columnVisibility ?? defaultColumnVisibility,
  );

  useUpdateEffect(() => {
    if (localStorageKeyForSettings) {
      saveDataToLocalStorage<TablePersistentSettings>(
        {
          ...persistentSettings,
          columnVisibility,
        },
        localStorageKeyForSettings,
      );
    }
  }, [columnVisibility]);

  const table = useMaterialReactTable({
    enableGlobalFilter: false,
    enableColumnActions: false,
    enableColumnFilters,
    enablePagination: false,
    enableSorting: true,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableBottomToolbar: false,
    enableHiding,
    enableTopToolbar: enableHiding,
    enableColumnOrdering: enableColumnOrdering,
    enableColumnDragging: enableColumnOrdering,
    onColumnOrderChange: enableColumnOrdering
      ? newColumnOrder => {
          setColumnOrder(newColumnOrder);

          if (localStorageKeyForSettings) {
            saveDataToLocalStorage<TablePersistentSettings>(
              {
                ...persistentSettings,
                columnOrder: newColumnOrder as MRT_ColumnOrderState,
              },
              localStorageKeyForSettings,
            );
          }
        }
      : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    muiTablePaperProps: {
      sx: {
        ...tablePaperStyles,
        boxShadow:
          '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      },
    },
    muiTableHeadCellProps: {
      sx: {
        padding: 1.5,
        backgroundColor: COLOR__BACK,
        ...typographyOptions.b1bold,
        '& .Mui-TableHeadCell-Content-Labels': {
          flexDirection: 'row',
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        padding: 1.5,
        borderBottom: `1px solid ${COLOR__LINE}`,
      },
    },
    muiFilterTextFieldProps: {
      variant: 'outlined',
    },
    icons: {
      SyncAltIcon: () => <ClickToSortIcon sx={sortIconCommonStyles} />,
      ArrowDownwardIcon: ({className}: {className: string}) => {
        return (
          <SortIcon
            sx={sortIconCommonStyles}
            sortOrder={
              className.includes('MuiTableSortLabel-iconDirectionDesc')
                ? 'desc'
                : 'asc'
            }
          />
        );
      },
    },
    ...restProps,
    initialState: {
      showColumnFilters: enableColumnFilters,
    },
    // Чтобы TS не ругался, state должен быть передан ПОСЛЕ props.
    // Почему так, пока непонятно.
    state: {
      globalFilter: searchText,
      columnOrder,
      columnFilters,
      columnVisibility,
      isLoading,
    },
    globalFilterFn: 'contains', // turn off fuzzy matching and use simple contains filter function
  });

  return <MaterialReactTable table={table} />;
};

export const rightAlignmentColumnProps = {
  muiTableHeadCellProps: {
    align: 'right',
  },
  muiTableBodyCellProps: {
    align: 'right',
  },
} as const;

export const centerAlignmentColumnProps = {
  muiTableHeadCellProps: {
    align: 'center',
  },
  muiTableBodyCellProps: {
    align: 'center',
  },
} as const;
