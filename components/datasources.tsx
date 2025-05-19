import { baseUrl } from '@/lib/constants';
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

interface DataSource {
  id: string;
  name: string;
  type: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

const getDatasouces = async () => {
  try {
    const resp = await fetch(
      `${baseUrl}/api/datasource?userId=cmatx329u0000pf9aiglm228m`,
      {
        next: { tags: ['datasources'] },
      }
    );
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log('err', err);
  }
};

export default async function DataSources() {
  const data = await getDatasouces();

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
