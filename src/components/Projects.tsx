import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Brain, Briefcase, ChevronDown } from 'lucide-react';

const projects = [
  {
    icon: Brain,
    title: 'InterviewIQ',
    subtitle: 'AI-Based Mock Interview System with Interviewer Personality Simulation',
    description:
      'An intelligent interview preparation platform that generates dynamic, role-specific questions and adapts to candidate responses in real time. The system evaluates communication clarity, answer correctness, and confidence, then delivers personalized feedback to help candidates improve systematically.',
    longDescription:
      'InterviewIQ leverages NLP techniques to analyze response quality across multiple dimensions — syntax, semantics, and confidence markers. Different interviewer personalities (technical, behavioral, stress-test) keep the experience realistic and challenging. The platform generates a detailed post-session report with improvement recommendations.',
    tech: ['Python', 'NLP', 'Machine Learning', 'Flask', 'JavaScript', 'HTML/CSS'],
    color: 'from-teal-500 to-cyan-500',
    featured: true,
    githubUrl: 'https://github.com/Pradeep20-spec/InterviewIQ',
    demoUrl: 'https://pradeep20-spec.github.io/InterviewIQ/',
  },
  {
    icon: Briefcase,
    title: 'The Design Agency Homepage',
    subtitle: 'Modern responsive website for Weboin Technologies',
    description:
      'The Design Agency Homepage for Weboin Technologies is a modern and responsive website built using Next.js and Tailwind CSS. It features a hero section, services, portfolio, and contact form in a clean and professional layout, demonstrating modern frontend design and user-friendly interface development.',
    longDescription:
      'This project highlights component-driven frontend development with reusable UI blocks, responsive spacing and typography, and a polished conversion-focused structure suitable for agency websites.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Responsive UI', 'Frontend Development'],
    color: 'from-sky-500 to-indigo-500',
    featured: false,
    githubUrl: 'https://github.com/Pradeep20-spec/Weboin',
    demoUrl: 'https://weboinapp.vercel.app/',
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  visible: boolean;
}

function ProjectCard({ project, index, visible }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = project.icon;

  return (
    <div
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 ${
        project.featured
          ? 'border-teal-200 dark:border-teal-800 bg-gradient-to-br from-teal-50/50 to-white dark:from-teal-900/10 dark:to-gray-900'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
      } hover:shadow-xl hover:-translate-y-1`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(2rem)',
        transition: `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms, box-shadow 0.3s ease, translate 0.3s ease`,
      }}
    >
      {project.featured && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
          Featured
        </div>
      )}

      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-5">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-md flex-shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
              {project.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
              {project.subtitle}
            </p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div
          className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
        >
          <p className="text-gray-500 dark:text-gray-500 text-sm leading-relaxed border-l-2 border-teal-400 pl-4 italic">
            {project.longDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r ${project.color} text-white text-sm font-medium hover:opacity-90 transition-opacity`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Demo
            </a>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-teal-500 hover:text-teal-600 font-medium transition-colors"
          >
            {expanded ? 'Less' : 'More'}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-500 mb-3">
            What I've Built
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Projects
          </h2>
          <div className="mt-3 w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
