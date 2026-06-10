export default function Sidebar({ scrollProgress }) {
  return (
    <>
      
      <aside className="sidebar-left">
        <div className="sidebar-line" />
        <div className="social-icons">
          <a href="https://github.com/Yogeshghanghav" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GH</a>
          <a href="https://www.linkedin.com/in/yogesh-ghanghav-389054296" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
        </div>
        <div className="sidebar-line" />
      </aside>

      
      <aside className="sidebar-right">
        <div className="scroll-track">
          <div className="scroll-fill" style={{ height: `${scrollProgress}%` }} />
        </div>
      </aside>
    </>
  );
}