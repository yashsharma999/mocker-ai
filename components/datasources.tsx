'use client';

import { baseUrl, fetcher } from '@/lib/constants';
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import CopyUrl from './copy-url';
import useSWR from 'swr';

interface DataSource {
  id: string;
  name: string;
  type: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export default function DataSources() {
  const { data, error } = useSWR(
    `${baseUrl}/api/datasource?userId=cmatx329u0000pf9aiglm228m`,
    fetcher
  );

  if (error) {
    return <div>Error loading data sources</div>;
  }

  return (
    <SidebarMenu>
      {data?.map((datasource: DataSource) => (
        <SidebarMenuItem key={datasource.id}>
          <SidebarMenuButton asChild>
            <div>{datasource.name}</div>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction>
                <MoreHorizontal />
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='left' align='start'>
              <DropdownMenuItem>
                <CopyUrl url={datasource.url} />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Download File</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
