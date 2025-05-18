import React from 'react';

interface FileDownloadProps {
  url: string;
  format: string;
  name?: string;
}

export default function FileDownload({ url, format, name }: FileDownloadProps) {
  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <h2 className='text-lg font-bold mb-2'>File Download</h2>
      <p>{name}</p>
      <a
        href={url}
        download
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Download {format} File
      </a>
    </div>
  );
}
