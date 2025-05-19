'use client';
import React from 'react';

export default function CopyUrl({ url }: { url: string }) {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
  };

  return <span onClick={handleCopyUrl}>Copy URL</span>;
}
