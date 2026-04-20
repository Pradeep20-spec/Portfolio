import { useEffect, useRef, useState } from 'react';
import { Award, Mic, Wrench } from 'lucide-react';

const achievementGroups = [
  {
    icon: Award,
    label: 'Certifications',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    items: [
      {
        title: 'Certificate of Internship - Web Development',
        issuer: 'CodeBind Technologies, Chennai',
        date: 'Dec 2024',
        description: 'Certificate Number: CBTINC162005241207. Awarded to PRADEEP.J for successful completion of a Web Development internship from 16 Dec 2024 to 20 Dec 2024. Recognized for an enthusiastic attitude for learning and dependable performance.',
      },
    ],
  },
  {
    icon: Mic,
    label: 'Paper Presentations',
    color: 'from-teal-500 to-cyan-500',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    border: 'border-teal-200 dark:border-teal-800',
    items: [
      {
        title: 'NCICT26-0010 - InterviewIQ: An AI-Based Mock Interview System with Interviewer Personality Simulation',
        issuer: '11th National Conference on Innovative Computing Techniques (NCICT \'26), Dr. M.G.R. Educational and Research Institute, Maduravoyal, Chennai - 95',
        date: '2026',
        description: 'Presented by J Pradeep, B.Tech Computer Science, SRM University. Presented on 08th and 09th April 2026. Proceedings ISBN: 978-93-49608-45-0. Certificate awarded for presenting the paper entitled InterviewIQ.',
      },
    ],
  },
  {
    icon: Wrench,
    label: 'Workshops & Events',
    color: 'from-sky-500 to-blue-500',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    border: 'border-sky-200 dark:border-sky-800',
    items: [
      {
        title: 'Ethical Hacking IT & OT',
        issuer: 'Developers Student Club · SRM IST Ramapuram',
        date: 'Feb 2025',
        description: 'Participated in a focused workshop on ethical hacking concepts across IT and OT environments, with emphasis on practical security awareness and responsible testing approaches.',
      },
    ],
  },
];

export default function Achievements() {
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
    <section id="achievements" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-500 mb-3">
            Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Achievements
          </h2>
          <div className="mt-3 w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievementGroups.map((group, gi) => {
            const Icon = group.icon;
            return (
              <div
                key={gi}
                className={`rounded-2xl border ${group.border} ${group.bg} overflow-hidden`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(2rem)',
                  transition: `opacity 0.6s ease ${gi * 150}ms, transform 0.6s ease ${gi * 150}ms`,
                }}
              >
                {/* Header */}
                <div className={`p-5 border-b ${group.border}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${group.color} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {group.label}
                    </h3>
                  </div>
                </div>

                {/* Items */}
                <div className="p-5 space-y-4">
                  {group.items.map((item, ii) => (
                    <div
                      key={ii}
                      className="p-4 rounded-xl bg-white/60 dark:bg-gray-900/60 border border-white dark:border-gray-700/50"
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                          {item.title}
                        </h4>
                        <span className="text-xs text-gray-400 flex-shrink-0">{item.date}</span>
                      </div>
                      <p className="text-xs font-medium text-teal-600 dark:text-teal-400 mb-2">
                        {item.issuer}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
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
