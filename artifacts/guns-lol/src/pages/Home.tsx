import { useState, useEffect, useRef } from "react";
import { SiDiscord, SiTiktok, SiX, SiTelegram } from "react-icons/si";
import { Check, Eye, Users, File, Gem, ChevronDown, X } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";

function GunSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 60"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M110 20H95V15C95 13.3 93.7 12 92 12H28C26.3 12 25 13.3 25 15V20H10C8.3 20 7 21.3 7 23V33C7 34.7 8.3 36 10 36H25V40C25 42.2 26.8 44 29 44H36V52C36 53.1 36.9 54 38 54H50C51.1 54 52 53.1 52 52V44H92C94.2 44 96 42.2 96 40V36H110C111.7 36 113 34.7 113 33V23C113 21.3 111.7 20 110 20Z" />
    </svg>
  );
}

function GunIconSmall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M110 20H95V15C95 13.3 93.7 12 92 12H28C26.3 12 25 13.3 25 15V20H10C8.3 20 7 21.3 7 23V33C7 34.7 8.3 36 10 36H25V40C25 42.2 26.8 44 29 44H36V52C36 53.1 36.9 54 38 54H50C51.1 54 52 53.1 52 52V44H92C94.2 44 96 42.2 96 40V36H110C111.7 36 113 34.7 113 33V23C113 21.3 111.7 20 110 20Z" />
    </svg>
  );
}

