import { Course, BlogArticle, Subject } from './types';

export const SUBJECTS: Subject[] = [
  {
    id: 'robotics',
    name: 'Robotics & Coding',
    iconName: 'Cpu',
    count: 18,
    description: 'Learn to build autonomous machines, understand kinematics, and master logical blocks.',
  },
  {
    id: 'electronics',
    name: 'Basic Electronics',
    iconName: 'Zap',
    count: 12,
    description: 'Master fundamentals of circuits, resistors, capacitors, and microcontrollers.',
  },
  {
    id: 'iot',
    name: 'Internet of Things (IoT)',
    iconName: 'Wifi',
    count: 15,
    description: 'Connect sensors, capture telemetry, and build intelligent smart-home models.',
  },
  {
    id: 'arvr',
    name: 'AR & VR Lab',
    iconName: 'Glasses',
    count: 10,
    description: 'Design immersive virtual worlds, augmented overlay systems, and spatial interfaces.',
  },
  {
    id: 'webapp',
    name: 'Web App Development',
    iconName: 'Code',
    count: 22,
    description: 'Build fast full-stack applications with modern frameworks and robust servers.',
  },
  {
    id: 'cs',
    name: 'Computer Science',
    iconName: 'Laptop',
    count: 24,
    description: 'Learn Software Engineering, Web Development, Databases, and AI Engineering.',
  },
  {
    id: 'design',
    name: 'Creative Design',
    iconName: 'Palette',
    count: 18,
    description: 'Master Graphic Design, UI/UX, Vector Illustration, Typography, and Motion.',
  },
];

