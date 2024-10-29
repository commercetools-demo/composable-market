import React, { useMemo, useState } from 'react';
import DataTable from '@commercetools-uikit/data-table';
import { useHistory, useRouteMatch } from 'react-router';

type Props = {
  items: any[];
};

type SortState = {
  key: string;
  dir: 'asc' | 'desc';
};

const columns = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'type',
    label: 'Type',
  },
  {
    key: 'region',
    label: 'Region',
  },
];

const MarketplaceList = ({ items }: Props) => {
  const { push } = useHistory();
  const match = useRouteMatch();
  const [checkedRowsState, setCheckedRowsState] = useState<
    Record<string, boolean>
  >({});
  const [sort, setSort] = useState<SortState>({
    key: 'name',
    dir: 'asc',
  });
  const rows = useMemo(() => {
    if (!sort) {
      return items;
    }
    const { key, dir } = sort;
    return items.slice().sort((a, b) => {
      if (a[key] < b[key]) {
        return dir === 'asc' ? -1 : 1;
      }

      if (a[key] > b[key]) {
        return dir === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [sort]);
  const tableColumns = useMemo(() => {
    return [...columns];
  }, [columns, checkedRowsState]);
  return (
    <div>
      <DataTable
        rows={rows}
        columns={tableColumns}
        sortedBy={sort.key}
        sortDirection={sort.dir}
        onRowClick={(row) => {
          console.log(row);
          push(`${match.url}/${row.type}/${row.region}/${row.id}`);
        }}
      />
    </div>
  );
};

export default MarketplaceList;
