import React, { useState, useEffect, useRef } from 'react';
import { ProjectItem, WritingItem, ViewMode, CodeCategory } from '../types';
import { PROJECTS_DATA, WRITING_DATA, PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import {
  BookOpen,
  Code,
  Feather,
  ArrowRight,
  Clock,
  Star,
  Terminal,
  Sparkles,
  User,
  Database,
  ExternalLink,
  GraduationCap,
  Award,
  FileText,
  Compass,
  Filter,
  Ticket,
  Layout,
  Layers,
  ChevronDown,
  Cpu,
  Flame,
  Globe
} from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import { ParallaxWrapper, ParallaxCard, ParallaxBanner, ParallaxHeader } from './Parallax';
import { InteractiveSqlSandbox } from './InteractiveSqlSandbox';
import { InteractivePythonConsole } from './InteractivePythonConsole';
import { InteractiveMemoryTicketing } from './InteractiveMemoryTicketing';
import { InteractivePomodoroTimer } from './InteractivePomodoroTimer';
import { InteractiveNotionClone } from './InteractiveNotionClone';

interface FrontPageProps {
  onSelectProject: (project: ProjectItem) => void;
  onSelectWriting: (writing: WritingItem) => void;
  onSelectView: (view: ViewMode) => void;
  fontSize: 'sm' | 'base' | 'lg';
}

type SpectrumFilter = 'all' | 'code' | 'writing' | 'sandbox';

export const FrontPage: React.FC<FrontPageProps> = ({
  onSelectProject,
  onSelectWriting,
  onSelectView,
  fontSize
}) => {
  const [activeFilter, setActiveFilter] = useState<SpectrumFilter>('all');
  const [activePlayground, setActivePlayground] = useState<'sql' | 'ticketing' | 'pomodoro' | 'notion' | 'python'>('sql');
  const [selectedCodeCategory, setSelectedCodeCategory] = useState<CodeCategory>('All');
  const [writingCategoryFilter, setWritingCategoryFilter] = useState<string>('All');
  const [activeSpectrumZone, setActiveSpectrumZone] = useState<string>('Convergence');

  const convergenceRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const sandboxRef = useRef<HTMLDivElement>(null);
  const writingRef = useRef<HTMLDivElement>(null);

  // Monitor scroll to update sticky spectrum indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      if (writingRef.current && scrollPos >= writingRef.current.offsetTop) {
        setActiveSpectrumZone('Literary Spectrum');
      } else if (sandboxRef.current && scrollPos >= sandboxRef.current.offsetTop) {
        setActiveSpectrumZone('Live Systems Lab');
      } else if (codeRef.current && scrollPos >= codeRef.current.offsetTop) {
        setActiveSpectrumZone('Logical Spectrum');
      } else {
        setActiveSpectrumZone('Convergence');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAnchor = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const codeCategories: CodeCategory[] = ['All', 'Database / SQL', 'Web Development', 'Python / Console'];
  const writingCategories = ['All', 'Poem', 'Essay', 'Article', 'Opinion'];

  // Filtered code projects
  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    return selectedCodeCategory === 'All' || proj.category === selectedCodeCategory;
  });

  // Filtered writing works
  const filteredWritings = WRITING_DATA.filter((item) => {
    if (writingCategoryFilter === 'All') return true;
    return item.category.toLowerCase().includes(writingCategoryFilter.toLowerCase());
  });

  // Interleaved items for the Convergence Stream
  const combinedStream = React.useMemo(() => {
    const stream: Array<{ type: 'project' | 'writing'; data: any; dateSort: string }> = [];
    PROJECTS_DATA.forEach((p) => stream.push({ type: 'project', data: p, dateSort: p.date }));
    WRITING_DATA.forEach((w) => stream.push({ type: 'writing', data: w, dateSort: w.date }));
    
    // Stagger interleave
    const result: Array<{ type: 'project' | 'writing'; data: any }> = [];
    let pIdx = 0;
    let wIdx = 0;
    while (pIdx < PROJECTS_DATA.length || wIdx < WRITING_DATA.length) {
      if (pIdx < PROJECTS_DATA.length) {
        result.push({ type: 'project', data: PROJECTS_DATA[pIdx] });
        pIdx++;
      }
      if (wIdx < WRITING_DATA.length) {
        result.push({ type: 'writing', data: WRITING_DATA[wIdx] });
        wIdx++;
      }
    }
    return result;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-12 relative">
      {/* STICKY SPECTRUM PROGRESS INDICATOR */}
      <div className="sticky top-16 z-30 flex justify-center pointer-events-none mb-4">
        <div className="pointer-events-auto bg-[#800020] text-[#FAF6F0] px-4 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-lg text-[11px] font-mono-code font-bold flex items-center gap-3 backdrop-blur-md transition-all">
          <span className="flex items-center gap-1 text-[#D4AF37]">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            SPECTRUM ZONE:
          </span>
          <span className="text-[#FAF6F0] uppercase tracking-wider">{activeSpectrumZone}</span>
          <div className="flex items-center gap-1 border-l border-[#D4AF37]/30 pl-2">
            <button
              onClick={() => scrollToAnchor(convergenceRef)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                activeSpectrumZone === 'Convergence' ? 'bg-[#D4AF37] scale-125' : 'bg-[#FAF6F0]/40'
              }`}
              title="Jump to Convergence Stream"
            />
            <button
              onClick={() => scrollToAnchor(codeRef)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                activeSpectrumZone === 'Logical Spectrum' ? 'bg-[#D4AF37] scale-125' : 'bg-[#FAF6F0]/40'
              }`}
              title="Jump to Logical Code Spectrum"
            />
            <button
              onClick={() => scrollToAnchor(sandboxRef)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                activeSpectrumZone === 'Live Systems Lab' ? 'bg-[#D4AF37] scale-125' : 'bg-[#FAF6F0]/40'
              }`}
              title="Jump to Systems Lab"
            />
            <button
              onClick={() => scrollToAnchor(writingRef)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                activeSpectrumZone === 'Literary Spectrum' ? 'bg-[#D4AF37] scale-125' : 'bg-[#FAF6F0]/40'
              }`}
              title="Jump to Literary Writing Spectrum"
            />
          </div>
        </div>
      </div>

      {/* DUAL SPECTRUM HERO & CONVERGENCE HEADER */}
      <ParallaxBanner className="bg-[#FAF6F0] border-2 border-[#800020] rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Subtle background decorative spectrum grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#800020] text-[#D4AF37] text-xs font-mono-code font-bold px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> DUAL-SPECTRUM ARCHITECTURE PORTFOLIO
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#800020] tracking-tight leading-tight">
            Where Code &amp; Prose Converge
          </h1>

          <p className="font-serif-body text-sm sm:text-base text-[#1C1618] leading-relaxed max-w-2xl mx-auto">
            Explore the dual creative mind of <strong>Karl David Z. Ocfemia</strong> — Computer Science scholar at Bicol University Polangui and Literary Editor at <em>The Inditers</em>. Where structured logical systems meet expressive literary prose.
          </p>

          {/* DUAL SPECTRUM NAVIGATOR BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => {
                setActiveFilter('all');
                scrollToAnchor(convergenceRef);
              }}
              className={`px-4 py-2 rounded-lg font-sans-ui text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                activeFilter === 'all'
                  ? 'bg-[#800020] text-[#FAF6F0] border border-[#D4AF37]'
                  : 'bg-[#F2EBE1] text-[#1C1618] hover:bg-[#800020] hover:text-[#FAF6F0]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>Full Convergence Stream</span>
            </button>

            <button
              onClick={() => {
                setActiveFilter('code');
                scrollToAnchor(codeRef);
              }}
              className={`px-4 py-2 rounded-lg font-sans-ui text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                activeFilter === 'code'
                  ? 'bg-[#800020] text-[#FAF6F0] border border-[#D4AF37]'
                  : 'bg-[#F2EBE1] text-[#1C1618] hover:bg-[#800020] hover:text-[#FAF6F0]'
              }`}
            >
              <Code className="w-4 h-4 text-[#D4AF37]" />
              <span>Logical Spectrum (Software)</span>
            </button>

            <button
              onClick={() => {
                setActiveFilter('writing');
                scrollToAnchor(writingRef);
              }}
              className={`px-4 py-2 rounded-lg font-sans-ui text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                activeFilter === 'writing'
                  ? 'bg-[#800020] text-[#FAF6F0] border border-[#D4AF37]'
                  : 'bg-[#F2EBE1] text-[#1C1618] hover:bg-[#800020] hover:text-[#FAF6F0]'
              }`}
            >
              <Feather className="w-4 h-4 text-[#D4AF37]" />
              <span>Literary Spectrum (Writing)</span>
            </button>

            <button
              onClick={() => {
                setActiveFilter('sandbox');
                scrollToAnchor(sandboxRef);
              }}
              className={`px-4 py-2 rounded-lg font-sans-ui text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                activeFilter === 'sandbox'
                  ? 'bg-[#800020] text-[#FAF6F0] border border-[#D4AF37]'
                  : 'bg-[#F2EBE1] text-[#1C1618] hover:bg-[#800020] hover:text-[#FAF6F0]'
              }`}
            >
              <Terminal className="w-4 h-4 text-[#D4AF37]" />
              <span>Live Systems Lab</span>
            </button>
          </div>
        </div>
      </ParallaxBanner>

      {/* MAIN LAYOUT GRID (8 Cols Content + 4 Cols Profile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT / MAIN COLUMN */}
        <div className="lg:col-span-8 space-y-16">

          {/* SECTION 1: CONVERGENCE STREAM (INTERLEAVED SHOWCASE) */}
          <div ref={convergenceRef} className="scroll-mt-28 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#800020] pb-3">
              <div>
                <span className="text-xs font-mono-code text-[#800020] uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#800020]" /> Stream Phase 01
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-black text-[#800020]">
                  The Convergence Stream
                </h2>
              </div>
              <span className="text-xs font-serif-body italic text-[#574B4E] hidden sm:inline">
                Interleaved Logic &amp; Prose
              </span>
            </div>

            <p className="font-serif-body text-xs sm:text-sm text-[#1C1618] leading-relaxed">
              As you scroll through this stream, observe how software engineering projects (Database, Python, Web) and published literary works (Poetry, Essays, Opinion) flow along a single creative axis.
            </p>

            {/* STAGGERED STREAM CONTAINER */}
            <div className="relative space-y-6 before:absolute before:inset-0 before:left-6 sm:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-[#800020]/20 pointer-events-none [&>*]:pointer-events-auto">
              {combinedStream.slice(0, 6).map((item, idx) => {
                const isProject = item.type === 'project';
                const data = item.data;

                return (
                  <ParallaxCard
                    key={`${item.type}-${data.id}`}
                    delayIndex={idx}
                    className="relative z-10"
                  >
                    {isProject ? (
                      /* CODE PROJECT CARD */
                      <div
                        onClick={() => onSelectProject(data)}
                        className="bg-[#FAF6F0] border-2 border-[#800020] rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:border-[#800020] transition-all cursor-pointer group bg-gradient-to-br from-[#FAF6F0] via-[#FAF6F0] to-[#F2EBE1]"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#800020]/20">
                          <span className="bg-[#800020] text-[#D4AF37] font-mono-code text-[10px] font-bold px-2.5 py-0.5 rounded uppercase flex items-center gap-1">
                            <Code className="w-3 h-3 text-[#D4AF37]" /> LOGIC • {data.category}
                          </span>
                          <span className="text-[11px] font-mono-code text-[#574B4E] font-semibold">{data.date}</span>
                        </div>

                        <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#800020] group-hover:text-[#5A0017] transition-colors mb-1">
                          {data.title}
                        </h3>

                        <p className="font-serif-body italic text-xs text-[#574B4E] mb-3">
                          {data.subtitle}
                        </p>

                        <p className="font-serif-body text-xs text-[#1C1618] leading-relaxed mb-4 line-clamp-2">
                          {data.summary}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#800020]/15">
                          <div className="flex flex-wrap gap-1">
                            {data.tags.slice(0, 3).map((tag: string, tIdx: number) => (
                              <span key={tIdx} className="text-[10px] font-mono-code bg-[#F2EBE1] text-[#800020] px-2 py-0.5 rounded border border-[#E2D7C7]">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <button className="text-xs font-sans-ui font-bold text-[#800020] group-hover:underline flex items-center gap-1">
                            Explore Technical Specs <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* LITERARY WRITING CARD */
                      <div
                        onClick={() => onSelectWriting(data)}
                        className="bg-[#FAF6F0] border-2 border-[#D4AF37] rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:border-[#800020] transition-all cursor-pointer group bg-gradient-to-br from-[#FAF6F0] via-[#FAF6F0] to-[#FAF3E0]"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#D4AF37]/30">
                          <span className="bg-[#FAF6F0] text-[#800020] border border-[#800020] font-mono-code text-[10px] font-bold px-2.5 py-0.5 rounded uppercase flex items-center gap-1">
                            <Feather className="w-3 h-3 text-[#800020]" /> LYRICISM • {data.category}
                          </span>
                          <span className="text-[11px] font-mono-code text-[#574B4E] font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#800020]" /> {data.readTime}
                          </span>
                        </div>

                        <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1C1618] group-hover:text-[#800020] transition-colors mb-1">
                          {data.title}
                        </h3>

                        <p className="font-serif-body italic text-xs text-[#574B4E] mb-3">
                          {data.publication}
                        </p>

                        <blockquote className="p-3 bg-[#F2EBE1] border-l-2 border-[#800020] font-serif-body italic text-xs text-[#1C1618] mb-4">
                          &ldquo;{data.leadQuote}&rdquo;
                        </blockquote>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#D4AF37]/30">
                          <span className="text-[11px] font-mono-code text-[#800020] font-bold">
                            Published in The Inditers
                          </span>

                          <button className="text-xs font-sans-ui font-bold text-[#800020] group-hover:underline flex items-center gap-1">
                            Read Full Text <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                          </button>
                        </div>
                      </div>
                    )}
                  </ParallaxCard>
                );
              })}
            </div>
          </div>

          {/* CONCEPTUAL DIVERGENCE PRISM MATRIX */}
          <ParallaxWrapper speed={0.1}>
            <section className="bg-[#FAF6F0] border-2 border-[#800020] rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
              <div className="border-b border-[#800020]/20 pb-4 mb-6 text-center">
                <span className="text-xs font-mono-code text-[#800020] uppercase font-bold tracking-widest">
                  SPECTRUM ARCHITECTURE
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#800020] mt-1">
                  How My Skill Sets Meet &amp; Diverge
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans-ui">
                {/* Left Spectrum */}
                <div className="bg-[#F2EBE1] p-5 rounded-xl border border-[#E2D7C7] space-y-3">
                  <div className="flex items-center gap-2 text-[#800020] font-bold text-sm border-b border-[#800020]/20 pb-2">
                    <Code className="w-4 h-4 text-[#800020]" />
                    <span>Logical Spectrum (Code)</span>
                  </div>
                  <ul className="space-y-2 text-[#1C1618]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#800020] font-bold">•</span>
                      <span>3NF Relational Database Schemas &amp; SQL Query Optimization</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#800020] font-bold">•</span>
                      <span>Object-Oriented Python Software &amp; Console Interfaces</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#800020] font-bold">•</span>
                      <span>Optimistic Concurrency Seat Locks &amp; Web Systems</span>
                    </li>
                  </ul>
                </div>

                {/* Center Prism */}
                <div className="bg-[#800020] text-[#FAF6F0] p-5 rounded-xl border-2 border-[#D4AF37] space-y-3 text-center flex flex-col justify-center">
                  <span className="text-[10px] font-mono-code text-[#D4AF37] uppercase font-bold tracking-wider">
                    THE CONVERGENCE PRISM
                  </span>
                  <h4 className="font-serif-display text-lg font-bold text-[#FAF6F0]">
                    Systematic Logic + Humanist Prose
                  </h4>
                  <p className="font-serif-body text-[11px] text-[#FAF6F0]/90 italic leading-relaxed">
                    &ldquo;Code gives structure to data; literature gives meaning to human experience.&rdquo;
                  </p>
                </div>

                {/* Right Spectrum */}
                <div className="bg-[#F2EBE1] p-5 rounded-xl border border-[#E2D7C7] space-y-3">
                  <div className="flex items-center gap-2 text-[#800020] font-bold text-sm border-b border-[#800020]/20 pb-2">
                    <Feather className="w-4 h-4 text-[#800020]" />
                    <span>Literary Spectrum (Prose)</span>
                  </div>
                  <ul className="space-y-2 text-[#1C1618]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#800020] font-bold">•</span>
                      <span>Literary Editor @ The Inditers Student Publication</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#800020] font-bold">•</span>
                      <span>Socio-Political Essays &amp; Cultural Commentary</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#800020] font-bold">•</span>
                      <span>Filipino Poetry, News Features &amp; Public Relations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </ParallaxWrapper>

          {/* SECTION 2: SOFTWARE ENGINEERING SPECTRUM */}
          <div ref={codeRef} className="scroll-mt-28 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#800020] pb-3">
              <div>
                <span className="text-xs font-mono-code text-[#800020] uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-[#800020]" /> Stream Phase 02
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-black text-[#800020]">
                  Software Engineering Projects
                </h2>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#F2EBE1] p-1 rounded-lg border border-[#E2D7C7]">
                {codeCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCodeCategory(cat)}
                    className={`text-[11px] font-sans-ui font-bold px-2.5 py-1 rounded transition-all cursor-pointer ${
                      selectedCodeCategory === cat
                        ? 'bg-[#800020] text-[#FAF6F0]'
                        : 'text-[#1C1618] hover:text-[#800020]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProjects.map((project, idx) => (
                <ParallaxCard
                  key={project.id}
                  delayIndex={idx}
                  onClick={() => onSelectProject(project)}
                  className="bg-[#FAF6F0] border border-[#E2D7C7] hover:border-[#800020] rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                      <span className="bg-[#800020] text-[#D4AF37] px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        {project.category}
                      </span>
                      <span className="text-[#574B4E]">{project.date}</span>
                    </div>

                    <h3 className="font-serif-display text-xl font-bold text-[#1C1618] group-hover:text-[#800020] transition-colors mb-1">
                      {project.title}
                    </h3>

                    <p className="font-serif-body text-xs text-[#574B4E] leading-relaxed mb-3 line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2D7C7] flex items-center justify-between">
                    <span className="text-[10px] font-mono-code text-[#800020]">
                      {project.tags[0]}
                    </span>
                    <span className="text-xs font-sans-ui font-bold text-[#800020] group-hover:underline flex items-center gap-1">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </ParallaxCard>
              ))}
            </div>
          </div>

          {/* SECTION 3: LIVE SYSTEMS & INTERACTIVE LAB */}
          <div ref={sandboxRef} className="scroll-mt-28 space-y-6">
            <ParallaxWrapper speed={0.1}>
              <section className="bg-[#2B080D] text-[#FAF6F0] p-6 sm:p-8 rounded-2xl border-2 border-[#800020] shadow-2xl">
                <div className="border-b border-[#800020] pb-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono-code text-[#D4AF37] uppercase font-bold tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" /> LIVE INTERACTIVE DEMOS
                    </span>
                    <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF6F0] mt-1">
                      Interactive Systems &amp; Software Lab
                    </h2>
                  </div>

                  {/* Sandbox Selectors */}
                  <div className="flex flex-wrap items-center gap-1.5 bg-[#1C0508] p-1.5 rounded-lg border border-[#800020]">
                    <button
                      onClick={() => setActivePlayground('sql')}
                      className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                        activePlayground === 'sql' ? 'bg-[#800020] text-[#D4AF37]' : 'text-[#E2D7C7]/70 hover:text-white'
                      }`}
                    >
                      <Database className="w-3.5 h-3.5" /> SQL Sandbox
                    </button>
                    <button
                      onClick={() => setActivePlayground('ticketing')}
                      className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                        activePlayground === 'ticketing' ? 'bg-[#800020] text-[#D4AF37]' : 'text-[#E2D7C7]/70 hover:text-white'
                      }`}
                    >
                      <Ticket className="w-3.5 h-3.5" /> Event Ticketing
                    </button>
                    <button
                      onClick={() => setActivePlayground('pomodoro')}
                      className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                        activePlayground === 'pomodoro' ? 'bg-[#800020] text-[#D4AF37]' : 'text-[#E2D7C7]/70 hover:text-white'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" /> Pomodoro
                    </button>
                    <button
                      onClick={() => setActivePlayground('notion')}
                      className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                        activePlayground === 'notion' ? 'bg-[#800020] text-[#D4AF37]' : 'text-[#E2D7C7]/70 hover:text-white'
                      }`}
                    >
                      <Layout className="w-3.5 h-3.5" /> Workspace
                    </button>
                    <button
                      onClick={() => setActivePlayground('python')}
                      className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                        activePlayground === 'python' ? 'bg-[#800020] text-[#D4AF37]' : 'text-[#E2D7C7]/70 hover:text-white'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" /> Python Console
                    </button>
                  </div>
                </div>

                {activePlayground === 'sql' && <InteractiveSqlSandbox />}
                {activePlayground === 'ticketing' && <InteractiveMemoryTicketing />}
                {activePlayground === 'pomodoro' && <InteractivePomodoroTimer />}
                {activePlayground === 'notion' && <InteractiveNotionClone />}
                {activePlayground === 'python' && <InteractivePythonConsole />}
              </section>
            </ParallaxWrapper>
          </div>

          {/* SECTION 4: LITERARY WRITING SPECTRUM */}
          <div ref={writingRef} className="scroll-mt-28 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#800020] pb-3">
              <div>
                <span className="text-xs font-mono-code text-[#800020] uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <Feather className="w-4 h-4 text-[#800020]" /> Stream Phase 03
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-black text-[#800020]">
                  Literary Works &amp; Publications
                </h2>
              </div>

              {/* Writing Category Filters */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#F2EBE1] p-1 rounded-lg border border-[#E2D7C7]">
                {writingCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setWritingCategoryFilter(cat)}
                    className={`text-[11px] font-sans-ui font-bold px-2.5 py-1 rounded transition-all cursor-pointer ${
                      writingCategoryFilter === cat
                        ? 'bg-[#800020] text-[#FAF6F0]'
                        : 'text-[#1C1618] hover:text-[#800020]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredWritings.map((writing, idx) => (
                <ParallaxCard
                  key={writing.id}
                  delayIndex={idx}
                  onClick={() => onSelectWriting(writing)}
                  className="bg-[#FAF6F0] border border-[#E2D7C7] hover:border-[#800020] rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="flex items-center gap-4">
                    {writing.imageUrl ? (
                      <img
                        src={writing.imageUrl}
                        alt={writing.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className="w-14 h-14 object-cover rounded border border-[#800020]/30 shrink-0 hidden sm:block shadow-xs"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-[#F2EBE1] border border-[#800020]/30 text-[#800020] flex items-center justify-center shrink-0 hidden sm:flex">
                        <Feather className="w-5 h-5 text-[#800020]" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-sans-ui text-[#800020] mb-1">
                        <span className="bg-[#800020] text-[#FAF6F0] px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                          {writing.category}
                        </span>
                        <span>•</span>
                        <span>{writing.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {writing.readTime}</span>
                      </div>
                      <h3 className="font-serif-display text-lg font-bold text-[#1C1618] group-hover:text-[#800020] transition-colors">
                        {writing.title}
                      </h3>
                      <p className="font-serif-body italic text-xs text-[#574B4E] mt-0.5 line-clamp-1">
                        &ldquo;{writing.leadQuote}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {writing.facebookUrl && (
                      <a
                        href={writing.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-sans-ui font-bold bg-[#1877F2] text-white hover:bg-[#0d65d9] px-2.5 py-1.5 rounded transition-colors flex items-center gap-1 shadow-xs"
                      >
                        Facebook Post
                      </a>
                    )}
                    <span className="text-xs font-sans-ui font-bold text-[#800020] bg-[#F2EBE1] group-hover:bg-[#800020] group-hover:text-[#FAF6F0] px-3 py-1.5 rounded transition-all whitespace-nowrap">
                      Read
                    </span>
                  </div>
                </ParallaxCard>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR COLUMN */}
        <ParallaxWrapper className="lg:col-span-4 space-y-8" speed={0.1}>
          {/* PROFILE SUMMARY CARD */}
          <div className="bg-[#FAF6F0] border-2 border-[#800020] rounded-xl p-6 shadow-xs sticky top-24">
            <div className="mb-4 p-5 rounded-lg border-2 border-[#800020] shadow-md bg-[#800020] text-[#FAF6F0] flex flex-col items-center text-center relative overflow-hidden">
              <span className="dna-token-badge-dark text-[10px] mb-2">
                BU Polangui • CS Scholar
              </span>
              <h3 className="font-serif-display text-lg font-bold text-[#FAF6F0] leading-tight">
                Karl David Z. Ocfemia
              </h3>
              <p className="font-serif-body text-xs text-[#D4AF37] italic mt-0.5">
                BS Computer Science • Literary Editor
              </p>
            </div>

            <p className="font-serif-body text-xs text-[#1C1618] leading-relaxed mb-4">
              Computer Science student at Bicol University Polangui &amp; Literary Editor of <em>The Inditers</em>. Specialized in relational database architecture, Python applications, and editorial writing.
            </p>

            <div className="bg-[#F2EBE1] p-3 rounded text-xs font-sans-ui text-[#1C1618] space-y-1.5 mb-4 border border-[#E2D7C7]">
              <p>📍 Polangui, Albay, Philippines</p>
              <p>🎓 BS Computer Science (BU Polangui)</p>
              <p>📊 ABM Honor Graduate</p>
              <p>✍️ Literary Editor @ The Inditers</p>
            </div>

            <button
              onClick={() => onSelectView('about')}
              className="w-full bg-[#800020] hover:bg-[#4A0E17] text-[#FAF6F0] text-xs font-sans-ui font-bold py-2 rounded shadow text-center cursor-pointer transition-colors mb-4 flex items-center justify-center gap-1.5"
            >
              <span>Read Full Biography &amp; Profile</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>

            {/* Quick Navigation Anchor Links */}
            <div className="border-t border-[#800020]/20 pt-4 space-y-2">
              <span className="text-[10px] font-sans-ui text-[#800020] uppercase font-bold tracking-wider block mb-1">
                Quick Spectrum Jump
              </span>

              <button
                onClick={() => scrollToAnchor(convergenceRef)}
                className="w-full text-left text-xs font-sans-ui font-semibold text-[#1C1618] hover:text-[#800020] bg-[#F2EBE1] p-2 rounded border border-[#E2D7C7] transition-all flex items-center justify-between"
              >
                <span>01. Convergence Stream</span>
                <Compass className="w-3.5 h-3.5 text-[#800020]" />
              </button>

              <button
                onClick={() => scrollToAnchor(codeRef)}
                className="w-full text-left text-xs font-sans-ui font-semibold text-[#1C1618] hover:text-[#800020] bg-[#F2EBE1] p-2 rounded border border-[#E2D7C7] transition-all flex items-center justify-between"
              >
                <span>02. Software Projects</span>
                <Code className="w-3.5 h-3.5 text-[#800020]" />
              </button>

              <button
                onClick={() => scrollToAnchor(sandboxRef)}
                className="w-full text-left text-xs font-sans-ui font-semibold text-[#1C1618] hover:text-[#800020] bg-[#F2EBE1] p-2 rounded border border-[#E2D7C7] transition-all flex items-center justify-between"
              >
                <span>03. Live Systems Lab</span>
                <Terminal className="w-3.5 h-3.5 text-[#800020]" />
              </button>

              <button
                onClick={() => scrollToAnchor(writingRef)}
                className="w-full text-left text-xs font-sans-ui font-semibold text-[#1C1618] hover:text-[#800020] bg-[#F2EBE1] p-2 rounded border border-[#E2D7C7] transition-all flex items-center justify-between"
              >
                <span>04. Literary Publications</span>
                <Feather className="w-3.5 h-3.5 text-[#800020]" />
              </button>
            </div>

            {/* Social Links */}
            <div className="border-t border-[#800020]/20 pt-4 mt-4">
              <span className="text-[10px] font-sans-ui text-[#800020] uppercase font-bold tracking-wider block mb-2">
                Connect On Socials
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={SOCIAL_LINKS[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="p-2 rounded bg-[#F2EBE1] border border-[#E2D7C7] hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all cursor-pointer flex-1 flex justify-center items-center"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={SOCIAL_LINKS[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="p-2 rounded bg-[#F2EBE1] border border-[#E2D7C7] hover:bg-[#E4405F] text-[#E4405F] hover:text-white transition-all cursor-pointer flex-1 flex justify-center items-center"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </ParallaxWrapper>
      </div>
    </div>
  );
};