export const COURSES: Course[] = [
  {
    id: 'robotics-coding-mastery',
    title: 'Autonomous Robotics & Fundamentals of Coding',
    subject: 'Robotics & Coding',
    duration: '48 hours',
    level: 'Beginner',
    rating: 4.9,
    students: '15,400+',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400',
    description: 'Build real-world autonomous robots, program logical sensor feedback loops, and master scratch-to-block programming.',
    instructor: {
      name: 'Dr. Evelyn Foster',
      role: 'Principal Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    }
  },
  {
    id: 'electronics-foundations',
    title: 'Basic Electronics, Circuits & Microcontrollers',
    subject: 'Basic Electronics',
    duration: '32 hours',
    level: 'Beginner',
    rating: 4.8,
    students: '8,250+',
    image: 'https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&q=80&w=400',
    description: 'Dive deep into breadboard circuit prototyping, electrical components, voltage laws, and basic controller setups.',
    instructor: {
      name: 'Marcus Bell',
      role: 'Lead Visual Designer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    }
  },
  {
    id: 'iot-smart-systems',
    title: 'Internet of Things (IoT): Smart Home Sensors & Telemetry',
    subject: 'Internet of Things (IoT)',
    duration: '36 hours',
    level: 'Intermediate',
    rating: 4.9,
    students: '11,500+',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=400',
    description: 'Learn to wire ESP32/NodeMCU controllers, transmit real-time telemetry datasets over MQTT, and integrate dashboard triggers.',
    instructor: {
      name: 'Alexander Sterling',
      role: 'Serial Tech Entrepreneur',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    }
  },
  {
    id: 'ar-vr-spatial',
    title: 'AR & VR Lab: Spatial Audio & Interactive 3D Environments',
    subject: 'AR & VR Lab',
    duration: '40 hours',
    level: 'Advanced',
    rating: 5.0,
    students: '9,400+',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=400',
    description: 'Assemble immersive spatial virtual reality coordinates, program gesture cues, and create custom stereoscopic experiences.',
    instructor: {
      name: 'Sarah Kim',
      role: 'Digital Illustrator',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    }
  },
  {
    id: 'webapp-dev-pro',
    title: 'Web App Development Bootcamp: React 19 & Tailwind',
    subject: 'Web App Development',
    duration: '44 hours',
    level: 'Intermediate',
    rating: 4.9,
    students: '16,800+',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=400',
    description: 'Design robust client/server interfaces, establish local caching layers, customize layout frames, and deploy on Cloud containers.',
    instructor: {
      name: 'Gabriela Ortiz',
      role: 'Linguist & Educator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    }
  },
  {
    id: 'vector-art',
    title: 'Creative Illustration: Line Art & Vector Painting',
    subject: 'Creative Design',
    duration: '28 hours',
    level: 'Beginner',
    rating: 5.0,
    students: '4,200+',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    description: 'Recreate line art styles, play with character designs, and formulate colorful illustrations.',
    instructor: {
      name: 'Sarah Kim',
      role: 'Digital Illustrator',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    }
  },
  {
    id: 'startup-scaling',
    title: 'Bootstrapping & Scaling High-Growth Startups',
    subject: 'Business & Leadership',
    duration: '20 hours',
    level: 'Advanced',
    rating: 4.7,
    students: '6,100+',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400',
    description: 'Go from zero to product-market fit, handle unit economics, and manage team psychology.',
    instructor: {
      name: 'Alexander Sterling',
      role: 'Serial Tech Entrepreneur',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    }
  },
  {
    id: 'fluent-spanish',
    title: 'Fluid Spanish: Accelerated Listening & Conversational Speaking',
    subject: 'Languages',
    duration: '15 hours',
    level: 'Beginner',
    rating: 4.9,
    students: '15,300+',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
    description: 'Connect naturally, refine your native pronunciation, and learn essential colloquial idioms.',
    instructor: {
      name: 'Gabriela Ortiz',
      role: 'Linguist & Educator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    }
  },
  {
    id: 'quantum-cosmology',
    title: 'Introduction to Quantum Mechanics & Modern Cosmology',
    subject: 'Academics',
    duration: '45 hours',
    level: 'Advanced',
    rating: 4.9,
    students: '3,800+',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
    description: 'Analyze wave-particle duality, Black Hole mechanics, and General Relativity mathematical structures.',
    instructor: {
      name: 'Prof. David Thorne',
      role: 'Theoretical Astrophysicist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    }
  },
];

export const BLOGS: BlogArticle[] = [
  {
    id: 'illustration-retention',
    title: 'The Future of Visual Learning: Why Drawings Increase Student Retention',
    category: 'E-learning Strategy',
    readTime: '6 min read',
    date: 'June 8, 2026',
    summary: 'Visual elements, particularly hand-drawn line art illustrations, create highly memorable learning schemas that bypass traditional auditory fatigue.',
    content: 'Have you ever wondered why technical diagrams in textbooks stay with us far longer than walls of text? Neuroscience suggests that hand-drawn illustrations act as emotional markers. By using stylized strokes and distinctive colors (like our signature Lavender and Ochre), learning becomes sensory. When concepts are mapped directly to characters—like our iconic lady riding a giant purple pencil—memory retrieval speed increases by up to 135%. In this article, we deep-dive into cognitive retention and visual design.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'tailwind-v4-mastery',
    title: 'Mastering Modern Styling with Tailwind CSS v4 and @theme directives',
    category: 'Web Technology',
    readTime: '4 min read',
    date: 'June 2, 2026',
    summary: 'Tailwind CSS v4 replaces the old tailwind.config.js file with elegant in-CSS theme declarations. Here is a definitive guide to the new compiler.',
    content: 'We are living in a fast-evolving CSS ecosystem. Tailwind v4 introduces a fully custom Rust compiler that reads your stylesheets directly. Forget the boilerplate config files: simple @theme directives allow you to define colors, typography, animations, and transitions in pure CSS syntax. We explore how we built the premium warm-cream background of Robostorms using these very properties, and how you can apply CSS-first layouts to achieve beautiful responsiveness.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'finding-your-edge',
    title: 'Finding Your Creative Edge: A Guide to Curated Learning Paths',
    category: 'Personal Growth',
    readTime: '5 min read',
    date: 'May 28, 2026',
    summary: 'Too many choices leads to choice paralysis. Learn how a personalized questionnaire filters through hundreds of degrees to find your perfect fit.',
    content: 'Choice paralysis is the single largest reason students drop out of online education. When presented with 10,000+ courses, we default to choosing nothing. At Robostorms, our core philosophy is curation. By asking three simple, conversational questions about your interests and timeline, we match you with elite teachers. Here is how you can map your career trajectory, bypass generic tutorials, and build a portfolio that stands taller than any university degree.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600',
  }
];

export const TEACHERS = [
  {
    name: 'Sarah Kim',
    color: 'bg-[#FF5A36]',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Marcus Bell',
    color: 'bg-[#C1A5FC]',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Dr. Evelyn Foster',
    color: 'bg-[#FCD24A]',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Gabriela Ortiz',
    color: 'bg-[#2E2E2E]',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
];
