import Navbar from '../components/navbar';
import SidebarMenu from '../components/sidebarmenu';
import Footer from '../components/footer';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
        <SidebarMenu />
      {children}
      <Footer />
    </>
  );
}