import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, NavLink, Route, Routes, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, AudioLines, BrainCircuit,
  BriefcaseBusiness, Check, ChevronRight, Code2, Command, Database, Download,
  ExternalLink, Github, GraduationCap, Layers3, Mail, Menu, MessageCircle,
  MousePointer2, Network, Send, Sparkles, Terminal, X, Zap
} from 'lucide-react';
import './styles.css';

const EMAIL = 'farukhabbasshah.bscsf24@iba-suk.edu.pk';
const GITHUB = 'https://github.com/TheSFS';
const name = 'Syed Farukh Abbas Shah';

const projects = [
  { id: 'audiosense', title: 'AudioSense AI', category: 'AI / ML', type: 'Featured', year: 'ONGOING', icon: AudioLines, tone: 'cyan', description: 'An intelligent audio classification experience that distinguishes music from speech, with explainable feature insights and a feedback-driven improvement loop.', stack: ['Python', 'Librosa', 'Scikit-learn', 'Flask', 'JavaScript'], details: 'Designed around practical audio analysis: segment-based inference, acoustic feature extraction, prediction history and user feedback for future model improvement.', status: 'In development' },
  { id: 'cricket', title: 'T20 Cricket Score Prediction', category: 'AI / ML', type: 'Featured', year: 'ACADEMIC', icon: BrainCircuit, tone: 'violet', description: 'A machine learning application that estimates T20 innings scores using an XGBoost regression model and a Flask-powered interface.', stack: ['Python', 'Pandas', 'XGBoost', 'Flask', 'SHAP'], details: 'Built a complete prediction workflow with data preparation, model training, evaluation, persisted model artifacts and an interface for entering match conditions.', status: 'Academic project' },
  { id: 'lost-found', title: 'Lost & Found Management System', category: 'Web', type: 'Project', year: 'ACADEMIC', icon: Network, tone: 'orange', description: 'A web application concept for reporting, discovering and tracking lost or found items through a centralized system.', stack: ['Node.js', 'Express', 'MongoDB'], details: 'Focused on a clear reporting workflow, item discovery and organized records to make it easier for users to reconnect with misplaced belongings.', status: 'Academic project' },
  { id: 'spam', title: 'SMS Spam Detection', category: 'AI / ML', type: 'Project', year: 'ACADEMIC', icon: Terminal, tone: 'pink', description: 'A text classification project comparing Naive Bayes and Logistic Regression to identify spam messages.', stack: ['Python', 'Scikit-learn', 'NLP', 'Pandas'], details: 'Explored text preprocessing, feature representation, model comparison and classification metrics on the SMS Spam Collection dataset.', status: 'Academic project' },
  { id: 'clustering', title: 'Customer Segmentation', category: 'Data', type: 'Experiment', year: 'LAB WORK', icon: Layers3, tone: 'lime', description: 'An exploratory clustering exercise using customer data, K-Means, feature scaling and silhouette analysis.', stack: ['Python', 'Pandas', 'Matplotlib', 'Scikit-learn'], details: 'Compared clustering behavior before and after scaling, used the elbow method and silhouette scores to reason about cluster quality.', status: 'Lab work' }
];

const skills = [
  { group: 'Programming', items: ['Python', 'Java', 'C', 'C++', 'JavaScript'] },
  { group: 'AI & Data', items: ['Machine Learning', 'Scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'Matplotlib', 'Librosa'] },
  { group: 'Web & Backend', items: ['Flask', 'Node.js', 'Express', 'HTML', 'CSS'] },
  { group: 'Databases & Tools', items: ['MySQL', 'MongoDB', 'Git', 'GitHub', 'VS Code'] }
];

const rise = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: .65, ease: [.22, 1, .36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: .09 } } };

function usePageTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
}

