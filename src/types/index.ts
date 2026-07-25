export type PageId = 
  | 'home'
  | 'browse'
  | 'coach-profile'
  | 'booking'
  | 'user-dashboard'
  | 'coach-dashboard'
  | 'admin-dashboard'
  | 'pricing'
  | 'about'
  | 'contact'
  | 'blog'
  | 'help'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'privacy'
  | 'terms'
  | 'detective-agency'
  | 'quiz'
  | 'couples-counseling';

export type UserRole = 'user' | 'coach' | 'admin';

export interface Coach {
  id: string;
  name: string;
  title: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  hourlyRate: number;
  languages: string[];
  categories: string[];
  bio: string;
  certifications: string[];
  skills: string[];
  isVerified: boolean;
  isAvailableToday: boolean;
  location: string;
  featured: boolean;
  stats: {
    clientsCoached: number;
    hoursLogged: number;
    successRate: number;
  };
  availableSlots: {
    date: string;
    slots: string[];
  }[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  coachId: string;
  verifiedBooking: boolean;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  iconName: string;
  coachesCount: number;
  gradient: string;
}

export interface BookingSession {
  id: string;
  coachId: string;
  coachName: string;
  coachAvatar: string;
  coachTitle: string;
  date: string;
  timeSlot: string;
  sessionType: 'video' | 'audio' | 'chat';
  durationMinutes: number;
  price: number;
  discount: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorAvatar: string;
  image: string;
  summary: string;
  content: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  coachName: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface DetectivePackage {
  id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}
