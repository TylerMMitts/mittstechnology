import { useState } from 'react';
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
import { Toaster, toast } from 'sonner';

type View = 'home' | 'login' | 'signup' | 'dashboard';

interface User {
  name: string;
  email: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock login - accept any credentials for demo
    const userName = email.split('@')[0];
    setCurrentUser({
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: email,
    });
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    toast.success('Welcome back!');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentView('home');
    toast.success('Logged out successfully');
  };

  const handleGetQuoteClick = () => {
    if (isLoggedIn) {
      setCurrentView('dashboard');
    } else {
      const element = document.getElementById('contact');
      element?.scrollIntoView({ behavior: 'smooth' });
      toast.info('Contact us below to get your free quote!');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onSignUpClick={() => setCurrentView('signup')}
          />
        );

      case 'signup':
        return (
          <LoginPage
            onLogin={handleLogin}
            onSignUpClick={() => setCurrentView('login')}
          />
        );

      case 'dashboard':
        if (!isLoggedIn || !currentUser) {
          setCurrentView('login');
          return null;
        }
        return <Dashboard user={currentUser} />;

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
          isLoggedIn={isLoggedIn}
          currentUser={currentUser || undefined}
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