function CursorGlow() {
  const [point, setPoint] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = e => setPoint({ x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div className="cursor-glow" style={{ transform: `translate3d(${point.x - 180}px, ${point.y - 180}px, 0)` }} />;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  const links = [['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects'], ['/journey', 'Journey'], ['/contact', 'Contact']];
  return <header className="header">
    <Link to="/" className="brand" aria-label="Farukh home"><span className="brand-symbol">F<span>.</span></span><span className="brand-name">FARUKH<span> / DEV</span></span></Link>
    <nav className={`nav ${open ? 'nav-open' : ''}`}>
      {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}
    </nav>
    <div className="header-right"><span className="availability"><i /> Available for opportunities</span><Link className="header-contact" to="/contact">Let's talk <ArrowUpRight size={15} /></Link></div>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
  </header>;
}

function Footer() {
  return <footer className="footer"><div className="footer-top"><div><div className="footer-brand">F<span>.</span></div><p>Building with curiosity.<br />Learning with intention.</p></div><div className="footer-links"><Link to="/about">About</Link><Link to="/projects">Projects</Link><Link to="/journey">Journey</Link><Link to="/contact">Contact</Link></div><a className="back-top" href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {name}</span><span>Designed & built with <span className="heart">♥</span> and a lot of curiosity.</span><span className="footer-location">Sindh, Pakistan <span className="live-dot" /></span></div></footer>;
}

function Layout() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: .001 });
  usePageTop();
  return <><motion.div className="scroll-progress" style={{ scaleX }} /><CursorGlow /><Header /><main id="top"><AnimatePresence mode="wait"><Routes>
    <Route path="/" element={<Page><Home /></Page>} />
    <Route path="/about" element={<Page><About /></Page>} />
    <Route path="/projects" element={<Page><Projects /></Page>} />
    <Route path="/journey" element={<Page><Journey /></Page>} />
    <Route path="/contact" element={<Page><Contact /></Page>} />
    <Route path="*" element={<Page><NotFound /></Page>} />
  </Routes></AnimatePresence></main><Footer /></>;
}

function Page({ children }) {
  const location = useLocation();
  return <motion.div key={location.pathname} initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }} transition={{ duration: .38, ease: 'easeOut' }}>{children}</motion.div>;
}

function Eyebrow({ children, number }) { return <div className="eyebrow"><span className="eyebrow-line" />{number && <span className="eyebrow-number">{number}</span>}{children}</div>; }
function SectionTitle({ eyebrow, title, accent, description, number }) { return <motion.div className="section-title" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, amount: .25 }}><Eyebrow number={number}>{eyebrow}</Eyebrow><h2>{title} <span>{accent}</span></h2>{description && <p>{description}</p>}</motion.div>; }

