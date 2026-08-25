import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ToastProvider } from '@/components/ui/Toast';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastProvider />
    </div>
  );
}

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <ToastProvider />
    </div>
  );
}

export function EditorLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Outlet />
      <ToastProvider />
    </div>
  );
}
