export const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Education & Achievements', id: 'education' },
  { name: 'Contact', id: 'contact' }
];

export const skillsData = {
  programming: [
    { name: 'Java', pct: 85 },
    { name: 'JavaScript', pct: 90 },
   
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
    { name: 'SQL', pct: 80 },
    { name: 'DynamoDB', pct: 78 }
  ],
  cloud: [
    { name: 'AWS Lambda', pct: 80 },
    { name: 'API Gateway', pct: 78 },
    { name: 'S3', pct: 80 },
    { name: 'AWS SAM CLI', pct: 75 },
    { name: 'Google Gemini AI', pct: 82 }
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
    demo: 'https://devcollab-rho.vercel.app/'
  },
  {
    title: 'CareerPilot AI',
    subtitle: 'Smart Job Application Tracker',
    desc: 'A full-stack serverless job tracking platform built with a React.js frontend and AWS Lambda + API Gateway REST backend, deployed via AWS SAM with no EC2. Features JWT-based authentication, Google Gemini AI-powered resume analysis (match %, missing skills, ATS keyword recommendations), and S3 resume uploads via presigned URLs with an analytics dashboard tracking application stats.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['React.js', 'Node.js', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'Google Gemini AI', 'JWT'],
    github: 'https://github.com/Yogeshghanghav/careerpilot-ai',
    demo: 'https://career-pilot-ai-nyrx.vercel.app/'
  }
];

export const experienceTimeline = [
  {
    year: 'Jun 2025 - Nov 2025',
    type: 'work',
    title: 'Full Stack Developer Intern',
    subtitle: 'Spark IT, Pune',
    desc: 'Worked as a Full Stack Developer Intern for a 6-month term, contributing to production-facing full-stack web development tasks. Applied MERN stack and Java concepts to real-world development workflows, code reviews, and deployment practices, while collaborating with the engineering team on debugging and version control.'
  },
  {
    year: 'Completed Jun 2025',
    type: 'education',
    title: 'Java Full Stack Certification',
    subtitle: 'Spark IT Institute, Pune',
    desc: 'Completed a comprehensive full-time course covering HTML, CSS, JavaScript, React.js, Express.js, Node.js, MongoDB, SQL, APIs, Core Java, Advanced Java, Spring Boot, Hibernate, databases, and modern frontend technologies.'
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
