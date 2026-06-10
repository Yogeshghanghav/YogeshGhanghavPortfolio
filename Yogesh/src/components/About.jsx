import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit, GraduationCap, Code2 } from 'lucide-react';
import yogeshPhoto from '../assets/Yogesh.png';

export default function About() {
  const cards = [
    {
      icon: <GraduationCap size={20} className="text-red-500" />,
      title: "Education",
      heading: "B.Tech in CSE",
      sub: "Sandip University · 2025 Graduate",
      desc: "Deep focus on algorithms, database management systems, and system design. Maintained 8.64 CGPA."
    },
    {
      icon: <FolderGit size={20} className="text-red-500" />,
      title: "Projects Portfolio",
      heading: "15+ Applications",
      sub: "Real-time & AI Portals",
      desc: "Developed secure full-stack systems including role-based communication platforms and dashboard monitors."
    },
    {
      icon: <Code2 size={20} className="text-red-500" />,
      title: "Engineering Stack",
      heading: "MERN & Java",
      sub: "High-Performance Systems",
      desc: "Passionate about clean modular patterns, socket events, REST integration, and WebGL implementations."
    }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full py-24 px-6 md:px-12 bg-transparent overflow-hidden border-b border-red-600/10"
    >
      <div className="w-full max-w-7xl mx-auto z-10 relative">
        
        
        <div className="text-left mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">PROFILE</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-1">
            About Me<span className="text-red-500">.</span>
          </h2>
          <div className="w-12 h-[2px] bg-red-600 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          
          <div className="lg:col-span-7 flex flex-col text-left items-start order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Software Engineer Ready to Deliver Impact
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-6">
              I am a results-driven 2025 Bachelor of Technology (B.Tech) in Computer Science graduate 
              from Sandip University. As a fresher, I have invested my academic journey building 
              practical, production-ready applications. I specialize in designing backends using 
              Node.js and Java, and deploying rich, animated user interfaces with React and Tailwind.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-8">
              My core engineering philosophy centers around performance, database normalization, and robust API contracts. 
              I am eager to apply my skills in real-time communications (Socket.io) and database integrations to help 
              engineering teams scale products.
            </p>

            
            <div className="flex flex-col gap-4 w-full">
              {cards.map((card, i) => (
                <motion.div
                  key={card.heading}
                  className="glass-panel glass-panel-hover p-5 rounded-2xl flex gap-5 items-start border border-white/5"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-500 rounded-xl shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block">
                      {card.title}
                    </span>
                    <h4 className="text-base font-heading font-extrabold text-white mt-0.5">
                      {card.heading}
                    </h4>
                    <p className="text-[10px] font-semibold text-red-400 mt-0.5">
                      {card.sub}
                    </p>
                    <p className="text-xs text-slate-400 font-light mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-start order-1 lg:order-2">
            <motion.div
              className="relative w-full max-w-[340px] aspect-square rounded-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-red-600 to-amber-500 opacity-20 blur-2xl -z-10 animate-pulse-slow" />
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-tr from-red-600 to-amber-500 opacity-30 blur-sm -z-10" />

              
              <div className="w-full h-full rounded-[24px] overflow-hidden glass-panel border border-white/10 p-2 shadow-2xl relative group">
                <img 
                  src={yogeshPhoto} 
                  alt="Yogesh Ghanghav" 
                  className="w-full h-full object-cover rounded-[18px] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                />
                
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-60 rounded-[18px] pointer-events-none transition-opacity group-hover:opacity-40" />
                
                
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-red-500 rounded-tl pointer-events-none" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-red-500 rounded-tr pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-red-500 rounded-bl pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-red-500 rounded-br pointer-events-none" />
              </div>
            </motion.div>

            
            <div className="mt-6 text-center lg:text-right w-full max-w-[340px]">
              <h4 className="text-xl font-heading font-extrabold tracking-wider text-white">
                YOGESH GHANGHAV
              </h4>
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">
                Full Stack Developer
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}