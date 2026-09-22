import { useEffect, useMemo, useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Users, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import { githubContributions } from '../data/githubContributions';

const DAYS = 7;
const GITHUB_USER = 'Pradeep20-spec';

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

type GitHubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubRepo = {
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
};

type LanguageStat = {
  name: string;
  bytes: number;
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

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

function formatMonthYear(dateString: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(dateString));
}

function topLanguages(repos: GitHubRepo[]) {
  const totals = new Map<string, number>();

  repos.forEach((repo) => {
    if (!repo.language) {
      return;
    }

    const current = totals.get(repo.language) ?? 0;
    const weight = Math.max(1, repo.stargazers_count + repo.forks_count + 1);
    totals.set(repo.language, current + weight);
  });

  return [...totals.entries()]
    .map(([name, bytes]) => ({ name, bytes }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 5);
}

export default function GithubStats() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [repoTotals, setRepoTotals] = useState({ stars: 0, forks: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadGithubData() {
      try {
        setLoading(true);
        setError('');

        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
        ]);

        if (!profileResponse.ok) {
          throw new Error(`GitHub profile request failed with ${profileResponse.status}`);
        }

        if (!reposResponse.ok) {
          throw new Error(`GitHub repos request failed with ${reposResponse.status}`);
        }

        const profileData = (await profileResponse.json()) as GitHubProfile;
        const repoData = (await reposResponse.json()) as GitHubRepo[];
        const ownedRepos = repoData.filter((repo) => !repo.fork && !repo.archived);

        setProfile(profileData);
        setLanguages(topLanguages(ownedRepos));
        setRepoTotals({
          stars: ownedRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
          forks: ownedRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
        });
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load GitHub stats right now.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadGithubData();

    return () => controller.abort();
  }, []);

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
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950/40 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-500">Live Profile</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GitHub Stats</h3>
              </div>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-teal-500" />
              ) : profile ? (
                <img
                  src={profile.avatar_url}
                  alt={`${profile.login} avatar`}
                  className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700"
                />
              ) : null}
            </div>

            {error ? (
              <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            ) : null}

            {profile ? (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {profile.name ?? profile.login} {profile.bio ? `• ${profile.bio}` : ''}
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                  GitHub since {formatMonthYear(profile.created_at)}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      <Users className="w-3.5 h-3.5" />
                      Followers
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(profile.followers)}</p>
                  </div>
                  <div className="rounded-xl bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      <BookOpen className="w-3.5 h-3.5" />
                      Repos
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(profile.public_repos)}</p>
                  </div>
                  <div className="rounded-xl bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      <Star className="w-3.5 h-3.5" />
                      Stars
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(repoTotals.stars)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      <GitFork className="w-3.5 h-3.5" />
                      Forks
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(repoTotals.forks)}</p>
                  </div>
                </div>

                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500"
                >
                  <Github className="w-4 h-4" />
                  View profile on GitHub
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-sm text-gray-500 dark:text-gray-400">
                {loading ? 'Loading live GitHub stats...' : 'GitHub stats could not be loaded right now.'}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950/40 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-500">Live Languages</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Languages</h3>
              </div>
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-teal-500" /> : null}
            </div>

            {languages.length ? (
              <div className="space-y-4">
                {languages.map((language) => {
                  const total = languages.reduce((sum, item) => sum + item.bytes, 0) || 1;
                  const width = Math.max(8, Math.round((language.bytes / total) * 100));

                  return (
                    <div key={language.name}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">{language.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">{width}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-sm text-gray-500 dark:text-gray-400">
                {loading ? 'Loading language breakdown...' : 'No language data available yet.'}
              </div>
            )}
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
