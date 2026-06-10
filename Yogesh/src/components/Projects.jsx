import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolioData';

function ProjectCard({ project, index }) {
  
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = ((x - xc) / xc) * 6; 
    const rotateX = -((y - yc) / yc) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      className="glass-panel rounded-3xl overflow-hidden border border-white/5 flex flex-col h-full transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(232,0,13,0.15)]"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      
      <div className="h-48 sm:h-56 w-full overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-[#06050a] via-transparent to-transparent z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-[9px] font-bold tracking-widest text-red-500 uppercase bg-red-500/10 border border-red-500/20 rounded-full">
            {project.title}
          </span>
        </div>
      </div>

      
      <div className="p-6 sm:p-8 flex flex-col flex-grow text-left">
        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-2">
          {project.subtitle}
        </h3>
        
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-6 flex-grow">
          {project.desc}
        </p>

        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[9px] font-bold tracking-wider text-slate-400 bg-white/5 border border-white/5 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        
        <div className="flex items-center gap-4 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-slate-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl bg-white/5 transition-all duration-300"
          >
            <Github size={12} /> Source
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-white bg-red-600 rounded-xl shadow-md hover:bg-red-500 transition-all duration-300"
          >
            <ExternalLink size={12} /> Live Link
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full py-24 px-6 md:px-12 bg-transparent overflow-hidden border-b border-red-600/10"
    >
      <div className="w-full max-w-5xl mx-auto">
        
        
        <div className="text-center mb-24">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">PROJECTS</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-1">
            Featured Works<span className="text-red-500">.</span>
          </h2>
          <div className="w-12 h-[2px] bg-red-600 mx-auto mt-4" />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.subtitle} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}