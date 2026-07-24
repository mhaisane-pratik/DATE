import { Coach, Category, Review, BlogArticle, Testimonial, BookingSession } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'dating-mindset',
    title: 'Dating & Confidence',
    description: 'Overcome anxiety, build magnetic charisma, and approach dating with authentic self-assurance.',
    iconName: 'HeartHandshake',
    coachesCount: 42,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'communication',
    title: 'Communication & Intimacy',
    description: 'Master conflict resolution, non-violent communication, and deep emotional vulnerability.',
    iconName: 'MessageSquareHeart',
    coachesCount: 58,
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'marriage-longterm',
    title: 'Marriage & Long-Term',
    description: 'Reignite passion, rebuild trust after turmoil, and create long-lasting partnership harmony.',
    iconName: 'Sparkles',
    coachesCount: 36,
    gradient: 'from-violet-500 to-fuchsia-500'
  },
  {
    id: 'breakup-healing',
    title: 'Breakup & Divorce Recovery',
    description: 'Heal from heartache, regain your identity, and prepare emotionally for healthy new beginnings.',
    iconName: 'ShieldCheck',
    coachesCount: 29,
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'attachment-styles',
    title: 'Attachment Style Coaching',
    description: 'Understand Anxious/Avoidant triggers and shift towards secure, resilient relational attachment.',
    iconName: 'Compass',
    coachesCount: 31,
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'online-dating-profiles',
    title: 'Profile & Social Optimization',
    description: 'Craft high-converting dating profiles, messaging strategy, and first-date dynamics.',
    iconName: 'UserCheck',
    coachesCount: 24,
    gradient: 'from-amber-500 to-orange-500'
  }
];

export const MOCK_COACHES: Coach[] = [
  {
    id: 'coach-prateek',
    name: 'Prateek Mhaisane',
    title: 'Founder & Lead Dating & Relationship Strategist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    rating: 4.99,
    reviewsCount: 348,
    experienceYears: 10,
    hourlyRate: 150,
    languages: ['English', 'Hindi'],
    categories: ['dating-mindset', 'online-dating-profiles', 'communication', 'attachment-styles'],
    bio: 'Hi, I am Prateek Mhaisane—founder of DateMentor and your lead dating strategist. For over a decade, I have helped high-achieving singles and couples conquer dating anxiety, build genuine confidence, master conversation flow, and find deep lifelong love.',
    certifications: [
      'Founder & Master Coach at DateMentor Platform',
      'Certified Gottman Method Relationship Educator',
      'ICF Professional Certified Coach (PCC)',
      'Certified Neuro-Linguistic Programming (NLP) Practitioner'
    ],
    skills: [
      'Dating Profile Audits',
      'Social Confidence & Charisma',
      'Anxious-Avoidant Healing',
      'First Date Conversational Mastery',
      'Premarital & Couples Alignment'
    ],
    isVerified: true,
    isAvailableToday: true,
    location: 'India / Online Worldwide (+91 9737372183)',
    featured: true,
    stats: {
      clientsCoached: 1250,
      hoursLogged: 4800,
      successRate: 99
    },
    availableSlots: [
      { date: '2026-07-25', slots: ['09:00 AM', '11:30 AM', '02:00 PM', '05:00 PM'] },
      { date: '2026-07-26', slots: ['10:00 AM', '01:00 PM', '04:00 PM'] },
      { date: '2026-07-27', slots: ['09:30 AM', '03:00 PM', '06:00 PM'] }
    ]
  },
  {
    id: 'coach-elena',
    name: 'Dr. Elena Vance',
    title: 'Senior Associate Clinical Psychologist & Gottman Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    rating: 4.97,
    reviewsCount: 142,
    experienceYears: 12,
    hourlyRate: 140,
    languages: ['English', 'Spanish'],
    categories: ['attachment-styles', 'communication', 'marriage-longterm'],
    bio: 'Handpicked by Prateek Mhaisane for DateMentor, Dr. Vance brings clinical psychology expertise to help couples and singles understand hidden attachment wounds.',
    certifications: ['Ph.D. in Clinical Psychology (Columbia)', 'Certified Gottman Practitioner'],
    skills: ['Attachment Repair', 'Conflict Resolution', 'Emotional Safety'],
    isVerified: true,
    isAvailableToday: true,
    location: 'New York, USA',
    featured: true,
    stats: {
      clientsCoached: 540,
      hoursLogged: 2100,
      successRate: 97
    },
    availableSlots: [
      { date: '2026-07-25', slots: ['10:00 AM', '01:00 PM', '04:30 PM'] },
      { date: '2026-07-26', slots: ['11:00 AM', '03:30 PM'] }
    ]
  },
  {
    id: 'coach-marcus',
    name: 'Marcus Sterling',
    title: 'Associate Confidence & Profile Optimization Strategist',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    rating: 4.94,
    reviewsCount: 98,
    experienceYears: 8,
    hourlyRate: 110,
    languages: ['English'],
    categories: ['dating-mindset', 'online-dating-profiles'],
    bio: 'Working alongside Prateek Mhaisane, Marcus helps clients build authentic confidence and optimize dating profiles.',
    certifications: ['Certified NLP Coach', 'Behavioral Science B.S.'],
    skills: ['Dating Profile Photography', 'Approach Confidence', 'Texting Strategy'],
    isVerified: true,
    isAvailableToday: false,
    location: 'Los Angeles, USA',
    featured: true,
    stats: {
      clientsCoached: 380,
      hoursLogged: 1450,
      successRate: 95
    },
    availableSlots: [
      { date: '2026-07-26', slots: ['01:00 PM', '04:00 PM'] }
    ]
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Samantha K.',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'Yesterday',
    comment: 'Prateek Mhaisane completely revolutionized my dating approach. In 4 sessions, he helped me identify my anxious triggers and overhaul my profile. I just started seeing an incredible partner who respects all my boundaries!',
    coachId: 'coach-prateek',
    verifiedBooking: true
  },
  {
    id: 'rev-2',
    userName: 'Michael R.',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: '3 days ago',
    comment: 'Coach Prateek Mhaisane gave me actionable communication tools for first dates. No fake tactics—just pure confidence and genuine connection.',
    coachId: 'coach-prateek',
    verifiedBooking: true
  },
  {
    id: 'rev-3',
    userName: 'David & Claire P.',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: '1 week ago',
    comment: 'Prateek Mhaisane and his team saved our marriage. The 1-on-1 Gottman framework gave us our spark back!',
    coachId: 'coach-prateek',
    verifiedBooking: true
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Jessica & Thomas',
    role: 'Engaged after 6 months of coaching with Prateek',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=300&auto=format&fit=crop',
    quote: 'Prateek Mhaisane\'s DateMentor platform is unmatched. He identified our recurring communication traps within our very first session and gave us a step-by-step roadmap to engagement.',
    rating: 5,
    coachName: 'Prateek Mhaisane (Lead Coach)'
  },
  {
    id: 't-2',
    name: 'Alexandre M.',
    role: 'Tech Executive & Single Parent',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop',
    quote: 'I was hesitant about dating after my divorce. Prateek Mhaisane provided non-judgmental, practical guidance that restored my confidence completely.',
    rating: 5,
    coachName: 'Prateek Mhaisane (Lead Coach)'
  },
  {
    id: 't-3',
    name: 'Rachel B.',
    role: 'Design Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    quote: 'Prateek\'s profile audit alone quadrupled my quality match rate. DateMentor is the best investment I ever made for my love life.',
    rating: 5,
    coachName: 'Prateek Mhaisane (Lead Coach)'
  }
];

