import { useMemo } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { githubContributions } from '../data/githubContributions';

const DAYS = 7;

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type CalendarCell = {
  date: string;
  count: number;
  level: number;
  isReal: boolean;
};

const levelClasses = [
  'bg-gray-200 dark:bg-gray-800',
  'bg-emerald-200 dark:bg-emerald-900/80',
  'bg-emerald-300 dark:bg-emerald-700/80',
  'bg-emerald-400 dark:bg-emerald-600/90',
  'bg-emerald-500 dark:bg-emerald-500',
];

function dateToISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function getStartOfSundayWeek(date: Date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

export default function GithubStats() {
  const days = useMemo(
    () =>
      (githubContributions as ContributionDay[])
        .filter((item) => item?.date)
        .map((item) => ({
          date: item.date,
          count: Number(item.count) || 0,
          level: Math.max(0, Math.min(4, Number(item.level) || 0)),
        })),
    []
  );

  const { weeks, monthLabels } = useMemo(() => {
    if (!days.length) {
      return { weeks: [] as CalendarCell[][], monthLabels: [] as { label: string; week: number }[] };
    }

    const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
    const dayMap = new Map(sorted.map((d) => [d.date, d]));
    const firstRealDate = new Date(`${sorted[0].date}T00:00:00`);
    const lastRealDate = new Date(`${sorted[sorted.length - 1].date}T00:00:00`);
    const start = getStartOfSundayWeek(firstRealDate);

    const totalDays = Math.floor((lastRealDate.getTime() - start.getTime()) / 86400000) + 1;
    const totalWeeks = Math.ceil(totalDays / DAYS);

    const builtWeeks: CalendarCell[][] = Array.from({ length: totalWeeks }, (_, weekIndex) => {
      return Array.from({ length: DAYS }, (_, dayIndex) => {
        const date = addDays(start, weekIndex * DAYS + dayIndex);
        const iso = dateToISO(date);
        const real = dayMap.get(iso);

        return {
          date: iso,
          count: real?.count ?? 0,
          level: real?.level ?? 0,
          isReal: Boolean(real),
        };
      });
    });

    const labels: { label: string; week: number }[] = [];
    const seenMonths = new Set<string>();
    builtWeeks.forEach((week, idx) => {
      const date = new Date(`${week[0].date}T00:00:00`);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (!seenMonths.has(key)) {
        seenMonths.add(key);
        labels.push({
          label: date.toLocaleString('en-US', { month: 'short' }),
          week: idx,
        });
      }
    });

    return { weeks: builtWeeks, monthLabels: labels };
  }, [days]);

  return (
    <section id="github-stats" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-500 mb-3">
            Open Source
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            GitHub Stats
          </h2>
          <div className="mt-3 w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full" />
          <a
            href="https://github.com/Pradeep20-spec"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500"
          >
            <Github className="w-4 h-4" />
            github.com/Pradeep20-spec
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-[240px] rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950/40 p-3 flex items-center justify-center">
            <img
              src="https://github-readme-stats.vercel.app/api?username=Pradeep20-spec&show_icons=true&theme=transparent&hide_border=true&rank_icon=github"
              alt="Pradeep GitHub stats"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="h-[240px] rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950/40 p-3 flex items-center justify-center">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=Pradeep20-spec&theme=transparent&hide_border=true"
              alt="Top languages used by Pradeep"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950/40 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Contribution Activity
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Less</span>
              {levelClasses.map((levelClass, i) => (
                <span key={i} className={`w-2.5 h-2.5 rounded-sm ${levelClass}`} />
              ))}
              <span>More</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[670px]">
              <div className="relative h-4 mb-2 text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                {monthLabels.map((month) => (
                  <span
                    key={`${month.label}-${month.week}`}
                    className="absolute"
                    style={{ left: `${month.week * 16}px` }}
                  >
                    {month.label}
                  </span>
                ))}
              </div>

              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={`week-${weekIndex}`} className="flex flex-col gap-1">
                    {week.map((cell) => {
                      const level = cell.isReal ? cell.level : 0;
                      return (
                        <span
                          key={cell.date}
                          className={`calendar-cell w-3 h-3 rounded-[3px] ${levelClasses[level]} ${cell.isReal ? '' : 'opacity-35'}`}
                          style={{ animationDelay: `${weekIndex * 90}ms` }}
                          title={`${cell.date} • ${cell.count} contributions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
