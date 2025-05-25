import { Download } from 'lucide-react';
import React from 'react';

interface FileDownloadProps {
  url: string;
  format: string;
  name?: string;
}

export default function FileDownload({ url, format, name }: FileDownloadProps) {
  return (
    <div className='max-w-xs mx-auto p-2 my-4 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 shadow-sm text-sm'>
      <div className='flex items-center justify-between gap-2'>
        <p className='truncate text-gray-700 dark:text-gray-200'>{name}</p>
        <a
          href={url}
          download
          className='flex items-center gap-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition'
        >
          <Download size={14} />
          <span className='text-xs'>{format}</span>
        </a>
      </div>
    </div>
  );
}
