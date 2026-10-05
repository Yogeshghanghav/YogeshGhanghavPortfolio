export const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'education' },
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

// Replace the existing `projects` export in src/data/portfolioData.js with this:

export const projects = [{
        title: 'DevCollab',
        subtitle: 'Real-Time Collaboration & Monitoring Platform',
        desc: 'A developer hub for real-time team collaboration and API health tracking. Built on the MERN stack with Socket.io for instant updates, JWT authentication and role-based access control.',
        image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=1000&q=80',
        tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Tailwind CSS', 'JWT'],
        flow: ['React.js', 'Socket.io', 'Express.js', 'MongoDB'],
        metrics: [
            { value: '15+', label: 'live events' },
            { value: '3', label: 'access roles' },
            { value: '20+', label: 'endpoints monitored' }
        ],
        highlights: [
            'Real-time collaboration over Socket.io with sub-second message delivery.',
            'Role-based access control for Admin, Developer and Viewer using JWT and protected routes.',
            'Monitoring dashboard that alerts on APIs above 500ms response time or 5% error rate.'
        ],
        github: 'https://github.com/Yogeshghanghav/devcollab',
        demo: 'https://devcollab-rho.vercel.app/'
    },
    {
        title: 'CareerPilot AI',
        subtitle: 'Smart Job Application Tracker',
        desc: 'A fully serverless job tracker with AI-powered resume analysis. React frontend, AWS Lambda and API Gateway backend, deployed through AWS SAM with no EC2.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
        tags: ['React.js', 'Node.js', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'Google Gemini AI', 'JWT'],
        flow: ['React.js', 'API Gateway', 'Lambda', 'DynamoDB'],
        metrics: [
            { value: '0', label: 'servers to manage' },
            { value: '3', label: 'AI insights per resume' },
            { value: '4', label: 'pipeline stages tracked' }
        ],
        highlights: [
            'Gemini AI analysis returns match %, missing skills and ATS keyword recommendations.',
            'Resume uploads go straight to S3 through presigned URLs.',
            'JWT authentication and a dashboard for Applied, Interview, Selected and Rejected stats.'
        ],
        github: 'https://github.com/Yogeshghanghav/careerpilot-ai',
        demo: 'https://career-pilot-ai-nyrx.vercel.app/'
    }
];

// Replace the existing `experience` and `education` exports at the bottom of src/data/portfolioData.js with this:
// Replace the existing `experience` and `education` exports at the bottom of src/data/portfolioData.js with this:

export const experience = [{
    role: 'Software Developer Intern',
    company: 'Creazione Software',
    initials: 'CS',
    location: 'Pune, Maharashtra',
    start: 'Jan 2026',
    end: 'Jun 2026',
    months: 6,
    startMonth: 0, // 0 = Jan -> used for the month tracker
    status: 'Completed',
    project: 'Build Website Apps & Digital Solutions That Drive Business Growth',
    highlights: [
        'Worked as an active member of the development team on web applications and digital solutions.',
        'Showed strong technical proficiency, discipline and teamwork across the project lifecycle.'
    ],
    recognition: 'Recognised by the organisation for sincerity, dedication and a hardworking, eager-to-learn attitude throughout the internship.',
    focus: ['Web Applications', 'Digital Solutions', 'Team Collaboration']
}];

export const education = [{
        type: 'Degree',
        initials: 'SU',
        title: 'Bachelor of Technology',
        school: 'Sandip University',
        year: '2025',
        period: 'Graduated 2025',
        metricLabel: 'CGPA',
        metric: '8.64',
        unit: '/ 10',
        pct: 86.4,
        focus: 'Software Engineering and Distributed Web Systems'
    },
    {
        type: 'Certification',
        initials: 'SI',
        title: 'Java Full Stack Developer',
        school: 'Spark IT Institute',
        year: '2025',
        period: 'Jun 2025 – Dec 2025',
        metricLabel: 'Status',
        metric: 'Certified',
        unit: '6 months',
        pct: 100,
        focus: 'React, Node.js, MongoDB, SQL, Core & Advanced Java, Spring Boot, Hibernate'
    },
    {
        type: 'Diploma',
        initials: 'MS',
        title: 'Diploma in Computer Science',
        school: 'Maharashtra State Board of Technical Education',
        year: '2022',
        period: 'Completed 2022',
        metricLabel: 'Score',
        metric: '70',
        unit: '%',
        pct: 70,
        focus: 'OOP, Data Structures and Database Management Systems'
    }
];