export const MOCK_BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-1',
    title: 'The Modern Dating Playbook: How Prateek Mhaisane Helps High Performers Find Genuine Love',
    slug: 'modern-dating-playbook-prateek-mhaisane',
    category: 'Dating Strategy',
    readTime: '5 min read',
    date: 'July 24, 2026',
    author: 'Prateek Mhaisane',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop',
    summary: 'Discover Founder Prateek Mhaisane\'s signature 4-pillar methodology for overcoming approach anxiety, optimizing profiles, and setting healthy boundaries.',
    featured: true,
    content: `Modern dating can feel like an overwhelming numbers game. At DateMentor, I built a framework designed for ambitious individuals who value authenticity over games.

### 1. The Confidence Reset
True magnetic attraction stems from inner self-worth, not scripted lines. In our 1-on-1 calls, we break through imposter syndrome and rejection fears.

### 2. High-Converting Profile Crafting
Your photos and prompts must tell an intriguing story. We eliminate generic bio cliches and showcase your true personality.

### 3. Deep Emotional Intimacy
Moving from a great first date to a meaningful relationship requires emotional safety, active listening, and clear attachment alignment.`
  },
  {
    id: 'art-2',
    title: 'The Anxious-Avoidant Trap: How to Break Free and Build Secure Intimacy',
    slug: 'anxious-avoidant-trap',
    category: 'Attachment Styles',
    readTime: '6 min read',
    date: 'July 20, 2026',
    author: 'Prateek Mhaisane',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    summary: 'Understand why anxious and avoidant personalities magnetically attract each other, and learn Prateek Mhaisane\'s science-backed communication rituals.',
    featured: false,
    content: `Attachment styles govern how we perceive vulnerability and independence. When an anxious attachment style pairs with an avoidant attachment style, a predictable push-pull cycle emerges. I guide clients to recognize these triggers and move toward secure attachment.`
  }
];

export const MOCK_USER_SESSIONS: BookingSession[] = [
  {
    id: 'sess-101',
    coachId: 'coach-prateek',
    coachName: 'Prateek Mhaisane',
    coachAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    coachTitle: 'Founder & Lead Dating Coach',
    date: 'Tomorrow, 02:00 PM',
    timeSlot: '02:00 PM - 02:50 PM',
    sessionType: 'video',
    durationMinutes: 50,
    price: 150,
    discount: 30,
    totalPrice: 120,
    status: 'upcoming',
    meetingLink: 'https://meet.datementor.com/room-prateek-101',
    notes: '1-on-1 Strategy Session with Prateek Mhaisane: Profile & Dating Mindset'
  }
];

export const MOCK_FAQ = [
  {
    question: 'Can I book 1-on-1 coaching sessions directly with Prateek Mhaisane?',
    answer: 'Yes! Prateek Mhaisane personally takes 1-on-1 coaching clients, couples, and profile audit sessions. You can reserve time directly on his calendar or reach out via phone (+91 9737372183).'
  },
  {
    question: 'How does Prateek Mhaisane\'s DateMentor platform work?',
    answer: 'DateMentor is Prateek Mhaisane\'s official relationship coaching platform. In addition to 1-on-1 sessions with Prateek, you also get access to his hand-selected team of associate Gottman coaches.'
  },
  {
    question: 'What happens during a coaching call with Prateek Mhaisane?',
    answer: 'Every session with Prateek Mhaisane takes place in our encrypted HD video room. Prateek reviews your relationship background, assesses your goals, and delivers a customized action plan with practical exercise scripts.'
  },
  {
    question: 'What if I need to reschedule my call with Prateek?',
    answer: 'You can reschedule or cancel any session up to 24 hours prior directly from your User Dashboard with a 100% refund guarantee.'
  }
];
