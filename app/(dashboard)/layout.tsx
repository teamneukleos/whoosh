import type { ReactNode } from 'react';
import Navbar from '../components/navbar';
import SidebarMenu from '../components/sidebarmenu';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <SidebarMenu />
      {children}
    </>
  );
}