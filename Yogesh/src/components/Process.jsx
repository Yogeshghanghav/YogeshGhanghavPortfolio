import { useRef } from 'react';
import use3DTilt from '../hooks/use3DTilt';

function ProcessCard({ num, title, desc }) {
  const cardRef = useRef(null);
  use3DTilt(cardRef, { max: 12, scale: 1.04 });

  return (
    <div className="process-card" ref={cardRef}>
      <span className="process-num">{num}</span>
      <h3 className="process-card-title">{title}</h3>
      <p className="process-card-desc">{desc}</p>
    </div>
  );
}

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Define',
      desc: 'Analyzing system requirements, mapping database architecture, and planning the structural API schema for rock-solid stability.',
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Crafting responsive user interfaces, designing micro-interactions, and visual layout planning to align with modern design systems.',
    },
    {
      num: '03',
      title: 'Build',
      desc: 'Writing clean modular code, implementing JWT user authentication, establishing REST services, and launching real-time communication modules.',
    },
    {
      num: '04',
      title: 'Launch',
      desc: 'Conducting thorough optimization, setting up build bundling, deploying to production servers, and ensuring ongoing maintenance.',
    },
  ];

  return (
    <section id="process" className="process-section">
      <div className="process-header">
        <span className="sub-title">METHODOLOGY</span>
        <h2 className="section-title">
          How We Work<span className="dot">.</span>
        </h2>
        <p className="process-subtitle">
          We follow a structured, creative, and highly technical approach to turn ideas into robust, responsive, and secure full stack applications.
        </p>
      </div>
      <div className="process-grid">
        {steps.map(step => (
          <ProcessCard key={step.num} num={step.num} title={step.title} desc={step.desc} />
        ))}
      </div>
    </section>
  );
}
