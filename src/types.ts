export interface Course {
  id: string;
  title: string;
  subject: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: string;
  image: string;
  description: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string;
  image: string;
}

export interface Subject {
  id: string;
  name: string;
  iconName: string;
  count: number;
  description: string;
}
