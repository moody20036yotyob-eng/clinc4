import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout, DashboardLayout, EditorLayout } from '@/components/layout/Layout';
import '@/i18n';
import '@/styles/globals.css';

// Pages - lazy loaded
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const LoginPage = React.lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('@/pages/auth/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('@/pages/auth/ResetPasswordPage'));
const VerifyEmailPage = React.lazy(() => import('@/pages/auth/VerifyEmailPage'));
const CVTemplatesPage = React.lazy(() => import('@/pages/CVTemplatesPage'));
const PortfolioTemplatesPage = React.lazy(() => import('@/pages/PortfolioTemplatesPage'));
const PricingPage = React.lazy(() => import('@/pages/PricingPage'));
const DigitalSolutionsPage = React.lazy(() => import('@/pages/DigitalSolutionsPage'));
const AboutPage = React.lazy(() => import('@/pages/AboutPage'));
const ContactPage = React.lazy(() => import('@/pages/ContactPage'));
const PrivacyPage = React.lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = React.lazy(() => import('@/pages/TermsPage'));
const RefundPage = React.lazy(() => import('@/pages/RefundPage'));

// Dashboard
const DashboardPage = React.lazy(() => import('@/pages/dashboard/DashboardPage'));
const MyCVsPage = React.lazy(() => import('@/pages/dashboard/MyCVsPage'));
const MyPortfoliosPage = React.lazy(() => import('@/pages/dashboard/MyPortfoliosPage'));
const OrdersPage = React.lazy(() => import('@/pages/dashboard/OrdersPage'));
const ProfilePage = React.lazy(() => import('@/pages/dashboard/ProfilePage'));

// Editors
const CVEditorPage = React.lazy(() => import('@/pages/editor/CVEditorPage'));
const PortfolioEditorPage = React.lazy(() => import('@/pages/editor/PortfolioEditorPage'));
const CVPrintPage = React.lazy(() => import('@/pages/editor/CVPrintPage'));

// Checkout
const CheckoutPage = React.lazy(() => import('@/pages/CheckoutPage'));
const PaymentCallbackPage = React.lazy(() => import('@/pages/PaymentCallbackPage'));

// Public portfolio
const PublicPortfolioPage = React.lazy(() => import('@/pages/PublicPortfolioPage'));

// Admin
const AdminDashboardPage = React.lazy(() => import('@/pages/admin/AdminDashboardPage'));

// Guards
import { RequireAuth, RequireAdmin } from '@/components/auth/Guards';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <React.Suspense fallback={<Spinner />}>
          <Routes>
            {/* Public */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/cv-templates" element={<CVTemplatesPage />} />
              <Route path="/portfolio-templates" element={<PortfolioTemplatesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/digital-solutions" element={<DigitalSolutionsPage />} />
              <Route path="/digital-solutions/:service" element={<DigitalSolutionsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/refund" element={<RefundPage />} />
            </Route>

            {/* Auth */}
            <Route element={<Layout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
            </Route>

            {/* Dashboard */}
            <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/cvs" element={<MyCVsPage />} />
              <Route path="/dashboard/portfolios" element={<MyPortfoliosPage />} />
              <Route path="/dashboard/orders" element={<OrdersPage />} />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
            </Route>

            {/* Editors */}
            <Route element={<RequireAuth><EditorLayout /></RequireAuth>}>
              <Route path="/editor/cv/:id" element={<CVEditorPage />} />
              <Route path="/editor/portfolio/:id" element={<PortfolioEditorPage />} />
            </Route>

            {/* CV print (headless PDF render - no layout chrome) */}
            <Route path="/cv/:id/print" element={<RequireAuth><CVPrintPage /></RequireAuth>} />

            {/* Checkout (auth required) */}
            <Route path="/checkout" element={<RequireAuth><CheckoutPage /></RequireAuth>} />
            <Route path="/checkout/callback" element={<RequireAuth><PaymentCallbackPage /></RequireAuth>} />

            {/* Admin */}
            <Route element={<RequireAdmin><DashboardLayout /></RequireAdmin>}>
              <Route path="/admin/*" element={<AdminDashboardPage />} />
            </Route>

            {/* Public portfolio */}
            <Route path="/p/:slug" element={<PublicPortfolioPage />} />

            {/* 404 */}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-5xl font-bold text-surface-900">404</h1>
                <p className="text-surface-500">Page not found</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            } />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
