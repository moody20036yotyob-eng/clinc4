import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { setLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 group">
    <div className="relative">
      <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand-sm group-hover:shadow-brand transition-shadow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    <span className="font-display text-xl font-bold text-surface-900 tracking-tight">
      Eco<span className="text-brand-600">Trove</span>
    </span>
  </Link>
);

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const toggleLanguage = () => setLanguage(i18n.language === 'ar' ? 'en' : 'ar');

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'admin';

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/cv-templates', label: t('nav.cvBuilder') },
    { to: '/portfolio-templates', label: t('nav.portfolio') },
    { to: '/pricing', label: t('nav.pricing') },
    { to: '/digital-solutions', label: t('nav.digitalSolutions') },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-surface-200 shadow-subtle' : 'bg-transparent',
      )}
    >
      <div className="container-tight">
        <nav className="flex h-16 items-center justify-between gap-4">
          <Logo />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === to
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100',
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-100 transition-colors"
            >
              <Globe className="h-4 w-4" />
              {i18n.language === 'ar' ? 'English' : 'العربية'}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-100 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-sm font-semibold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-surface-700">{user?.name}</span>
                  <ChevronDown className={cn('h-4 w-4 text-surface-400 transition-transform', userMenuOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="absolute end-0 top-full mt-1 w-52 rounded-xl bg-white border border-surface-200 shadow-elevated p-1 z-50"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-surface-700 hover:bg-surface-100 rounded-lg transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4 text-surface-400" />
                        {t('nav.dashboard')}
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-surface-700 hover:bg-surface-100 rounded-lg transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 text-surface-400" />
                          {t('nav.admin')}
                        </Link>
                      )}
                      <div className="h-px bg-surface-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        {t('nav.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">{t('nav.login')}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/cv-templates">{t('nav.createCV')}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden bg-white border-b border-surface-200 shadow-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container-tight py-4 space-y-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'flex px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    location.pathname === to ? 'text-brand-600 bg-brand-50' : 'text-surface-700 hover:bg-surface-100',
                  )}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-surface-100 mt-3">
                <button onClick={toggleLanguage} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-surface-600 hover:bg-surface-100">
                  <Globe className="h-4 w-4" />
                  {i18n.language === 'ar' ? 'English' : 'العربية'}
                </button>
                {isAuthenticated ? (
                  <>
                    <Button variant="secondary" size="sm" asChild>
                      <Link to="/dashboard">{t('nav.dashboard')}</Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLogout}>{t('nav.logout')}</Button>
                  </>
                ) : (
                  <>
                    <Button variant="secondary" asChild><Link to="/login">{t('nav.login')}</Link></Button>
                    <Button asChild><Link to="/cv-templates">{t('nav.createCV')}</Link></Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
