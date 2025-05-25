import { PreferedFileFormat } from '@/components/chat/file-format';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fileFormatString = (format: PreferedFileFormat) => {
  switch (format) {
    case 'csv':
      return 'CSV';
    case 'xlsx':
      return 'Excel';
    case 'sql':
      return 'SQL';
    default:
      return '';
  }
};
