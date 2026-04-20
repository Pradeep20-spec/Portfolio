import { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const roles = [
  'Computer Science Student',
  'Full stack developer',
  'Software Developer',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 50 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, roleIndex]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl" />

      <div
        className={`relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-full px-4 py-1.5 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
          <span className="text-xs font-medium text-teal-600 dark:text-teal-400 tracking-wide uppercase">
            Open to opportunities
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
            J. Pradeep
          </span>
        </h1>

        <div className="text-xl sm:text-2xl font-mono text-gray-500 dark:text-gray-400 mb-6 h-8">
          <span className="text-teal-500">&gt;</span>{' '}
          <span>{displayed}</span>
          <span className="animate-pulse text-teal-500">|</span>
        </div>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Building intelligent systems at the intersection of AI and software engineering.
          Passionate about solving real-world problems through clean code,
          thoughtful design, and smart algorithms.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('#projects')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:border-teal-500 dark:hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 hover:-translate-y-0.5 transition-all duration-200"
          >
            Contact Me
          </button>
        </div>

        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollTo('#about')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-teal-500 transition-colors"
            aria-label="Scroll to about"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
