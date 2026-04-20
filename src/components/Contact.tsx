import { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, Send, MapPin } from 'lucide-react';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'pradeepj2726@gmail.com',
    href: 'mailto:pradeepj2726@gmail.com',
    color: 'from-teal-500 to-cyan-500',
    description: 'Reach out directly for collaborations or opportunities',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/pradeep-j-b01581341',
    href: 'https://www.linkedin.com/in/pradeep-j-b01581341/',
    color: 'from-sky-500 to-blue-600',
    description: 'Connect with me professionally',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Pradeep20-spec',
    href: 'https://github.com/Pradeep20-spec',
    color: 'from-gray-600 to-gray-800',
    description: 'Explore my code and open source contributions',
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/pradeepj2726@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio Contact Form - ${form.name}`,
          _template: 'table',
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to send message right now. Please try again.');
      }

      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setSubmitError('Message could not be sent. Please retry or email directly at pradeepj2726@gmail.com.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-500 mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Contact Me
          </h2>
          <div className="mt-3 w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
            Whether it's a project opportunity, collaboration, or just a hello — my inbox is always open.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact links */}
          <div
            className={`space-y-4 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {contactLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <a
                  key={i}
                  href={link.href}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {link.label}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mt-0.5">
                      {link.value}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </a>
              );
            })}

            <div className="flex items-center gap-3 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Location
                </p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm mt-0.5">
                  Chennai, Tamil Nadu, India
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  Open to remote collaborations
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm"
            >
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">
                Send a Message
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    submitted
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none'
                  }`}
                >
                  {isSending ? (
                    <>Sending...</>
                  ) : submitted ? (
                    <>Message Sent!</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
                {submitError && (
                  <p className="text-xs text-rose-500 dark:text-rose-400">{submitError}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
