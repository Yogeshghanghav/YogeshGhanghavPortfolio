import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, FileText, ArrowRight } from 'lucide-react';
import heroVideo from '../assets/Hero.mp4';

export default function Hero() {
  const roles = ["Software Engineer", "MERN Stack Developer", "Java Developer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [subText, setSubText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 60;
  const pauseDuration = 2000;

  useEffect(() => {
    let timer;
    const fullText = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setSubText(prev => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setSubText(prev => fullText.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && subText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && subText === "") {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [subText, isDeleting, roleIndex]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-12 px-6 md:px-12 overflow-hidden bg-transparent"
    >
      
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-75 pointer-events-none filter brightness-[0.55] contrast-[1.05]"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06050a]/20 to-[#06050a] z-0 pointer-events-none" />

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3.5 py-1.5 text-[10px] font-bold tracking-widest text-red-500 uppercase bg-red-500/10 border border-red-500/25 rounded-full mb-6">
              B.Tech in Computer Science and Engineering
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Yogesh <span className="text-gradient-crimson-amber">Ghanghav</span>
          </motion.h1>

          <motion.div
            className="h-10 sm:h-12 mt-4 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl font-heading font-bold text-slate-300">
              I'm a <span className="text-red-500 typing-cursor font-extrabold">{subText}</span>
            </h2>
          </motion.div>

          <motion.p 
            className="text-xs sm:text-sm text-slate-400 max-w-lg mt-4 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Engineering scalable web solutions with MERN & Java — blending clean architecture, powerful backends, and immersive user experiences.
          </motion.p>

          
          <motion.div 
            className="flex flex-wrap gap-4 mt-8 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white bg-red-600 rounded-xl shadow-[0_0_15px_rgba(232,0,13,0.3)] hover:bg-red-500 hover:shadow-[0_0_20px_rgba(232,0,13,0.5)] transition-all duration-300 cursor-pointer"
            >
              Explore Projects <ArrowRight size={12} />
            </a>

            <a 
              href="/Yogesh_Ghanghav_Resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-300 border border-white/10 hover:border-red-500/50 hover:bg-red-500/5 rounded-xl transition-all duration-300"
            >
              <FileText size={12} /> Resume PDF
            </a>
          </motion.div>

          
          <motion.div 
            className="flex items-center gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Find Me</span>
            <div className="w-8 h-[1px] bg-slate-800" />
            
            <a 
              href="https://github.com/Yogeshghanghav" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/yogesh-ghanghav-389054296" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </div>

        
        <div className="lg:col-span-5 w-full h-[250px] md:h-[400px] order-first lg:order-last pointer-events-none select-none flex items-center justify-center">
          
          <div className="w-[70%] h-[70%] rounded-full bg-red-500/5 border border-red-500/10 blur-xl animate-pulse-slow" />
        </div>

      </div>
    </section>
  );
}