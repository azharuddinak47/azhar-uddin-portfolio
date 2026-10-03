import { PortfolioData } from '@/types/portfolio';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: 'Md Azhar Uddin',
    role: 'UI/UX Designer',
    heroHeadline: 'UI/UX',
    heroHeadlineHollow: 'DESIGNER',
    subHeadline: 'Passionate Designer with a keen eye for visual aesthetics and user-centered solutions.',
    bio: 'Proficient in transforming complex concepts into intuitive, engaging designs using Figma. Dedicated to delivering high-quality creative work that enhances brand identity and elevates user experience across web and mobile platforms.',
    email: 'azharuddin.au543@gmail.com',
    phone: '+8801743484818',
    behanceUrl: 'https://www.behance.net/azharuddin-uiux',
    linkedinUrl: 'https://linkedin.com/in/azhar-uiux',
    statusBadge: 'AVAILABLE FOR NEW PROJECTS & CONTRACTS',
    isAvailable: true,
    avatarUrl: '/assets/avatar.jpg',
    resumeUrl: '#contact',
    location: 'Dhaka, Bangladesh (Available Worldwide Remote)',
    languages: ['English', 'Bangla'],
    hobbies: ['Travel', 'Sports', 'Reading'],
    expertiseBadges: [
      'USER RESEARCH & INTERACTION DESIGN',
      'FIGMA PROTOTYPING & DESIGN SYSTEMS'
    ],
    tickerItems: [
      'USER RESEARCH',
      'FIGMA PROTOTYPING',
      'DESIGN SYSTEMS',
      'MOBILE APP DESIGN',
      'WEB DESIGN',
      'WIRE-FRAMING & USER FLOWS',
      'DEVELOPER HANDOFF',
      'HTML & CSS',
      'USABILITY TESTING'
    ]
  },
  stats: [
    {
      id: 'stat-1',
      value: '+2',
      label: 'YEARS OF',
      sublabel: 'EXPERIENCE'
    },
    {
      id: 'stat-2',
      value: '+25',
      label: 'PROJECTS',
      sublabel: 'COMPLETED'
    },
    {
      id: 'stat-3',
      value: '+18',
      label: 'WORLDWIDE',
      sublabel: 'CLIENTS'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Restaurant POS & Management System',
      tagline: 'Comprehensive POS & Kitchen Ecosystem',
      category: 'Web Application & POS',
      image: '/assets/project_1.jpg',
      figmaLink: 'https://www.behance.net/azharuddin-uiux',
      link: 'https://www.behance.net/azharuddin-uiux',
      featured: true,
      year: '2026',
      description: 'Designed an end-to-end restaurant POS ecosystem covering cashier workflows, customer table ordering, Kitchen Display System (KDS), merchant analytics, and multi-branch admin management interfaces.',
      tags: ['Figma', 'Design System', 'POS Ecosystem', 'UX Research', 'Dashboard']
    },
    {
      id: 'proj-2',
      title: 'CarWash App',
      tagline: 'On-Demand Mobile Vehicle Care',
      category: 'Mobile App Design',
      image: '/assets/project_2.png',
      figmaLink: 'https://www.behance.net/azharuddin-uiux',
      link: 'https://www.behance.net/azharuddin-uiux',
      featured: true,
      year: '2025',
      description: 'Designed a modern mobile car wash booking application for convenient at-home vehicle cleaning services. Features dynamic service package selection, scheduling calendar, live detailer GPS tracking, seamless payment gateway, and customer rating reviews.',
      tags: ['Mobile UI/UX', 'Figma', 'Prototyping', 'iOS & Android', 'Booking Flow']
    },
    {
      id: 'proj-3',
      title: 'Dating App (Crave App)',
      tagline: 'Modern Dating & Social Connection Platform',
      category: 'Mobile UI/UX',
      image: '/assets/project_3.png',
      figmaLink: 'https://www.behance.net/azharuddin-uiux',
      link: 'https://www.behance.net/azharuddin-uiux',
      featured: true,
      year: '2025',
      description: 'Designed a modern dating and social connection platform with card-swiping profile discovery, smart matching algorithms, instant interactive messaging, and curated event/date planning.',
      tags: ['Social App', 'Figma', 'Micro-Interactions', 'UI Design']
    },
    {
      id: 'proj-4',
      title: 'Enterprise Design System',
      tagline: 'Scalable Design Token Architecture',
      category: 'Design Systems',
      image: '/assets/extra_2.jpg',
      figmaLink: 'https://www.behance.net/azharuddin-uiux',
      link: 'https://www.behance.net/azharuddin-uiux',
      featured: false,
      year: '2026',
      description: 'Crafted an enterprise-level component library featuring design tokens, dark/light accessibility modes, WCAG AA compliance, and modular responsive UI components in Figma.',
      tags: ['Design System', 'Tokens', 'Figma v5', 'Accessibility']
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      company: 'Kodevio Limited',
      role: 'Lead UI/UX Designer',
      period: 'March 2026 - Present',
      description: 'Leading UI/UX design initiatives for web and mobile applications, translating client requirements into clear, intuitive, and user-friendly digital experiences.',
      highlights: [
        'Lead UI/UX design for web and mobile applications, translating client requirements into clear and user-friendly experiences.',
        'Create user flows, wireframes, high-fidelity interfaces, interactive prototypes, and design systems using Figma.',
        'Collaborate closely with clients, developers, and project teams to refine designs, solve UX challenges, and ensure smooth development handoff.'
      ]
    },
    {
      id: 'exp-2',
      company: 'Sparktech Agency',
      role: 'UI/UX Designer',
      period: 'May 2025 - March 2026',
      description: 'Designed user-friendly web and mobile interfaces based on client requirements, design thinking principles, and business conversion goals.',
      highlights: [
        'Designed user-friendly web and mobile interfaces based on client requirements and business goals.',
        'Created user flows, wireframes, high-fidelity UI designs, and interactive prototypes using Figma.',
        'Collaborated with developers and clients to refine designs, incorporate feedback, and ensure smooth design-to-development handoff.'
      ]
    }
  ],
  tools: [
    {
      id: 'tool-1',
      name: 'Figma',
      category: 'Design & Prototyping',
      icon: '/assets/icon_1.png',
      description: 'Design systems, auto-layout, component variants, wireframes, and interactive clickable prototypes.',
      level: 'Expert'
    },
    {
      id: 'tool-2',
      name: 'User Research',
      category: 'UX Methodology',
      icon: '/assets/icon_0.png',
      description: 'User interviews, competitive analysis, journey mapping, empathy maps, and usability testing.',
      level: 'Advanced'
    },
    {
      id: 'tool-3',
      name: 'Design Systems',
      category: 'Architecture',
      icon: '/assets/icon_4.png',
      description: 'Design tokens, scalable typography scales, UI libraries, color variables, and developer handoff specs.',
      level: 'Expert'
    },
    {
      id: 'tool-4',
      name: 'HTML & CSS',
      category: 'Frontend Code',
      icon: '/assets/icon_5.png',
      description: 'Semantic markup, modern layout structures, CSS flexbox/grid, and developer feasibility validation.',
      level: 'Proficient'
    },
    {
      id: 'tool-5',
      name: 'Mobile App Design',
      category: 'iOS & Android',
      icon: '/assets/icon_3.png',
      description: 'Human Interface Guidelines (HIG), Material Design 3 guidelines, gestures, and responsive flows.',
      level: 'Expert'
    },
    {
      id: 'tool-6',
      name: 'Prototyping',
      category: 'Micro-Animations',
      icon: '/assets/icon_2.png',
      description: 'High-fidelity smart animation, interactive state switches, user test flows, and transitions.',
      level: 'Master'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Google UX Design Professional Certificate',
      issuer: 'Coursera (Google)',
      date: 'Completed: May, 2025',
      link: 'https://coursera.org'
    }
  ],
  academics: [
    {
      id: 'acad-1',
      degree: 'BBA in Management',
      institution: 'Government Titumir College',
      period: '2021 - Present'
    },
    {
      id: 'acad-2',
      degree: 'Higher Secondary Certificate (H.S.C)',
      institution: 'Kalatia Degree College',
      period: '2020'
    }
  ],
  thoughts: [
    {
      id: 'th-1',
      title: 'Designing Accessible and Intuitive POS Interfaces',
      date: 'Aug 14, 2025',
      readTime: '5min read',
      excerpt: 'How thoughtful layout hierarchy and quick-action touchscreen affordances reduce waiter error rates in high-paced restaurant environments.',
      slug: 'designing-accessible-pos-interfaces',
      tags: ['UX Case Study', 'POS Design', 'Accessibility'],
      content: [
        'When designing a Point of Sale (POS) ecosystem, every fraction of a second matters. Waitstaff and cashiers are often operating under intense kitchen noise, customer queues, and peak-hour rush.',
        'A successful POS design focuses on three fundamental pillars: prominent visual hierarchy, minimal tap depth for top menu items, and instant visual/auditory feedback for transactional confirmations.',
        'By performing direct user observation during shift peaks, we identified that categorizing items by high-volume frequency rather than alphabetical sorting reduced ticket creation time by 32%.'
      ]
    },
    {
      id: 'th-2',
      title: 'The Role of Micro-Interactions in Mobile App Retention',
      date: 'Jun 22, 2025',
      readTime: '6min read',
      excerpt: 'Why subtle haptics, spring animations, and state transitions make digital products feel alive and memorable.',
      slug: 'micro-interactions-mobile-retention',
      tags: ['Mobile UI', 'Figma', 'Micro-Interactions'],
      content: [
        'Micro-interactions are the silent ambassadors of your brand. They bridge the gap between human intuition and digital mechanics.',
        'In the CarWash booking app, adding a live animated radar pulse during detailer dispatch gave users immediate reassurance that their request was active, significantly dropping cancellation rates during the first 60 seconds.',
        'Good motion design should always communicate purpose, acknowledge action, and guide attention without ever causing UI lag.'
      ]
    },
    {
      id: 'th-3',
      title: 'Building Scalable Figma Design Systems for Fast-Growing Teams',
      date: 'Apr 10, 2025',
      readTime: '7min read',
      excerpt: 'Practical strategies for naming design tokens, structuring autolayout components, and bridging the gap between designers and developers.',
      slug: 'scalable-figma-design-systems',
      tags: ['Design Systems', 'Figma', 'Developer Handoff'],
      content: [
        'A design system is not just a UI kit; it is a shared language between design and engineering. Without strict naming conventions and tokenized variables, design debt accumulates rapidly.',
        'By aligning Figma variables directly with CSS custom properties, our developer handoff meetings became 50% shorter and production consistency reached near 100% fidelity on the first iteration.'
      ]
    }
  ],
  contact: {
    headline: "LET'S WORK TOGETHER",
    description: "Have a design project in mind or looking for a dedicated Lead UI/UX Designer to elevate your product? Feel free to reach out directly.",
    email: 'azharuddin.au543@gmail.com',
    phone: '+8801743484818',
    location: 'Dhaka, Bangladesh (Remote Worldwide)',
    budgetOptions: [
      '< $1,000',
      '$1,000 - $3,000',
      '$3,000 - $5,000',
      '$5,000+'
    ]
  },
  socials: [
    { platform: 'Behance', url: 'https://www.behance.net/azharuddin-uiux', icon: 'behance' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/azhar-uiux', icon: 'linkedin' },
    { platform: 'Email', url: 'mailto:azharuddin.au543@gmail.com', icon: 'email' },
    { platform: 'Phone', url: 'tel:+8801743484818', icon: 'phone' }
  ]
};
