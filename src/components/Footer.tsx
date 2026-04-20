import { Code2, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: Github, href: 'https://github.com/Pradeep20-spec', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/pradeep-j-b01581341/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:pradeepj2726@gmail.com', label: 'Email' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <button
              onClick={scrollTop}
              className="flex items-center gap-2 font-bold text-lg text-white mb-3 hover:text-teal-400 transition-colors"
            >
              <Code2 className="w-5 h-5 text-teal-500" />
              J. Pradeep
            </button>
            <p className="text-sm leading-relaxed text-gray-500">
              Computer Science student building intelligent systems and solving
              real-world problems with code.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Navigate
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-gray-500 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Connect
            </h4>
            <div className="flex gap-3 mb-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-teal-500/20 hover:text-teal-400 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-600">
              Open to internships, projects, and collaborations. Let's build something great.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} J. Pradeep. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-600">
              Built with React & Tailwind CSS
            </p>
            <button
              onClick={scrollTop}
              className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-white transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
