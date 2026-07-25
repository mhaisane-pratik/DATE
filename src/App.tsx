import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { QuickPageSwitcher } from './components/common/QuickPageSwitcher';
import { ToastContainer } from './components/common/Toast';

// Pages
import { Home } from './pages/Home';
import { BrowseCoaches } from './pages/BrowseCoaches';
import { CoachProfile } from './pages/CoachProfile';
import { BookingPage } from './pages/BookingPage';
import { UserDashboard } from './pages/UserDashboard';
import { CoachDashboard } from './pages/CoachDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DetectiveAgencyPage } from './pages/DetectiveAgencyPage';
import { CouplesCounselingPage } from './pages/CouplesCounselingPage';
import { QuizPage } from './pages/QuizPage';

const MainRouter: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'browse':
        return <BrowseCoaches />;
      case 'detective-agency':
        return <DetectiveAgencyPage />;
      case 'couples-counseling':
        return <CouplesCounselingPage />;
      case 'quiz':
        return <QuizPage />;
      case 'coach-profile':
        return <CoachProfile />;
      case 'booking':
        return <BookingPage />;
      case 'user-dashboard':
        return <UserDashboard />;
      case 'coach-dashboard':
        return <CoachDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'pricing':
        return <PricingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'blog':
        return <BlogPage />;
      case 'help':
        return <HelpCenterPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'forgot-password':
        return <ForgotPasswordPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden w-full max-w-full">
      <QuickPageSwitcher />
      <Navbar />
      <div className="flex-1 pt-4 w-full max-w-full">
        {renderPage()}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <MainRouter />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
