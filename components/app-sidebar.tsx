import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar';
import React from 'react';
import DataSources from './datasources';

export function AppSidebar() {
  return (
    <Sidebar side='right' variant='floating'>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Datasources</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* <React.Suspense fallback={<>Loading...</>}> */}
            <DataSources />
            {/* </React.Suspense> */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