function Home() {
  const [typed, setTyped] = useState('');
  const roles = useMemo(() => ['Computer Science Student', 'Developer in Progress', 'Machine Learning Enthusiast'], []);
  useEffect(() => {
    let role = 0, index = 0, deleting = false, timer;
    const tick = () => {
      const current = roles[role];
      if (!deleting) { index++; setTyped(current.slice(0, index)); if (index === current.length) { deleting = true; timer = setTimeout(tick, 1500); return; } }
      else { index--; setTyped(current.slice(0, index)); if (index === 0) { deleting = false; role = (role + 1) % roles.length; } }
      timer = setTimeout(tick, deleting ? 34 : 65);
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [roles]);
  return <>
    <section className="hero shell">
      <div className="hero-grid" />
      <motion.div className="hero-copy" variants={stagger} initial="hidden" animate="show">
        <motion.div variants={rise} className="hero-kicker"><span className="kicker-dot" /> HELLO, WORLD. I'M FARUKH.</motion.div>
        <motion.h1 variants={rise}>Turning ideas<br />into <span className="gradient-text">real things.</span></motion.h1>
        <motion.div variants={rise} className="hero-role"><span className="role-bracket">[</span> {typed}<span className="typing-cursor">|</span> <span className="role-bracket">]</span></motion.div>
        <motion.p variants={rise} className="hero-description">I’m a Computer Science student who enjoys building practical software, exploring machine learning, and understanding how technology can solve everyday problems.</motion.p>
        <motion.div variants={rise} className="hero-actions"><Link to="/projects" className="button button-primary">Explore my work <ArrowUpRight size={17} /></Link><Link to="/about" className="button button-quiet">More about me <ArrowRight size={16} /></Link></motion.div>
        <motion.div variants={rise} className="hero-socials"><a href={GITHUB} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={13} /></a><span /><a href={`mailto:${EMAIL}`}><Mail size={16} /> Email <ArrowUpRight size={13} /></a></motion.div>
      </motion.div>
      <motion.div className="hero-art" initial={{ opacity: 0, scale: .88, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: .9, delay: .18, ease: [.22, 1, .36, 1] }}>
        <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="portrait-glow" />
        <div className="portrait-card"><div className="portrait-top"><span>PROFILE / 001</span><span className="portrait-live"><i /> ONLINE</span></div><img src="/pic.png" alt="Portrait of Syed Farukh Abbas Shah" /><div className="portrait-bottom"><div><b>Syed Farukh Abbas Shah</b><span>Developer · Learner · Builder</span></div><span className="portrait-index">SFS_26</span></div></div>
        <motion.div className="float-chip chip-code" animate={{ y: [0, -9, 0], rotate: [0, 2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}><Code2 size={17} /><span>Building things<br /><b>line by line</b></span></motion.div>
        <motion.div className="float-chip chip-ai" animate={{ y: [0, 9, 0], rotate: [0, -2, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}><BrainCircuit size={18} /><span>Curious about<br /><b>intelligent systems</b></span></motion.div>
        <div className="art-cross cross-a">+</div><div className="art-cross cross-b">+</div>
      </motion.div>
      <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><div><ArrowDown size={14} /></div></div>
      <div className="hero-index">01 — 05</div>
    </section>

    <section className="intro-strip shell"><div className="strip-label">A LITTLE ABOUT MY FOCUS</div><div className="strip-content"><span>SOFTWARE</span><b>×</b><span>DATA</span><b>×</b><span>INTELLIGENCE</span><b>×</b><span>CREATIVITY</span></div></section>

    <section className="home-projects shell section-space"><SectionTitle eyebrow="SELECTED WORK" number="01" title="Things I've" accent="built." description="A few projects and experiments where I turn concepts into working solutions." /><div className="featured-grid">{projects.slice(0, 3).map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}</div><div className="section-end-link"><Link to="/projects">Explore all projects <ArrowUpRight size={16} /></Link></div></section>

    <section className="home-about shell section-space"><div className="about-quote"><Eyebrow number="02">THE MINDSET</Eyebrow><h2>Not just learning<br />the <span>syntax.</span><br />Understanding the<br /><span>why.</span></h2></div><div className="about-side"><p>I believe the best way to understand technology is to build with it. My journey moves between programming fundamentals, data-driven thinking and user-focused software.</p><div className="mini-facts"><div><b>01</b><span>Learn by building</span></div><div><b>02</b><span>Stay curious</span></div><div><b>03</b><span>Improve every iteration</span></div></div><Link to="/about" className="text-link">Get to know me <ArrowUpRight size={16} /></Link></div></section>

    <section className="home-contact shell"><div className="contact-banner"><div className="banner-orb" /><div><Eyebrow>HAVE SOMETHING IN MIND?</Eyebrow><h2>Let's build something<br /><span>meaningful.</span></h2></div><Link to="/contact" className="round-link" aria-label="Go to contact"><ArrowUpRight size={28} /></Link></div></section>
  </>;
}

function ProjectCard({ project, index, compact = false }) {
  const Icon = project.icon;
  return <motion.article className={`project-card ${project.tone} ${compact ? 'compact-card' : ''}`} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }} transition={{ delay: index * .06 }}>
    <div className="project-card-top"><span className="project-type">{project.type} <span>·</span> {project.year}</span><span className="project-arrow"><ArrowUpRight size={18} /></span></div>
    <div className="project-icon"><Icon size={25} strokeWidth={1.5} /></div>
    <h3>{project.title}</h3><p>{project.description}</p>
    <div className="project-tags">{project.stack.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
    <div className="project-card-foot"><span>{project.category}</span><span className="project-status"><i /> {project.status}</span></div>
  </motion.article>;
}

function About() {
  return <div className="page-shell shell">
    <PageHeading number="01" eyebrow="A LITTLE CONTEXT" title="The person behind" accent="the pixels." description="A curious mind, a Computer Science degree in progress, and a genuine interest in making technology useful." />
    <section className="about-layout"><motion.div className="about-image-wrap" variants={rise} initial="hidden" animate="show"><div className="about-image-frame"><img src="/pic.png" alt="Portrait of Farukh Abbas Shah" /></div><div className="image-caption"><span>FIG. 01</span><span>THE BUILDER'S SIDE</span></div></motion.div>
      <motion.div className="about-story" variants={stagger} initial="hidden" animate="show"><motion.div variants={rise}><Eyebrow>MY STORY</Eyebrow><h2>Hey, I'm <span>Farukh.</span></h2></motion.div><motion.p variants={rise}>I'm a BS Computer Science student at Sukkur IBA University, based in Sindh, Pakistan. I'm interested in the space where software engineering, data and intelligent systems meet.</motion.p><motion.p variants={rise}>I enjoy taking an idea from a rough concept to something that actually works — setting up the data, understanding the logic, building the interface, and learning from what doesn't work the first time.</motion.p><motion.p variants={rise}>I'm still early in my journey, which is exactly what makes it exciting. Every project is a chance to get a little better at asking the right questions and building better solutions.</motion.p><motion.div variants={rise} className="about-signoff">Curious by nature. <span>Builder by practice.</span></motion.div></motion.div>
    </section>
    <section className="values-section"><SectionTitle eyebrow="WHAT DRIVES ME" number="02" title="A few things I" accent="value." /><div className="value-grid"><Value icon={Code2} number="01" title="Building to learn" text="I learn best when I can apply an idea, test it and understand what happens under the hood." /><Value icon={BrainCircuit} number="02" title="Thinking in systems" text="I like connecting the dots between data, logic, software architecture and user experience." /><Value icon={Zap} number="03" title="Staying adaptable" text="Tools change quickly. Strong fundamentals and the willingness to keep learning matter most." /></div></section>
    <section className="about-bottom"><div><Eyebrow>OUTSIDE THE CODE</Eyebrow><h2>Always exploring<br /><span>what's next.</span></h2></div><div className="interest-tags"><span>Machine Learning</span><span>Developer Tools</span><span>Product Design</span><span>Automation</span><span>Problem Solving</span><span>Open Source</span></div></section>
  </div>;
}

function Value({ icon: Icon, number, title, text }) { return <motion.article className="value-card" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}><div className="value-top"><Icon size={21} /><span>{number}</span></div><h3>{title}</h3><p>{text}</p></motion.article>; }

function PageHeading({ number, eyebrow, title, accent, description }) { return <div className="page-heading"><Eyebrow number={number}>{eyebrow}</Eyebrow><h1>{title}<br /><span>{accent}</span></h1>{description && <p>{description}</p>}</div>; }

function Projects() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const filters = ['All', 'AI / ML', 'Web', 'Data'];
  const filtered = projects.filter(p => (filter === 'All' || p.category === filter) && `${p.title} ${p.description} ${p.stack.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="page-shell shell"><PageHeading number="02" eyebrow="THE WORKBENCH" title="Projects &" accent="experiments." description="A growing collection of academic projects, practical builds and technical explorations." />
    <div className="project-toolbar"><div className="filter-tabs">{filters.map(f => <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'filter active' : 'filter'}>{f}</button>)}</div><label className="search-box"><Command size={15} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a project..." aria-label="Search projects" /><span>⌕</span></label></div>
    <div className="all-projects-grid">{filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}</div>
    {filtered.length === 0 && <div className="empty-state"><Sparkles size={22} /><h3>No matching projects</h3><p>Try another search or category.</p><button className="text-link" onClick={() => { setFilter('All'); setQuery(''); }}>Clear filters <ArrowRight size={15} /></button></div>}
    <div className="github-callout"><div className="github-mark"><Github size={25} /></div><div><h3>More code lives on GitHub.</h3><p>Explore repositories, experiments and ongoing work.</p></div><a href={GITHUB} target="_blank" rel="noreferrer" className="button button-outline">Visit GitHub <ExternalLink size={15} /></a></div>
  </div>;
}

function Journey() {
  const timeline = [
    { date: '2024 — 2028', label: 'EDUCATION', title: 'BS Computer Science', place: 'Sukkur IBA University · Sindh, Pakistan', text: 'Pursuing an undergraduate degree in Computer Science, developing foundations in programming, algorithms, databases, software engineering and machine learning.', icon: GraduationCap },
    { date: 'ACADEMIC PROJECTS', label: 'PROJECT WORK', title: 'Exploring Machine Learning', place: 'Independent & academic projects', text: 'Worked on classification, regression and clustering projects — from preparing datasets and training models to evaluating results and building simple interfaces.', icon: BrainCircuit },
    { date: 'ONGOING', label: 'DEVELOPMENT', title: 'Building practical software', place: 'Learning through implementation', text: 'Exploring backend development, databases, automation and the details that turn a technical idea into a usable application.', icon: Code2 }
  ];
  return <div className="page-shell shell"><PageHeading number="03" eyebrow="THE ROAD SO FAR" title="Learning is a" accent="continuous process." description="A snapshot of my academic path, projects and the skills I'm working to develop." />
    <section className="journey-layout"><div className="timeline-intro"><Eyebrow>MY TIMELINE</Eyebrow><h2>Progress over<br /><span>perfection.</span></h2><p>I'm focused on building strong fundamentals while staying open to new technologies and opportunities.</p><div className="timeline-note"><span className="note-icon"><MousePointer2 size={16} /></span><span>Every milestone starts with a question.</span></div></div><div className="timeline">{timeline.map((item, i) => { const Icon = item.icon; return <motion.article className="timeline-item" key={item.title} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }}><div className="timeline-rail"><span className="timeline-node"><Icon size={17} /></span></div><div className="timeline-content"><div className="timeline-meta"><span>{item.label}</span><time>{item.date}</time></div><h3>{item.title}</h3><div className="timeline-place">{item.place}</div><p>{item.text}</p></div></motion.article>; })}</div></section>
    <section className="learning-panel"><div><Eyebrow>WHAT I'M FOCUSED ON</Eyebrow><h2>Deepening the<br /><span>fundamentals.</span></h2></div><div className="learning-list"><span><i /> Data structures & algorithms</span><span><i /> Software engineering practices</span><span><i /> Machine learning workflows</span><span><i /> Full-stack application development</span></div></section>
  </div>;
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const update = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => { e.preventDefault(); const body = `Hi Farukh,\n\n${form.message}\n\nRegards,\n${form.name}\n${form.email}`; window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject || 'Hello Farukh')}&body=${encodeURIComponent(body)}`; };
  return <div className="page-shell shell"><PageHeading number="04" eyebrow="START A CONVERSATION" title="Have an idea?" accent="Let's connect." description="Whether it's a project, an opportunity, a collaboration or just a thoughtful conversation — my inbox is open." />
    <section className="contact-layout"><div className="contact-info"><div className="contact-info-card"><span className="contact-icon"><Mail size={20} /></span><span className="contact-label">SEND AN EMAIL</span><a href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={15} /></a></div><div className="contact-info-card"><span className="contact-icon"><Github size={20} /></span><span className="contact-label">FIND ME ON GITHUB</span><a href={GITHUB} target="_blank" rel="noreferrer">github.com/TheSFS<ArrowUpRight size={15} /></a></div><div className="contact-note"><div className="note-pulse" /><div><b>Open to opportunities</b><p>Internships, collaborations and projects where I can learn, contribute and grow.</p></div></div><div className="contact-decoration">LET'S MAKE<br /><span>IT HAPPEN.</span></div></div>
      <motion.form className="contact-form" onSubmit={submit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="form-heading"><span>01 / YOUR MESSAGE</span><MessageCircle size={19} /></div><label>Your name<input name="name" value={form.name} onChange={update} placeholder="What should I call you?" required /></label><label>Email address<input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" required /></label><label>Subject<input name="subject" value={form.subject} onChange={update} placeholder="What's this about?" /></label><label>Message<textarea name="message" value={form.message} onChange={update} placeholder="Tell me a little about it..." rows="5" required /></label><button className="button button-primary form-submit" type="submit">Prepare email <Send size={16} /></button><p className="form-hint">This opens your email app with your message ready to send.</p></motion.form>
    </section>
  </div>;
}

function NotFound() { return <div className="not-found shell"><span>404 / LOST IN SPACE</span><h1>This page took<br /><b>a wrong turn.</b></h1><Link to="/" className="button button-primary">Back home <ArrowUpRight size={16} /></Link></div>; }

function App() { return <BrowserRouter><Layout /></BrowserRouter>; }

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