// Scattered gun silhouettes for the background — match the real site's layout
const BG_GUNS = [
  { top: "2%",  left: "0%",   size: 140, rotate: 15,  opacity: 0.06 },
  { top: "0%",  left: "14%",  size: 100, rotate: -20, opacity: 0.05 },
  { top: "5%",  right: "2%",  size: 130, rotate: 10,  opacity: 0.06 },
  { top: "2%",  right: "18%", size: 110, rotate: -8,  opacity: 0.05 },
  { top: "18%", left: "2%",   size: 120, rotate: 30,  opacity: 0.055 },
  { top: "15%", right: "5%",  size: 125, rotate: -25, opacity: 0.055 },
  { top: "32%", left: "0%",   size: 100, rotate: -15, opacity: 0.05 },
  { top: "28%", right: "0%",  size: 110, rotate: 20,  opacity: 0.05 },
  { top: "45%", left: "1%",   size: 130, rotate: 5,   opacity: 0.045 },
  { top: "42%", right: "2%",  size: 120, rotate: -10, opacity: 0.045 },
  { top: "58%", left: "3%",   size: 105, rotate: -30, opacity: 0.04 },
  { top: "55%", right: "3%",  size: 115, rotate: 18,  opacity: 0.04 },
  { top: "70%", left: "0%",   size: 125, rotate: 12,  opacity: 0.035 },
  { top: "68%", right: "1%",  size: 100, rotate: -22, opacity: 0.035 },
  { top: "82%", left: "2%",   size: 110, rotate: -8,  opacity: 0.03 },
  { top: "80%", right: "3%",  size: 120, rotate: 25,  opacity: 0.03 },
  { top: "92%", left: "1%",   size: 130, rotate: 20,  opacity: 0.025 },
  { top: "90%", right: "0%",  size: 105, rotate: -15, opacity: 0.025 },
  { top: "10%", left: "8%",   size: 90,  rotate: 45,  opacity: 0.04 },
  { top: "10%", right: "10%", size: 95,  rotate: -40, opacity: 0.04 },
  { top: "50%", left: "8%",   size: 85,  rotate: -20, opacity: 0.035 },
  { top: "50%", right: "8%",  size: 90,  rotate: 30,  opacity: 0.035 },
  { top: "75%", left: "7%",   size: 100, rotate: 10,  opacity: 0.03 },
  { top: "75%", right: "7%",  size: 95,  rotate: -35, opacity: 0.03 },
];

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function StatCard({ icon, value, label, delay }: { icon: React.ReactNode; value: string; label: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className="bg-[#ffffff08] backdrop-blur-sm rounded-2xl p-6 flex items-center justify-between border border-white/5 transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: delay ? `${delay}ms` : '0ms'
      }}
    >
      <div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-purple-300/60 text-sm">{label}</div>
      </div>
      <div className="text-purple-400 opacity-70">{icon}</div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      data-testid={`faq-item-${question.substring(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
      className="bg-[#ffffff06] border border-white/5 rounded-2xl overflow-hidden"
    >
      <button
        data-testid="button-faq-toggle"
        className="w-full flex items-center justify-between p-5 text-left text-white font-medium hover:bg-white/5 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px]">{question}</span>
        <ChevronDown
          size={18}
          className="text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"login" | "signup">("signup");
  const [modalUsername, setModalUsername] = useState("");
  const ctaUsernameRef = useRef<HTMLInputElement>(null);

  const { ref: statsRef, inView: statsInView } = useInView();
  const profileViews = useCountUp(65600000, 2500, statsInView);
  const users = useCountUp(1680000, 2500, statsInView);
  const uploads = useCountUp(600000, 2500, statsInView);
  const subscribers = useCountUp(47000, 2500, statsInView);

  function openSignup(u?: string) {
    setModalTab("signup");
    setModalUsername(u || "");
    setModalOpen(true);
  }
  function openLogin() {
    setModalTab("login");
    setModalUsername("");
    setModalOpen(true);
  }

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
    if (n >= 1000) return `${Math.round(n / 1000)}K`;
    return n.toString();
  };

  const faqs = [
    { question: "What is guns.lol?", answer: "guns.lol is a modern link-in-bio platform that lets you create beautiful, customizable profile pages to share all your links and socials in one place. It also offers fast and secure file hosting." },
    { question: "Is guns.lol free?", answer: "Yes! guns.lol has a free plan that includes basic customization, profile analytics, basic effects, and the ability to add all your socials. No credit card required." },
    { question: "What can I do with guns.lol?", answer: "You can create a fully customizable link-in-bio profile page, host files securely, add your social media links, customize your profile with themes, fonts, and effects, and much more." },
    { question: "Why use guns.lol over other link-in-bio tools?", answer: "guns.lol offers a unique combination of powerful customization options, file hosting, and modern design that sets it apart from other tools. With over 1,680,000 users, it's the go-to choice for creators." },
    { question: "Is guns.lol safe?", answer: "Absolutely. guns.lol takes security seriously with encrypted file hosting, secure profile pages, and privacy-first design. Your data is always protected." },
    { question: "How long does setup take?", answer: "You can have your profile up and running in minutes. Just sign up, choose your username, add your links and socials, and you're good to go. No technical knowledge required." },
  ];

  return (
    <div className="min-h-screen text-white font-['Inter'] relative overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #1a0b2e 0%, #160924 15%, #0e0618 35%, #080410 60%, #050209 80%, #020108 100%)" }}
    >
      {/* Background gun silhouettes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {BG_GUNS.map((g, i) => (
          <div
            key={i}
            className="absolute text-purple-300"
            style={{
              top: g.top,
              left: (g as any).left,
              right: (g as any).right,
              width: g.size,
              opacity: g.opacity,
              transform: `rotate(${g.rotate}deg)`,
            }}
          >
            <GunSVG />
          </div>
        ))}
      </div>

      {/* Navbar */}
      <nav
        className="relative z-50 flex items-center justify-between px-6 md:px-10 py-4"
        data-testid="navbar"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 flex items-center justify-center">
            <GunIconSmall className="w-8 h-5 text-purple-400" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">guns.lol</span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7">
          {["Help Center", "Discord", "Leaderboard", "Pricing"].map(item => (
            <a
              key={item}
              href="#"
              data-testid={`link-nav-${item.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={e => {
                e.preventDefault();
                if (item === "Pricing") document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              {item}
            </a>
          ))}
          <button
            data-testid="button-login"
            onClick={openLogin}
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            Login
          </button>
        </div>

        {/* Sign Up Free button */}
        <div className="hidden md:block">
          <button
            data-testid="button-sign-up-nav"
            onClick={() => openSignup()}
            className="bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105"
          >
            Sign Up Free
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          data-testid="button-menu-toggle"
          className="md:hidden text-gray-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : (
            <div className="flex flex-col gap-1.5">
              <div className="w-5 h-0.5 bg-purple-400"></div>
              <div className="w-5 h-0.5 bg-purple-400"></div>
              <div className="w-5 h-0.5 bg-purple-400"></div>
            </div>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          data-testid="mobile-menu"
          className="relative z-40 mx-4 mb-2 bg-[#1a0b2e]/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
        >
          <div className="p-5 space-y-1">
            {["Help Center", "Discord", "Leaderboard", "Pricing", "Login"].map(item => (
              <a
                key={item}
                href="#"
                data-testid={`link-mobile-${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={e => {
                  e.preventDefault();
                  setMenuOpen(false);
                  if (item === "Login") openLogin();
                  else if (item === "Pricing") document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block py-2.5 px-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 text-sm transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="pt-2">
              <button
                data-testid="button-sign-up-mobile"
                onClick={() => { setMenuOpen(false); openSignup(); }}
                className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2.5 rounded-full text-sm transition-all"
              >
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative z-10 pt-16 pb-20 px-4 text-center" data-testid="hero-section">
        <div className="max-w-2xl mx-auto">
          {/* Announcement banner */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-600/30 rounded-full px-4 py-2 text-sm text-purple-200 backdrop-blur-sm">
              <span>🐰</span>
              <span>Easter Sale: Get a free exclusive Easter badge with any purchase!</span>
            </div>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-5"
            data-testid="hero-headline"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
          >
            Everything you want, right here.
          </h1>
          <p
            className="text-gray-400 text-lg mb-10"
            data-testid="hero-subtext"
          >
            guns.lol is your go-to for modern, feature-rich link-in-bio pages and fast, secure file hosting
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              data-testid="button-sign-up"
              onClick={() => openSignup()}
              className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105 text-[15px]"
            >
              Sign Up for Free
            </button>
            <button
              data-testid="button-view-pricing"
              onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent hover:bg-white/5 text-white font-semibold py-3 px-8 rounded-full border border-white/20 transition-all duration-200 hover:scale-105 text-[15px]"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-4" data-testid="stats-section">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5" style={{ letterSpacing: "-0.02em" }}>
              Over <span className="text-purple-400">1,680,000</span> people use guns.lol — What are you waiting for?
            </h2>
            <p className="text-gray-400 text-base max-w-md mx-auto">
              Create feature-rich, customizable and modern link-in-bio pages, along with fast and secure file hosting, all with guns.lol.
            </p>
          </div>

          <div ref={statsRef} className="space-y-3">
            <StatCard icon={<Eye size={26} />} value={`${formatNumber(profileViews)}+`} label="Profile Views" delay={0} />
            <StatCard icon={<Users size={26} />} value={`${formatNumber(users)}+`} label="Users" delay={100} />
            <StatCard icon={<File size={26} />} value={`${formatNumber(uploads)}+`} label="File Uploads" delay={200} />
            <StatCard icon={<Gem size={26} />} value={`${formatNumber(subscribers)}+`} label="Subscribers" delay={300} />
          </div>
        </div>
      </section>

      {/* Claim Profile Section */}
      <section className="relative z-10 py-16 px-4" data-testid="claim-section">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8" style={{ letterSpacing: "-0.02em" }}>
            Claim your profile and create an account in minutes!
          </h2>
          <div className="flex gap-2 max-w-sm mx-auto">
            <div className="flex-1 bg-[#ffffff08] border border-white/10 rounded-full px-4 py-3 flex items-center gap-2">
              <span className="text-gray-500 text-sm whitespace-nowrap">guns.lol/</span>
              <input
                data-testid="input-username"
                type="text"
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="bg-transparent text-white text-sm outline-none flex-1 placeholder:text-gray-600"
              />
            </div>
            <button
              data-testid="button-claim-now"
              onClick={() => openSignup(username)}
              className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105 whitespace-nowrap text-sm"
            >
              Claim Now
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="relative z-10 py-16 px-4" data-testid="pricing-section">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Explore our exclusive plans and join{" "}
              <span className="text-purple-400">47,000+</span> subscribers
            </h2>
          </div>

          <div className="space-y-4">
            {/* Free Plan */}
            <div data-testid="pricing-card-free" className="bg-[#ffffff06] border border-white/5 rounded-3xl p-7">
              <h3 className="text-xl font-bold text-white mb-4">Free</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white">0€</span>
                <span className="text-gray-400 text-sm">/Lifetime</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">For beginners, link all your socials in one place.</p>
              <div className="space-y-3 mb-7">
                {["Basic Customization", "Profile Analytics", "Basic Effects", "Add Your Socials"].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <Check size={15} className="text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <button
                data-testid="button-get-started-free"
                onClick={() => openSignup()}
                className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 rounded-full transition-all duration-200 text-sm"
              >
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div
              data-testid="pricing-card-premium"
              className="relative bg-gradient-to-br from-[#2a1045] to-[#1a0830] border border-purple-600/30 rounded-3xl p-7 overflow-hidden"
            >
              <div className="absolute top-5 right-5">
                <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">Most Popular</span>
              </div>
              <div className="absolute opacity-[0.04] right-6 bottom-6">
                <Gem size={110} />
              </div>
              <div className="flex items-center gap-2.5 mb-4">
                <Gem size={18} className="text-purple-400" />
                <h3 className="text-xl font-bold text-white">Premium</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-gray-500 line-through text-base">7,99€</span>
                <span className="text-4xl font-bold text-white">6,79€</span>
                <span className="text-gray-400 text-sm">/Lifetime</span>
              </div>
              <p className="text-purple-400 text-sm mb-2">Pay once. Keep it forever.</p>
              <p className="text-gray-400 text-sm mb-6">The perfect plan to discover your creativity &amp; unlock more features.</p>
              <div className="space-y-3 mb-7">
                {[
                  "Exclusive Badge", "Profile Layouts", "Custom Fonts",
                  "Typewriter Animation", "Special Profile Effects",
                  "Advanced Customization", "Metadata & SEO Customization"
                ].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <Check size={15} className="text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <button
                data-testid="button-get-started-premium"
                onClick={() => openSignup()}
                className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 rounded-full transition-all duration-200 text-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-16 px-4" data-testid="cta-section">
        <div className="max-w-xl mx-auto">
          <div className="bg-gradient-to-br from-[#2a1045] to-[#1a0830] rounded-3xl p-8 relative overflow-hidden border border-purple-700/25">
            <div className="absolute opacity-[0.04] right-6 top-1/2 -translate-y-1/2">
              <GunSVG style={{ width: 160 }} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-3 leading-tight max-w-xs" style={{ letterSpacing: "-0.02em" }}>
              Everything you want, right here.
            </h2>
            <p className="text-gray-300 text-sm mb-6 max-w-xs">
              Join over 1,680,000+ people using guns.lol and become part of our large community.
            </p>
            <div className="flex gap-2 max-w-xs">
              <div className="flex-1 bg-[#ffffff0a] border border-white/10 rounded-full px-4 py-3 flex items-center gap-2">
                <span className="text-gray-500 text-sm whitespace-nowrap">guns.lol/</span>
                <input
                  ref={ctaUsernameRef}
                  data-testid="input-username-cta"
                  type="text"
                  placeholder="username"
                  className="bg-transparent text-white text-sm outline-none flex-1 placeholder:text-gray-600"
                />
              </div>
              <button
                data-testid="button-claim-now-cta"
                onClick={() => openSignup(ctaUsernameRef.current?.value || "")}
                className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 px-5 rounded-full transition-all duration-200 whitespace-nowrap text-sm"
              >
                Claim Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-16 px-4" data-testid="faq-section">
        <div className="max-w-xl mx-auto space-y-2">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-white/5" data-testid="footer">
        <div className="max-w-xl mx-auto">
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
              <div className="space-y-2">
                {["Help Center", "Changelog", "Redeem Code", "Salad.com Product", "Hone.gg Partner"].map(item => (
                  <a key={item} href="#" data-testid={`link-resource-${item.toLowerCase().replace(/\s+/g, '-')}`} className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
                  <div className="space-y-2">
                    {["Discord Server", "Support Email", "Business Email", "Legal Email"].map(item => (
                      <a key={item} href="#" data-testid={`link-contact-${item.toLowerCase().replace(/\s+/g, '-')}`} className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">{item}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
                  <div className="space-y-2">
                    {["Terms of Service", "Privacy Policy", "Copyright Policy"].map(item => (
                      <a key={item} href="#" data-testid={`link-legal-${item.toLowerCase().replace(/\s+/g, '-')}`} className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">{item}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GunIconSmall className="w-7 h-4 text-purple-400" />
                <span className="font-bold text-white text-base">guns.lol</span>
              </div>
              <div className="flex items-center gap-2 bg-[#ffffff08] border border-white/5 rounded-full px-3 py-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-gray-300 text-xs">System Status</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-5">
              Create feature-rich, customizable and modern link-in-bio pages with guns.lol.
            </p>
            <div className="flex items-center gap-2 bg-[#ffffff06] border border-white/5 rounded-full px-4 py-2 w-fit cursor-pointer hover:bg-white/5 transition-colors mb-8">
              <span className="text-sm">🇺🇸</span>
              <span className="text-gray-300 text-sm">English (US)</span>
              <ChevronDown size={13} className="text-gray-500 ml-1" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700 text-xs">Copyright © 2026 guns.lol - All Rights Reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" data-testid="link-social-discord" className="text-gray-600 hover:text-white transition-colors"><SiDiscord size={15} /></a>
                <a href="#" data-testid="link-social-tiktok" className="text-gray-600 hover:text-white transition-colors"><SiTiktok size={15} /></a>
                <a href="#" data-testid="link-social-x" className="text-gray-600 hover:text-white transition-colors"><SiX size={15} /></a>
                <a href="#" data-testid="link-social-telegram" className="text-gray-600 hover:text-white transition-colors"><SiTelegram size={15} /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={modalTab}
        prefillUsername={modalUsername}
      />
    </div>
  );
}
