import React from 'react';

interface FileDownloadProps {
  url: string;
  format: string;
  name?: string;
}

export default function FileDownload({ url, format, name }: FileDownloadProps) {
  return (
    <div className='max-w-sm mx-auto p-6 my-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1'>
          File Download
        </h2>
        <p className='text-gray-600 dark:text-gray-300 mb-4'>{name}</p>
        <a
          href={url}
          download
          className='px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition'
        >
          Download {format} File
        </a>
      </div>
    </div>
  );
}
