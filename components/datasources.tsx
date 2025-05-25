'use client';

import { fetcher } from '@/lib/constants';
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
import { Skeleton } from './ui/skeleton';
import { useAuth } from '@clerk/nextjs';
import useByok from '@/lib/hooks/useByok';

interface DataSource {
  id: string;
  name: string;
  type: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export default function DataSources() {
  const { userId } = useAuth();
  const { byokUserId } = useByok();

  const { data, error, isLoading } = useSWR(
    byokUserId || userId
      ? `/api/datasource?clerkId=${byokUserId || userId}`
      : null,
    fetcher
  );

  if (error) {
    return <div>Error loading data sources</div>;
  }

  if (isLoading) {
    return (
      <SidebarMenu className='gap-4'>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild>
              <Skeleton className='h-5' />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
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
