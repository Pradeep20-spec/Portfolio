import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education() {
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
    <section id="education" className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-500 mb-3">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Education
          </h2>
          <div className="mt-3 w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className={`relative transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Timeline line */}
            <div className="absolute left-6 top-14 bottom-0 w-px bg-gradient-to-b from-teal-400 to-transparent dark:from-teal-600" />

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/25 z-10">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Bachelor of Engineering — Computer Science
                    </h3>
                    <p className="text-teal-600 dark:text-teal-400 font-medium mt-0.5">
                      SRM Ramapuram · Chennai, Tamil Nadu
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-semibold border border-teal-200 dark:border-teal-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    In Progress
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    2023 — 2027 (Expected)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Chennai, Tamil Nadu
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                  Pursuing a four-year undergraduate program with a focus on core computer science
                  fundamentals including Data Structures, Algorithms, Object-Oriented Programming,
                  Database Management Systems, and emerging fields in Artificial Intelligence and
                  Machine Learning.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'AI / ML'].map((subject) => (
                    <span
                      key={subject}
                      className="px-2.5 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
