import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowRight, MapPin, Briefcase, Rocket } from 'lucide-react';
import heroVideo from '../assets/Hero.mp4';

export default function Hero() {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  const stack = ['React', 'Node.js', 'Java', 'AWS', 'MongoDB'];
  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay }
  });

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-20 px-6 md:px-12 overflow-hidden bg-transparent"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-75 pointer-events-none filter brightness-[0.55] contrast-[1.05]"
        src={heroVideo}
        autoPlay={!reduceMotion}
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06050a]/20 to-[#06050a] z-0 pointer-events-none" />

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div className="flex flex-wrap items-center gap-2.5 mb-7" {...fade(0)}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 rounded-full">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              Open to full-time roles
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-full">
              <MapPin size={12} className="text-red-500" /> Pune, India
            </span>
          </motion.div>

          <motion.p className="text-sm text-slate-400 mb-2" {...fade(0.05)}>Hello, I&rsquo;m</motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-white tracking-tight leading-[1.05]"
            {...fade(0.1)}
          >
            Yogesh <span className="text-gradient-crimson-amber">Ghanghav</span>
          </motion.h1>
          <motion.div
            className="mt-5 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm font-mono text-sm sm:text-base"
            {...fade(0.2)}
          >
            <span className="text-red-500 select-none">&gt;</span>
            <span className="text-slate-100 typing-cursor min-h-[1.5em]">{subText}</span>
          </motion.div>

          <motion.p className="text-sm sm:text-[15px] text-slate-400 max-w-xl mt-6 leading-relaxed font-light" {...fade(0.3)}>
            I build full-stack web applications with the MERN stack and Java, and ship them on
            serverless AWS, from real-time collaboration to AI-assisted tools.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-3 mt-8" {...fade(0.4)}>
            <a
              href="#projects"
              onClick={go('projects')}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-red-600 rounded-xl shadow-[0_0_20px_rgba(232,0,13,0.3)] hover:bg-red-500 hover:shadow-[0_0_28px_rgba(232,0,13,0.5)] transition-all duration-300 cursor-pointer"
            >
              View projects <ArrowRight size={15} />
            </a>
            <a
              href="/Ghanghav_Yogesh_Resume_.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-200 border border-white/15 hover:border-red-500/50 hover:bg-red-500/5 rounded-xl transition-all duration-300"
            >
              <Download size={15} /> Resume
            </a>
            <div className="flex items-center gap-1 sm:ml-2">
              <a href="https://github.com/Yogeshghanghav" target="_blank" rel="noopener noreferrer" className="p-2.5 text-slate-400 hover:text-red-500 transition-colors" aria-label="GitHub Profile"><Github size={19} /></a>
              <a href="https://www.linkedin.com/in/yogesh-ghanghav-389054296" target="_blank" rel="noopener noreferrer" className="p-2.5 text-slate-400 hover:text-red-500 transition-colors" aria-label="LinkedIn Profile"><Linkedin size={19} /></a>
              <a href="mailto:yogeshghanghav77@gmail.com" className="p-2.5 text-slate-400 hover:text-red-500 transition-colors" aria-label="Email"><Mail size={19} /></a>
            </div>
          </motion.div>
          <motion.div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-10 pt-6 border-t border-white/10 w-full max-w-xl" {...fade(0.5)}>
            <span className="text-xs text-slate-500">Working with</span>
            {stack.map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-md">{t}</span>
            ))}
          </motion.div>
        </div>
        <div className="lg:col-span-5 w-full h-[200px] md:h-[300px] lg:h-[460px] order-first lg:order-last pointer-events-none select-none relative flex items-center justify-center">
          <div className="w-[70%] h-[70%] rounded-full bg-red-500/5 border border-red-500/10 blur-xl animate-pulse-slow" />

          {/* <motion.a
            href="#education"
            onClick={go('education')}
            className="hidden lg:flex pointer-events-auto absolute top-2 right-0 w-[250px] items-start gap-3 p-4 rounded-2xl glass-panel hover:border-red-500/40 transition-colors"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <span className="p-2 rounded-lg bg-red-500/10 text-red-500"><Briefcase size={16} /></span>
            <span>
              <span className="block text-xs text-slate-500">Latest role</span>
              <span className="block text-sm font-semibold text-white mt-0.5">Software Developer Intern</span>
              <span className="block text-xs text-slate-400 mt-0.5">Creazione Software, 2026</span>
            </span>
          </motion.a> */}

          {/* <motion.a
            href="#projects"
            onClick={go('projects')}
            className="hidden lg:flex pointer-events-auto absolute bottom-2 left-0 w-[250px] items-start gap-3 p-4 rounded-2xl glass-panel hover:border-red-500/40 transition-colors"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <span className="p-2 rounded-lg bg-red-500/10 text-red-500"><Rocket size={16} /></span>
            <span>
              <span className="block text-xs text-slate-500">Latest project</span>
              <span className="block text-sm font-semibold text-white mt-0.5">CareerPilot AI</span>
              <span className="block text-xs text-slate-400 mt-0.5">Serverless job tracker with Gemini AI</span>
            </span>
          </motion.a> */}
        </div>
      </div>
      <a
        href="#about"
        onClick={go('about')}
        aria-label="Scroll to About"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
      >
        Scroll
        <span className="relative w-px h-9 bg-white/15 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-red-500 animate-bounce" />
        </span>
      </a>
    </section>
  );
}
