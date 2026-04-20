import { useEffect, useRef, useState } from 'react';
import { Terminal, Globe, Cpu, Wrench, Layers } from 'lucide-react';

const skillCategories = [
  {
    icon: Terminal,
    label: 'Programming',
    color: 'from-teal-500 to-emerald-500',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    border: 'border-teal-200 dark:border-teal-800',
    skills: [
      { name: 'C', level: 80 },
      { name: 'Python', level: 88 },
      { name: 'Java', level: 75 },
    ],
  },
  {
    icon: Globe,
    label: 'Web Technologies',
    color: 'from-sky-500 to-blue-500',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    border: 'border-sky-200 dark:border-sky-800',
    skills: [
      { name: 'HTML', level: 85 },
      { name: 'CSS', level: 80 },
      { name: 'JavaScript', level: 72 },
      { name: 'React', level: 78 },
    ],
  },
  {
    icon: Cpu,
    label: 'AI / ML',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    skills: [
      { name: 'NLP Basics', level: 70 },
      { name: 'Model Evaluation', level: 68 },
    ],
  },
  {
    icon: Wrench,
    label: 'Tools',
    color: 'from-rose-500 to-pink-500',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-200 dark:border-rose-800',
    skills: [
      { name: 'Git', level: 82 },
      { name: 'VS Code', level: 90 },
      { name: 'IntelliJ', level: 76 },
      { name: 'Vercel', level: 79 },
    ],
  },
  {
    icon: Layers,
    label: 'Core Concepts',
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-200 dark:border-violet-800',
    skills: [
      { name: 'Data Structures', level: 83 },
      { name: 'OOP', level: 86 },
      { name: 'DBMS', level: 75 },
    ],
  },
];

interface BarProps {
  name: string;
}

function SkillBar({ name }: BarProps) {
  return (
    <div className="px-3 py-2 rounded-lg bg-white/70 dark:bg-gray-900/70 border border-white dark:border-gray-700/50">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
    </div>
  );
}

export default function Skills() {
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
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-500 mb-3">
            What I Know
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Skills & Expertise
          </h2>
          <div className="mt-3 w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, ci) => {
            const Icon = cat.icon;
            return (
              <div
                key={ci}
                className={`p-6 rounded-2xl border ${cat.border} ${cat.bg} hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
                style={{
                  transitionDelay: `${ci * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(2rem)',
                  transition: `opacity 0.6s ease ${ci * 100}ms, transform 0.6s ease ${ci * 100}ms, box-shadow 0.3s ease, translate 0.3s ease`,
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-4.5 h-4.5 text-white w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {cat.label}
                  </h3>
                </div>
                <div className="space-y-3.5">
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={si}
                      name={skill.name}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
