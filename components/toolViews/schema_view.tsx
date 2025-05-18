import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface ColumnView {
  name: string;
  type: string;
  description: string;
  isPrimaryKey?: boolean;
}

interface TableView {
  name: string;
  description: string;
  columns: ColumnView[];
}

interface Schema {
  tables: TableView[];
}

export default function SchemaView({ schema }: { schema: Schema }) {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {schema?.tables?.map((table: TableView, index: number) => (
        <div key={index} className='col-span-1'>
          <TableView table={table} />
        </div>
      ))}
    </div>
  );
}

const TableView = ({ table }: { table: TableView }) => {
  return (
    <Table className='border rounded-md shadow-xs mb-8'>
      <TableCaption>
        {table?.name} - {table?.description}
      </TableCaption>
      <TableHeader className='bg-gray-100 dark:bg-gray-800'>
        <TableRow>
          <TableHead>Column</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {table?.columns?.map((column: ColumnView, index: number) => (
          <TableRow key={index}>
            <TableCell>{column?.name}</TableCell>
            <TableCell>{column?.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
