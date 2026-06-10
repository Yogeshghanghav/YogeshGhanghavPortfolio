import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useGsapAnimations(mainRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from('.hero-anim', {
        y: 80, opacity: 0, duration: 1.6,
        stagger: 0.2, ease: 'power4.out', delay: 0.2,
      });

      gsap.from('.navbar', {
        y: -50, opacity: 0, duration: 1.2, ease: 'power3.out',
      });

      gsap.from('.sidebar-left', {
        x: -40, opacity: 0, duration: 1.4, ease: 'power3.out', delay: 0.6,
      });

      gsap.utils.toArray('.section-title').forEach(el => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          x: -80, opacity: 0, duration: 1, ease: 'power3.out',
        });
      });

      gsap.from('.big-number', {
        scrollTrigger: { trigger: '.big-number', start: 'top 80%' },
        scale: 0.5, opacity: 0, duration: 1.2, ease: 'back.out(1.4)',
      });

      gsap.utils.toArray('.skill-fill').forEach(bar => {
        const target = bar.dataset.width;
        gsap.from(bar, {
          scrollTrigger: { trigger: bar, start: 'top 90%' },
          width: 0, duration: 1.2, ease: 'power3.out',
        });
        bar.style.width = target;
      });

      gsap.from('.edu-item', {
        scrollTrigger: { trigger: '.edu-list', start: 'top 80%' },
        y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
      });

      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          y: 50, opacity: 0, duration: 0.9,
          delay: i * 0.1, ease: 'power3.out',
        });
      });

      const sections = [
        { id: '#home',      bg: '#000' },
        { id: '#about',     bg: '#000' },
        { id: '#projects',  bg: '#000' },
        { id: '#skills',    bg: '#000' },
        { id: '#education', bg: '#000' },
        { id: '#contact',   bg: '#000' },
      ];
      sections.forEach(({ id, bg }) => {
        ScrollTrigger.create({
          trigger: id,
          start: 'top center',
          end: 'bottom center',
          onEnter:     () => gsap.to(document.body, { background: bg, duration: 0.8 }),
          onEnterBack: () => gsap.to(document.body, { background: bg, duration: 0.8 }),
        });
      });

    }, mainRef);
    return () => ctx.revert();
  }, [mainRef]);
}