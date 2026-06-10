import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-6 bg-[#06050a] border-t border-white/5 text-center flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto text-[10px] text-slate-500 font-bold tracking-widest uppercase">
      <span>
        &copy; {currentYear} Yogesh Ghanghav. All Rights Reserved.
      </span>
      <span>
        Software Engineer / MERN &amp; Java Developer
      </span>
      <a 
        href="mailto:yogeshghanghav77@gmail.com"
        className="text-slate-400 hover:text-red-500 transition-colors"
      >
        yogeshghanghav77@gmail.com
      </a>
    </footer>
  );
}