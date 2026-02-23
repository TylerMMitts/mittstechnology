import { useState, useEffect } from 'react';
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

type View = 'home' | 'login' | 'signup' | 'dashboard' | 'admin';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const { user, supabaseUser, loading, signOut } = useAuth();

  // Redirect to dashboard if logged in and trying to access login/signup
  useEffect(() => {
    if (user && (currentView === 'login' || currentView === 'signup')) {
      setCurrentView('dashboard');
    }
  }, [user, currentView]);

  const handleLogout = async () => {
    await signOut();
    setCurrentView('home');
  };

  const handleGetQuoteClick = () => {
    if (user) {
      setCurrentView('dashboard');
    } else {
      const element = document.getElementById('contact');
      element?.scrollIntoView({ behavior: 'smooth' });
      toast.info('Contact us below to get your free quote!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] flex items-center justify-center">
        <div className="text-2xl text-[#2F3E46]">Loading...</div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginPage
            mode="login"
            onSuccess={() => setCurrentView('dashboard')}
            onSwitchMode={() => setCurrentView('signup')}
          />
        );

      case 'signup':
        return (
          <LoginPage
            mode="signup"
            onSuccess={() => setCurrentView('dashboard')}
            onSwitchMode={() => setCurrentView('login')}
          />
        );

      case 'dashboard':
        // Require both authentication AND user profile to be loaded
        if (!user) {
          if (!loading && supabaseUser) {
            // Auth succeeded but profile fetch failed - stay on login silently
            setCurrentView('login');
            return null;
          }
          if (!loading && !supabaseUser) {
            // No auth at all
            setCurrentView('login');
            return null;
          }
          // Still loading
          return (
            <div className="min-h-screen bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] flex items-center justify-center">
              <div className="text-2xl text-[#2F3E46]">Loading your dashboard...</div>
            </div>
          );
        }
        return <Dashboard user={user} />;

      case 'admin':
        if (!user) {
          if (!loading && supabaseUser) {
            // Auth succeeded but profile fetch failed
            setCurrentView('home');
            return null;
          }
          if (!loading && !supabaseUser) {
            // No auth
            setCurrentView('home');
            return null;
          }
          // Still loading
          return (
            <div className="min-h-screen bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] flex items-center justify-center">
              <div className="text-2xl text-[#2F3E46]">Loading...</div>
            </div>
          );
        }
        if (user.role !== 'admin') {
          setCurrentView('home');
          return null;
        }
        return <AdminPanel />;

      case 'home':
      default:
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
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" richColors />
      
      {currentView !== 'login' && currentView !== 'signup' && (
        <Navigation
          isLoggedIn={!!user}
          currentUser={user ? { name: user.name, email: user.email, role: user.role } : undefined}
          onLoginClick={() => setCurrentView('login')}
          onSignUpClick={() => setCurrentView('signup')}
          onLogout={handleLogout}
          onDashboardClick={() => setCurrentView('dashboard')}
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view as View)}
        />
      )}

      {renderView()}
    </div>
  );
}
