import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';
import { Toaster, toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const { user } = useAuth();
  
  const handleGetQuoteClick = () => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      const element = document.getElementById('contact');
      element?.scrollIntoView({ behavior: 'smooth' });
      toast.info('Contact us below to get your free quote!');
    }
  };

  return (
    <>
      <HeroSection onGetQuoteClick={handleGetQuoteClick} />
      <TrustBar />
      <ServicesSection />
      <PortfolioSection />
      <HowItWorksSection />
      <PricingSection onGetQuoteClick={handleGetQuoteClick} />
      <Footer />
    </>
  );
}

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] flex items-center justify-center">
        <div className="text-2xl text-[#2F3E46]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] flex items-center justify-center">
        <div className="text-2xl text-[#2F3E46]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" richColors />
      
      {!isAuthPage && (
        <Navigation
          isLoggedIn={!!user}
          currentUser={user ? { name: user.name, email: user.email, role: user.role } : undefined}
          onLoginClick={() => navigate('/login')}
          onSignUpClick={() => navigate('/signup')}
          onLogout={handleLogout}
          onDashboardClick={() => navigate('/dashboard')}
          currentView={location.pathname.substring(1) as any}
          onNavigate={(view) => navigate(`/${view}`)}
        />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage
                mode="login"
                onSuccess={() => navigate('/dashboard')}
                onSwitchMode={() => navigate('/signup')}
              />
            )
          }
        />
        
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage
                mode="signup"
                onSuccess={() => navigate('/dashboard')}
                onSwitchMode={() => navigate('/login')}
              />
            )
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard user={user!} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute adminOnly>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
