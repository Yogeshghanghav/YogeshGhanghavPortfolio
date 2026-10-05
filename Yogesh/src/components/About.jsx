import { motion } from 'framer-motion';
import { Code2, Cloud, Radio, Download, MapPin } from 'lucide-react';
import yogeshPhoto from '../assets/Yogesh.webp';

const stats = [
  { value: '8.64', label: 'B.Tech CGPA' },
  { value: '6', label: 'month internship' },
  { value: '2', label: 'live projects' },
  { value: '15+', label: 'real-time events handled' }
];

const strengths = [
  {
    icon: Code2,
    title: 'Full-stack craft',
    text: 'React and Tailwind on the front, Node.js, Express and Java behind it, with clean REST contracts in between.'
  },
  {
    icon: Cloud,
    title: 'Serverless on AWS',
    text: 'Lambda, API Gateway, DynamoDB and S3, deployed with SAM and no servers to babysit.'
  },
  {
    icon: Radio,
    title: 'Real-time and AI',
    text: 'Socket.io for live collaboration and Google Gemini for features that analyse and recommend.'
  }
];

const facts = [
  ['Based in', 'Pune, Maharashtra'],
  ['Degree', 'B.Tech, Sandip University'],
  ['Latest role', 'Software Developer Intern'],
  ['Core stack', 'MERN, Java, AWS']
];

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 px-6 md:px-12 bg-transparent overflow-hidden border-b border-red-600/10">
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="text-left mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">PROFILE</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-1">
            About Me<span className="text-red-500">.</span>
          </h2>
          <div className="w-12 h-[2px] bg-red-600 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-16 items-start">
          <motion.div
            className="w-full max-w-[400px] mx-auto lg:mx-0 lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <span className="absolute inset-0 translate-x-3 translate-y-3 rounded-[26px] border border-red-500/40" />
              <div className="group relative aspect-[4/5] rounded-[26px] overflow-hidden glass-panel p-2">
                <img
                  src={yogeshPhoto}
                  width="400" height="500"
                  decoding="async"
                  alt="Yogesh Ghanghav"
                  className="w-full h-full object-cover rounded-[20px] grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-2 rounded-[20px] bg-gradient-to-t from-[#06050a] via-transparent to-transparent pointer-events-none" />
                <div className="absolute left-6 right-6 bottom-6 pointer-events-none">
                  <h3 className="text-xl font-heading font-semibold text-white leading-tight">Yogesh Ghanghav</h3>
                  <p className="text-sm font-semibold text-red-400 mt-0.5">Software Engineer</p>
                </div>
                <span className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-black/55 backdrop-blur-sm border border-white/10 rounded-full">
                  <MapPin size={12} className="text-red-500" /> Pune, India
                </span>
              </div>
            </div>

            <dl className="mt-10 glass-panel rounded-2xl p-5 flex flex-col gap-3.5 text-sm">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-3">
                  <dt className="text-slate-500 shrink-0">{k}</dt>
                  <span className="flex-1 border-b border-dotted border-white/15" />
                  <dd className="text-slate-200 font-medium text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
          <div className="text-left">
            <motion.h3
              className="text-2xl md:text-3xl font-heading font-semibold text-white leading-snug max-w-2xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              I build full-stack products that are fast, secure and live on the web.
            </motion.h3>

            <div className="mt-8 max-w-2xl space-y-5 text-sm text-slate-400 font-light leading-relaxed">
              <p>
                I&rsquo;m a 2025 B.Tech graduate in Computer Science from Sandip University and a
                Java Full Stack Developer certified through Spark IT Institute. Most recently I worked as
                a Software Developer Intern at Creazione Software in Pune, where I joined the team
                building web applications and digital solutions for business growth.
              </p>
              <p>
                Outside work I ship my own projects end to end: CareerPilot AI, a serverless job tracker with
                Gemini-powered resume analysis, and DevCollab, a real-time collaboration platform with
                role-based access and live API monitoring. I care about clear APIs, sensible architecture and
                interfaces that feel quick.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 border-y border-white/10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={`py-6 px-4 first:pl-0 ${i > 0 ? 'sm:border-l border-white/10' : ''} ${i % 2 === 1 ? 'border-l sm:border-l' : ''} ${i > 1 ? 'border-t sm:border-t-0' : ''}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                >
                  <p className="font-heading font-semibold text-3xl text-white leading-none">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-2">{s.label}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {strengths.map((s) => (
                <div key={s.title}>
                  <s.icon size={22} className="text-red-500" />
                  <h4 className="mt-3 text-[15px] font-heading font-semibold text-white">{s.title}</h4>
                  <p className="mt-1.5 text-sm text-slate-400 font-light leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>

            <a
              href="/Ghanghav_Yogesh_Resume_.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-[0_0_24px_rgba(232,0,13,0.3)] transition-colors"
            >
              <Download size={15} /> Download resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
