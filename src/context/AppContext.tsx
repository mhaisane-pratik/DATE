import React, { createContext, useContext, useState } from 'react';
import { PageId, UserRole, Coach, ToastMessage, BookingSession } from '../types';
import { MOCK_COACHES, MOCK_USER_SESSIONS } from '../data/mockData';

interface BookingDraft {
  coach: Coach | null;
  selectedDate: string;
  selectedSlot: string;
  sessionType: 'video' | 'audio' | 'chat';
  durationMinutes: number;
  price: number;
  couponCode: string;
  discountAmount: number;
}

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  selectedCoachId: string;
  setSelectedCoachId: (id: string) => void;
  selectedCoach: Coach;
  bookingDraft: BookingDraft;
  updateBookingDraft: (update: Partial<BookingDraft>) => void;
  wishlist: string[];
  toggleWishlist: (coachId: string) => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  userSessions: BookingSession[];
  addUserSession: (session: BookingSession) => void;
  searchFilter: string;
  setSearchFilter: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [selectedCoachId, setSelectedCoachId] = useState<string>('coach-pratik');
  const [wishlist, setWishlist] = useState<string[]>(['coach-pratik', 'coach-elena']);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [userSessions, setUserSessions] = useState<BookingSession[]>(MOCK_USER_SESSIONS);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({
    coach: MOCK_COACHES[0],
    selectedDate: '2026-07-25',
    selectedSlot: '02:00 PM',
    sessionType: 'video',
    durationMinutes: 50,
    price: 140,
    couponCode: '',
    discountAmount: 0
  });

  const selectedCoach = MOCK_COACHES.find(c => c.id === selectedCoachId) || MOCK_COACHES[0];

  const updateBookingDraft = (update: Partial<BookingDraft>) => {
    setBookingDraft(prev => ({ ...prev, ...update }));
  };

  const toggleWishlist = (coachId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(coachId);
      const updated = exists ? prev.filter(id => id !== coachId) : [...prev, coachId];
      addToast({
        type: 'info',
        title: exists ? 'Removed from Wishlist' : 'Saved to Wishlist',
        message: exists ? 'Coach removed from your saved list.' : 'Coach saved to your wishlist!'
      });
      return updated;
    });
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addUserSession = (session: BookingSession) => {
    setUserSessions(prev => [session, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        userRole,
        setUserRole,
        selectedCoachId,
        setSelectedCoachId,
        selectedCoach,
        bookingDraft,
        updateBookingDraft,
        wishlist,
        toggleWishlist,
        toasts,
        addToast,
        removeToast,
        userSessions,
        addUserSession,
        searchFilter,
        setSearchFilter,
        categoryFilter,
        setCategoryFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
