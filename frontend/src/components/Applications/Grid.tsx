import * as React from 'react';
import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ElectricityApplication } from '@/schemas/application.schema';
import { DatePickerWithRange } from '../ui/date-range';
import { Navigate, Link } from 'react-router-dom';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

export const columns: ColumnDef<ElectricityApplication>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
    enableHiding: false,
    filterFn: (rows, id, filterValue) => {
      const applId = rows.getValue<number>(id);
      return String(applId).startsWith(filterValue);
    },
  },
  {
    accessorKey: 'applicantName',
    header: 'Applicant Name',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('applicantName')}</div>
    ),
    enableHiding: false,
  },
  {
    id: 'dateSubmitted',
    accessorKey: 'dateSubmitted',
    header: 'Date Applied',
    cell: ({ row }) => (
      <div>{format(row.getValue('dateSubmitted'), 'LLL dd, y')}</div>
    ),
    filterFn: (row, colId, filterValue: DateRange[]) => {
      const date = row.getValue<Date>(colId);
      const dateRange = filterValue[0];

      if (dateRange.from && dateRange.to) {
        return date >= dateRange.from && date <= dateRange.to;
      }
      return false;
    },
  },
  {
    id: 'dateApproved',
    accessorKey: 'dateApproved',
    header: 'Date Approved',
    cell: ({ row }) => {
      const value = row.getValue<Date | null>('dateApproved');
      return <div>{value ? format(value, 'LLL dd, y') : '-'}</div>;
    },
  },
  {
    id: 'lastModified',
    accessorKey: 'lastModified',
    header: 'Last Updated',
    cell: ({ row }) => (
      <div>{format(row.getValue('lastModified'), 'LLL dd, y')}</div>
    ),
  },
  {
    id: 'state',
    accessorKey: 'state',
    header: 'State',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('state')}</div>
    ),
  },
  {
    id: 'district',
    accessorKey: 'district',
    header: 'District',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('district')}</div>
    ),
  },
  {
    id: 'pincode',
    accessorKey: 'pincode',
    header: 'Postal Code',
    cell: ({ row }) => <div>{row.getValue('pincode')}</div>,
  },
  {
    id: 'govtIdType',
    accessorKey: 'govtIdType',
    header: 'Govt ID Type',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('govtIdType')}</div>
    ),
  },

  {
    id: 'govtIdNumber',
    accessorKey: 'govtIdNumber',
    header: 'Govt ID',
    cell: ({ row }) => <div>{row.getValue('govtIdNumber')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="capitalize font-medium">{row.getValue('status')}</div>
      );
    },
    enableHiding: false,
  },
  {
    id: 'moreInfo',
    cell: ({ row }) => {
      return (
        <Link to={`/applications/${row.getValue('id')}/edit`}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
    enableHiding: false,
  },
];

export function ApplicationGrid({ data }: { data: ElectricityApplication[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      // id: false,
      // applicantName: false,
      gender: false,
      district: false,
      state: false,
      pincode: false,
      ownership: false,
      // govtIdType: false,
      // govtIdNumber: false,
      category: false,
      loadApplied: false,
      message: false,
      // dateSubmitted: false,
      dateApproved: false,
      lastModified: false,
      // status: false,
      reviewerId: false,
      reviewerName: false,
      reviewComments: false,
    });
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    table.getColumn('dateSubmitted')?.setFilterValue([
      {
        from: new Date(2021, 0),
        to: new Date(2022, 11),
      },
    ]);
  }, [table]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Search applications by ID"
          type="number"
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            table.getColumn('id')?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
        <DatePickerWithRange
          range={
            (
              table.getColumn('dateSubmitted')?.getFilterValue() as DateRange[]
            )?.[0]
          }
          setRange={(range) => {
            table.getColumn('dateSubmitted')?.setFilterValue([range]);
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: boolean) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-left">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()} | Total{' '}
          {table.getFilteredRowModel().rows.length} Records
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationGrid;
