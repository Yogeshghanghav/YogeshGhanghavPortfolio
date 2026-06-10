export const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' }
];

export const skillsData = {
  programming: [
    { name: 'Java', pct: 85 },
    { name: 'JavaScript', pct: 90 },
    { name: 'Python', pct: 70 }
  ],
  frontend: [
    { name: 'React.js', pct: 90 },
    { name: 'Tailwind CSS', pct: 95 },
    { name: 'HTML5/CSS3', pct: 92 }
  ],
  backend: [
    { name: 'Node.js', pct: 88 },
    { name: 'Express.js', pct: 88 },
    { name: 'Socket.io', pct: 82 },
    { name: 'REST APIs', pct: 90 }
  ],
  database: [
    { name: 'MongoDB', pct: 85 },
    { name: 'SQL', pct: 80 }
  ],
  tools: [
    { name: 'Git', pct: 88 },
    { name: 'GitHub', pct: 90 },
    { name: 'VS Code', pct: 95 }
  ]
};

export const projects = [
  {
    title: 'DevCollab',
    subtitle: 'Real-Time Collaboration & API Monitor',
    desc: 'A highly advanced developer hub featuring real-time collaborative code workspace and API status tracking. Built with the MERN stack and Socket.io for immediate updates, and integrated with role-based access control (RBAC) and responsive visual analytics dashboards.',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Tailwind CSS', 'REST APIs'],
    github: 'https://github.com/Yogeshghanghav/devcollab',
    demo: 'https://devcollab.demo'
  },
  {
    title: 'AgriConnect',
    subtitle: 'Smart Farming & Resource Portal',
    desc: 'An agricultural management web application integrating OpenWeatherMap API for weather intelligence. Serves multiple user roles (Farmers, Merchants, Admin) via robust REST APIs and displays interactive resource allocation and pricing dashboards.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenWeatherMap API', 'Tailwind CSS', 'REST APIs'],
    github: 'https://github.com/Yogeshghanghav/agriconnect',
    demo: 'https://agriconnect.demo'
  }
];

export const experienceTimeline = [
  {
    year: '2025 - Present',
    type: 'work',
    title: 'Software Engineer',
    subtitle: 'Aspiring Engineer',
    desc: 'Actively building full stack web systems, designing responsive UI layouts using Tailwind, and engineering socket connections for real-time web environments.'
  },
  {
    year: '2022 - 2025',
    type: 'education',
    title: 'B.Tech in Computer Science',
    subtitle: 'Sandip University',
    desc: 'Specialized in Software Engineering and Distributed Web Systems. Maintained a CGPA of 8.64. Ready to hit the ground running.'
  },
  {
    year: '2019 - 2022',
    type: 'education',
    title: 'Diploma in Computer Science',
    subtitle: 'Maharashtra State Board of Technical Education',
    desc: 'Studied core computer engineering principles: Object-Oriented Programming, Data Structures, and Database Management Systems. Graduated with 70%.'
  }
];