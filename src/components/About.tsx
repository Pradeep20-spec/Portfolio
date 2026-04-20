import { useEffect, useRef, useState } from 'react';
import { Brain, Code, Lightbulb, Presentation } from 'lucide-react';

const highlights = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Deeply interested in Artificial Intelligence, exploring NLP, model evaluation, and intelligent system design as the future of software.',
  },
  {
    icon: Code,
    title: 'Software Development',
    description:
      'Proficient in Python, Java, and C, with hands-on experience building full-stack applications and applying OOP principles.',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving',
    description:
      'Passionate about deconstructing complex challenges and engineering efficient, elegant solutions using data structures and algorithms.',
  },
  {
    icon: Presentation,
    title: 'Academic Presentations',
    description:
      'Experienced in presenting technical projects and research at academic events, clearly communicating complex ideas to diverse audiences.',
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-500 mb-3">
              Who I Am
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              About Me
            </h2>
            <div className="mt-3 w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-5">
                I'm <span className="font-semibold text-gray-900 dark:text-white">J. Pradeep</span>,
                a Computer Science student with a deep fascination for Artificial Intelligence and
                its transformative potential. I believe technology should serve people — making
                systems smarter, workflows smoother, and lives better.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-5">
                My journey in software development spans multiple programming languages and
                paradigms, with a particular focus on building AI-powered applications. I thrive
                at the intersection of research and engineering, turning theoretical concepts
                into working, impactful software.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                Beyond coding, I actively participate in technical workshops and academic
                conferences where I've presented my projects to peers and faculty — sharpening
                both my communication and critical thinking skills.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-teal-500" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
