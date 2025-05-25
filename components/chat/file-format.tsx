import { Database, File, Table } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export type PreferedFileFormat = 'csv' | 'xlsx' | 'sql' | '';

export default function FileFormat({
  handleFileFormatChange,
}: {
  handleFileFormatChange: (format: PreferedFileFormat) => void;
}) {
  const [selectedFormat, setSelectedFormat] = useState<PreferedFileFormat>('');

  const handleClick = (format: PreferedFileFormat) => {
    setSelectedFormat(format);
    handleFileFormatChange(format);
  };

  return (
    <div className='flex items-center gap-2'>
      <Button
        className={`cursor-pointer text-xs border transition-colors duration-200
            ${
              selectedFormat === 'csv'
                ? 'bg-secondary text-accent-foreground border-accent'
                : 'bg-transparent text-muted-foreground border border-muted hover:bg-muted/40'
            }`}
        size={'sm'}
        variant={'outline'}
        onClick={(ev) => {
          ev.stopPropagation();
          handleClick('csv');
        }}
      >
        <span>
          <Table size={'small'} />
        </span>
        .csv
      </Button>
      <Button
        className={`cursor-pointer text-xs border transition-colors duration-200
            ${
              selectedFormat === 'xlsx'
                ? 'bg-secondary text-accent-foreground border-accent'
                : 'bg-transparent text-muted-foreground border border-muted hover:bg-muted/40'
            }`}
        size={'sm'}
        variant={'outline'}
        onClick={(ev) => {
          ev.stopPropagation();
          handleClick('xlsx');
        }}
      >
        <span>
          <File />
        </span>
        .xlsx
      </Button>
      <Button
        className={`cursor-pointer text-xs border transition-colors duration-200
            ${
              selectedFormat === 'sql'
                ? 'bg-secondary text-accent-foreground border-accent'
                : 'bg-transparent text-muted-foreground border border-muted hover:bg-muted/40'
            }`}
        size={'sm'}
        variant={'outline'}
        onClick={(ev) => {
          ev.stopPropagation();
          ev.preventDefault();
          toast.info(
            'SQL format is available in the Pro version. Please upgrade to use this feature.'
          );
        }}
      >
        <span>
          <Database />
        </span>
        .sql
      </Button>
    </div>
  );
}
