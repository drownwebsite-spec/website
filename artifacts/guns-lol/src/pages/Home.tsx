import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { SiDiscord, SiTiktok, SiX, SiTelegram } from "react-icons/si";
import { Check, Eye, Users, File, Gem, ChevronDown, X } from "lucide-react";

function GunSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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

// Subtle scattered gun silhouettes matching real site
const BG_GUNS = [
  { top: "2%",  left: "0%",   size: 140, rotate: 15,  opacity: 0.045 },
  { top: "0%",  left: "14%",  size: 100, rotate: -20, opacity: 0.038 },
  { top: "5%",  right: "2%",  size: 130, rotate: 10,  opacity: 0.045 },
  { top: "2%",  right: "18%", size: 110, rotate: -8,  opacity: 0.038 },
  { top: "18%", left: "2%",   size: 120, rotate: 30,  opacity: 0.04 },
  { top: "15%", right: "5%",  size: 125, rotate: -25, opacity: 0.04 },
  { top: "32%", left: "0%",   size: 100, rotate: -15, opacity: 0.038 },
  { top: "28%", right: "0%",  size: 110, rotate: 20,  opacity: 0.038 },
  { top: "45%", left: "1%",   size: 130, rotate: 5,   opacity: 0.032 },
  { top: "42%", right: "2%",  size: 120, rotate: -10, opacity: 0.032 },
  { top: "58%", left: "3%",   size: 105, rotate: -30, opacity: 0.028 },
  { top: "55%", right: "3%",  size: 115, rotate: 18,  opacity: 0.028 },
  { top: "70%", left: "0%",   size: 125, rotate: 12,  opacity: 0.024 },
  { top: "68%", right: "1%",  size: 100, rotate: -22, opacity: 0.024 },
  { top: "82%", left: "2%",   size: 110, rotate: -8,  opacity: 0.02 },
  { top: "80%", right: "3%",  size: 120, rotate: 25,  opacity: 0.02 },
  { top: "92%", left: "1%",   size: 130, rotate: 20,  opacity: 0.018 },
  { top: "90%", right: "0%",  size: 105, rotate: -15, opacity: 0.018 },
  { top: "10%", left: "8%",   size: 90,  rotate: 45,  opacity: 0.03 },
  { top: "10%", right: "10%", size: 95,  rotate: -40, opacity: 0.03 },
  { top: "50%", left: "8%",   size: 85,  rotate: -20, opacity: 0.025 },
  { top: "50%", right: "8%",  size: 90,  rotate: 30,  opacity: 0.025 },
  { top: "75%", left: "7%",   size: 100, rotate: 10,  opacity: 0.022 },
  { top: "75%", right: "7%",  size: 95,  rotate: -35, opacity: 0.022 },
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
      className="rounded-2xl p-6 flex items-center justify-between transition-all duration-500"
      style={{
        background: "#111111",
        border: "1px solid #222222",
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: delay ? `${delay}ms` : '0ms'
      }}
    >
      <div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm" style={{ color: "#555" }}>{label}</div>
      </div>
      <div style={{ color: "#7c3aed", opacity: 0.8 }}>{icon}</div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      data-testid={`faq-item-${question.substring(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
      className="rounded-2xl overflow-hidden"
      style={{ background: "#111", border: "1px solid #222" }}
    >
      <button
        data-testid="button-faq-toggle"
        className="w-full flex items-center justify-between p-5 text-left text-white font-medium transition-colors"
        style={{ background: "transparent" }}
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px]">{question}</span>
        <ChevronDown
          size={18}
          className="text-gray-500 transition-transform duration-300 flex-shrink-0 ml-4"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#666" }}>{answer}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const ctaUsernameRef = useRef<HTMLInputElement>(null);

  const { ref: statsRef, inView: statsInView } = useInView();
  const profileViews = useCountUp(65600000, 2500, statsInView);
  const users = useCountUp(1680000, 2500, statsInView);
  const uploads = useCountUp(600000, 2500, statsInView);
  const subscribers = useCountUp(47000, 2500, statsInView);

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
    <div
      className="min-h-screen text-white font-['Inter'] relative overflow-x-hidden"
      style={{ background: "#0b0b0b" }}
    >
      {/* Background gun silhouettes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {BG_GUNS.map((g, i) => (
          <div
            key={i}
            className="absolute text-purple-400"
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

      {/* ── NAVBAR: floating pill capsule ── */}
      <div className="relative z-50 px-3 pt-3" data-testid="navbar-wrapper">
        <nav
          className="flex items-center justify-between px-4 py-3 rounded-2xl"
          style={{ background: "#111111" }}
          data-testid="navbar"
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 no-underline">
            <GunIconSmall className="w-7 h-4 text-purple-500" />
            <span className="font-bold text-white text-base tracking-tight">guns.lol</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {["Help Center", "Discord", "Leaderboard", "Pricing"].map(item => (
              <a
                key={item}
                href="#"
                data-testid={`link-nav-${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={e => {
                  e.preventDefault();
                  if (item === "Pricing") document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-medium transition-colors"
                style={{ color: "#999" }}
              >
                {item}
              </a>
            ))}
            <button
              data-testid="button-login"
              onClick={() => navigate("/login")}
              className="text-sm font-medium transition-colors"
              style={{ color: "#999" }}
            >
              Login
            </button>
          </div>

          {/* Desktop sign up */}
          <div className="hidden md:block">
            <button
              data-testid="button-sign-up-nav"
              onClick={() => navigate("/signup")}
              className="text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:opacity-90"
              style={{ background: "#5b21b6" }}
            >
              Sign Up Free
            </button>
          </div>

          {/* Mobile hamburger — three purple bars */}
          <button
            data-testid="button-menu-toggle"
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X size={20} style={{ color: "#a78bfa" }} />
            ) : (
              <>
                <div className="w-5 h-[2px] rounded" style={{ background: "#a78bfa" }} />
                <div className="w-5 h-[2px] rounded" style={{ background: "#a78bfa" }} />
                <div className="w-5 h-[2px] rounded" style={{ background: "#a78bfa" }} />
              </>
            )}
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            data-testid="mobile-menu"
            className="mt-1.5 rounded-2xl overflow-hidden"
            style={{ background: "#111111" }}
          >
            <div className="p-4 space-y-0.5">
              {["Help Center", "Discord", "Leaderboard", "Pricing", "Login"].map(item => (
                <a
                  key={item}
                  href="#"
                  data-testid={`link-mobile-${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={e => {
                    e.preventDefault();
                    setMenuOpen(false);
                    if (item === "Login") navigate("/login");
                    else if (item === "Pricing") document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block py-2.5 px-3 rounded-xl text-sm transition-colors"
                  style={{ color: "#aaa" }}
                >
                  {item}
                </a>
              ))}
              <div className="pt-2">
                <button
                  data-testid="button-sign-up-mobile"
                  onClick={() => { setMenuOpen(false); navigate("/signup"); }}
                  className="w-full text-white font-semibold py-2.5 rounded-full text-sm transition-all"
                  style={{ background: "#5b21b6" }}
                >
                  Sign Up Free
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 pt-14 pb-16 px-5 text-center" data-testid="hero-section">
        <div className="max-w-lg mx-auto">
          {/* Announcement banner */}
          <div className="flex justify-center mb-7">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-purple-200 text-center"
              style={{ background: "#2d1b69", border: "1px solid #4c1d95" }}
            >
              <span>🐰</span>
              <span>Easter Sale: Get a free exclusive Easter badge with any purchase!</span>
            </div>
          </div>

          <h1
            className="text-[2.6rem] sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5"
            data-testid="hero-headline"
            style={{ letterSpacing: "-0.02em" }}
          >
            Everything you want, right here.
          </h1>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: "#777" }} data-testid="hero-subtext">
            guns.lol is your go-to for modern, feature-rich link-in-bio pages and fast,<br className="hidden sm:block" /> secure file hosting
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              data-testid="button-sign-up"
              onClick={() => navigate("/signup")}
              className="text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:opacity-90 text-[15px]"
              style={{ background: "#5b21b6" }}
            >
              Sign Up for Free
            </button>
            <button
              data-testid="button-view-pricing"
              onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 text-[15px]"
              style={{ background: "transparent", border: "1px solid #333" }}
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Phone mockups placeholder */}
      <section className="relative z-10 pb-10 px-5 flex justify-center" data-testid="mockup-section">
        <div className="flex gap-3 items-end justify-center max-w-sm w-full overflow-hidden">
          {/* Left phone (tilted left) */}
          <div
            className="w-[90px] h-[170px] rounded-[18px] overflow-hidden flex-shrink-0 shadow-2xl"
            style={{ transform: "rotate(-8deg) translateY(12px)", border: "1.5px solid #2a2a2a", background: "#111" }}
          >
            <div className="w-full h-full" style={{ background: "linear-gradient(160deg, #1a1a2e 0%, #0f0f1a 100%)" }}>
              <div className="p-2 flex flex-col items-center pt-4 gap-1">
                <div className="w-8 h-8 rounded-full bg-gray-600" />
                <div className="text-white text-[6px] font-bold">Azre</div>
                <div className="text-gray-500 text-[5px]">GFX Artist</div>
                <div className="flex gap-0.5 mt-0.5">
                  {[0,1,2,3,4].map(s => <div key={s} className="w-1 h-1 rounded-full" style={{ background: s < 4 ? "#7c3aed" : "#333" }} />)}
                </div>
                <div className="mt-2 w-full space-y-0.5">
                  {["My Portfo...", "My Slon...", "My Discord S..."].map((t, i) => (
                    <div key={i} className="rounded-md px-1.5 py-1 text-[5px] text-white" style={{ background: "#1e1e2e" }}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Center phone (front, no tilt) */}
          <div
            className="w-[110px] h-[200px] rounded-[22px] overflow-hidden flex-shrink-0 shadow-2xl z-10"
            style={{ border: "1.5px solid #3a1a5e", background: "#111" }}
          >
            <div className="w-full h-full" style={{ background: "linear-gradient(160deg, #0d0b1e 0%, #0a0918 100%)" }}>
              <div className="p-2 flex flex-col items-center pt-5 gap-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#1a1a2e", border: "1.5px solid #3a2060" }}>
                  <SiDiscord size={16} className="text-purple-400" />
                </div>
                <div className="text-white text-[7px] font-bold mt-0.5">vue ♡</div>
                <div className="text-gray-500 text-[5px]">welcome to my page!</div>
                <div className="flex gap-1 mt-1">
                  {["D","G","X"].map((s, i) => (
                    <div key={i} className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#1e1e2e", fontSize: 5, color: "#aaa" }}>{s}</div>
                  ))}
                </div>
                <div className="mt-2 w-full space-y-0.5">
                  {["My Portfolio", "My Discord S...", "My YouTube"].map((t, i) => (
                    <div key={i} className="rounded-md px-1.5 py-1 text-[5px] text-white" style={{ background: "#1e1e2e" }}>{t}</div>
                  ))}
                </div>
                <div className="text-gray-600 text-[4px] mt-1">◉ 2.5k</div>
              </div>
            </div>
          </div>
          {/* Right phone (tilted right) */}
          <div
            className="w-[90px] h-[170px] rounded-[18px] overflow-hidden flex-shrink-0 shadow-2xl"
            style={{ transform: "rotate(8deg) translateY(12px)", border: "1.5px solid #2a2a2a", background: "#111" }}
          >
            <div className="w-full h-full" style={{ background: "linear-gradient(160deg, #0a0a0f 0%, #1a0a2a 100%)" }}>
              <div className="p-2 flex flex-col items-center pt-4 gap-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#1a1530", border: "1.5px solid #3a2060" }}>
                  <SiDiscord size={12} className="text-indigo-400" />
                </div>
                <div className="text-white text-[6px] font-bold">hris</div>
                <div className="flex gap-0.5 mt-0.5">
                  {[0,1,2,3,4].map(s => <div key={s} className="w-1 h-1 rounded-full" style={{ background: s < 5 ? "#7c3aed" : "#333" }} />)}
                </div>
                <div className="text-gray-500 text-[5px]">guns.lol on top!</div>
                <div className="mt-2 p-1 rounded w-full" style={{ background: "#1a1a2e" }}>
                  <div className="flex items-center gap-0.5">
                    <SiDiscord size={5} className="text-indigo-400 flex-shrink-0" />
                    <div>
                      <div className="text-[4px] text-white">papaparc</div>
                      <div className="text-[3.5px] text-gray-500">Playing VS Code</div>
                      <div className="text-[3.5px] text-gray-600">Editing code...</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mt-1">
                  {["🌐","G","◈"].map((s, i) => (
                    <div key={i} className="w-4 h-4 rounded-full flex items-center justify-center text-[5px]" style={{ background: "#1e1e2e", color: "#aaa" }}>{s}</div>
                  ))}
                </div>
                <div className="text-gray-600 text-[4px] mt-1">◉ 4.8k</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative z-10 py-16 px-5" data-testid="stats-section">
        <div className="max-w-xl mx-auto">
          <h2
            className="text-[2rem] sm:text-4xl font-bold text-white leading-tight mb-4 text-center"
            style={{ letterSpacing: "-0.02em" }}
          >
            Over <span style={{ color: "#a78bfa" }}>1,680,000</span> people use guns.lol<br className="hidden sm:block" /> — What are you waiting for?
          </h2>
          <p className="text-sm text-center mb-10 max-w-sm mx-auto" style={{ color: "#666" }}>
            Create feature-rich, customizable and modern link-in-bio pages, along with fast and secure file hosting, all with guns.lol.
          </p>
          <div ref={statsRef} className="space-y-3">
            <StatCard icon={<Eye size={26} />} value={`${formatNumber(profileViews)}+`} label="Profile Views" delay={0} />
            <StatCard icon={<Users size={26} />} value={`${formatNumber(users)}+`} label="Users" delay={100} />
            <StatCard icon={<File size={26} />} value={`${formatNumber(uploads)}+`} label="File Uploads" delay={200} />
            <StatCard icon={<Gem size={26} />} value={`${formatNumber(subscribers)}+`} label="Subscribers" delay={300} />
          </div>
        </div>
      </section>

      {/* ── CLAIM ── */}
      <section className="relative z-10 py-16 px-5" data-testid="claim-section">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-7" style={{ letterSpacing: "-0.02em" }}>
            Claim your profile and create an account in minutes!
          </h2>
          <div className="flex gap-2 max-w-sm mx-auto">
            <div
              className="flex-1 rounded-full px-4 py-3 flex items-center gap-1.5"
              style={{ background: "#111", border: "1px solid #2a2a2a" }}
            >
              <span className="text-sm whitespace-nowrap" style={{ color: "#555" }}>guns.lol/</span>
              <input
                data-testid="input-username"
                type="text"
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="bg-transparent text-white text-sm outline-none flex-1 placeholder:text-gray-700"
              />
            </div>
            <button
              data-testid="button-claim-now"
              onClick={() => navigate(`/signup${username ? `?username=${encodeURIComponent(username)}` : ''}`)}
              className="text-white font-semibold py-3 px-5 rounded-full transition-all duration-200 hover:opacity-90 whitespace-nowrap text-sm"
              style={{ background: "#5b21b6" }}
            >
              Claim Now
            </button>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing-section" className="relative z-10 py-16 px-5" data-testid="pricing-section">
        <div className="max-w-xl mx-auto">
          <h2
            className="text-[2rem] sm:text-4xl font-bold text-white leading-tight text-center mb-10"
            style={{ letterSpacing: "-0.02em" }}
          >
            Explore our exclusive plans and join{" "}
            <span style={{ color: "#a78bfa" }}>47,000+</span> subscribers
          </h2>

          <div className="space-y-4">
            {/* Free Plan */}
            <div
              data-testid="pricing-card-free"
              className="rounded-3xl p-7"
              style={{ background: "#111", border: "1px solid #222" }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Free</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white">0€</span>
                <span className="text-sm ml-1" style={{ color: "#777" }}>/Lifetime</span>
              </div>
              <p className="text-sm mb-7" style={{ color: "#666" }}>For beginners, link all your socials in one place.</p>
              <div className="space-y-3 mb-7">
                {["Basic Customization", "Profile Analytics", "Basic Effects", "Add Your Socials"].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <Check size={15} style={{ color: "#7c3aed" }} className="flex-shrink-0" />
                    <span className="text-sm" style={{ color: "#bbb" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button
                data-testid="button-get-started-free"
                onClick={() => navigate("/signup")}
                className="w-full text-white font-semibold py-3 rounded-full transition-all duration-200 text-sm hover:opacity-90"
                style={{ background: "#5b21b6" }}
              >
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div
              data-testid="pricing-card-premium"
              className="relative rounded-3xl p-7 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #2d1b69 0%, #1a0b40 60%, #150930 100%)",
                border: "1px solid #4c1d9580"
              }}
            >
              {/* Most Popular chip */}
              <div className="absolute top-5 right-5">
                <span
                  className="text-white text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "#7c3aed" }}
                >
                  Most Popular
                </span>
              </div>

              {/* Watermark gem */}
              <div className="absolute opacity-[0.06] right-6 bottom-6">
                <Gem size={110} style={{ color: "#a78bfa" }} />
              </div>

              <div className="flex items-center gap-2.5 mb-4">
                <Gem size={18} style={{ color: "#a78bfa" }} />
                <h3 className="text-xl font-bold text-white">Premium</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="line-through text-base" style={{ color: "#6b5f8a" }}>7,99€</span>
                <span className="text-4xl font-bold text-white">6,79€</span>
                <span className="text-sm" style={{ color: "#9d7fc2" }}>/Lifetime</span>
              </div>
              <p className="text-sm mb-2" style={{ color: "#a78bfa" }}>Pay once. Keep it forever.</p>
              <p className="text-sm mb-6" style={{ color: "#9d7fc2" }}>
                The perfect plan to discover your creativity &amp; unlock more features.
              </p>
              <div className="space-y-3 mb-7">
                {[
                  "Exclusive Badge", "Profile Layouts", "Custom Fonts",
                  "Typewriter Animation", "Special Profile Effects",
                  "Advanced Customization", "Metadata & SEO Customization"
                ].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <Check size={15} style={{ color: "#a78bfa" }} className="flex-shrink-0" />
                    <span className="text-sm text-white">{f}</span>
                  </div>
                ))}
              </div>
              <button
                data-testid="button-learn-more-premium"
                onClick={() => navigate("/signup")}
                className="w-full text-white font-semibold py-3 rounded-full transition-all duration-200 text-sm hover:opacity-90"
                style={{ background: "#5b21b6" }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative z-10 py-12 px-5" data-testid="cta-section">
        <div className="max-w-xl mx-auto">
          <div
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #2d1b69 0%, #1a0b40 100%)", border: "1px solid #4c1d9540" }}
          >
            <div className="absolute opacity-[0.05] right-6 top-1/2 -translate-y-1/2">
              <GunSVG style={{ width: 160 }} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 leading-tight max-w-xs" style={{ letterSpacing: "-0.02em" }}>
              Everything you want, right here.
            </h2>
            <p className="text-sm mb-6 max-w-xs" style={{ color: "#9d7fc2" }}>
              Join over 1,680,000+ people using guns.lol and become part of our large community.
            </p>
            <div className="flex gap-2 max-w-xs">
              <div
                className="flex-1 rounded-full px-4 py-3 flex items-center gap-1.5"
                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span className="text-sm whitespace-nowrap" style={{ color: "#666" }}>guns.lol/</span>
                <input
                  ref={ctaUsernameRef}
                  data-testid="input-username-cta"
                  type="text"
                  placeholder="username"
                  className="bg-transparent text-white text-sm outline-none flex-1 placeholder:text-gray-700"
                />
              </div>
              <button
                data-testid="button-claim-now-cta"
                onClick={() => navigate(`/signup${ctaUsernameRef.current?.value ? `?username=${encodeURIComponent(ctaUsernameRef.current.value)}` : ''}`)}
                className="text-white font-semibold py-3 px-5 rounded-full transition-all duration-200 whitespace-nowrap text-sm hover:opacity-90"
                style={{ background: "#5b21b6" }}
              >
                Claim Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 py-12 px-5" data-testid="faq-section">
        <div className="max-w-xl mx-auto space-y-2">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-12 px-5 mt-4" style={{ borderTop: "1px solid #1a1a1a" }} data-testid="footer">
        <div className="max-w-xl mx-auto">
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
              <div className="space-y-2">
                {["Help Center", "Changelog", "Redeem Code", "Salad.com Product", "Hone.gg Partner"].map(item => (
                  <a key={item} href="#" data-testid={`link-resource-${item.toLowerCase().replace(/\s+/g, '-')}`} className="block text-sm transition-colors hover:text-gray-300" style={{ color: "#555" }}>{item}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
                  <div className="space-y-2">
                    {["Discord Server", "Support Email", "Business Email", "Legal Email"].map(item => (
                      <a key={item} href="#" data-testid={`link-contact-${item.toLowerCase().replace(/\s+/g, '-')}`} className="block text-sm transition-colors hover:text-gray-300" style={{ color: "#555" }}>{item}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
                  <div className="space-y-2">
                    {["Terms of Service", "Privacy Policy", "Copyright Policy"].map(item => (
                      <a key={item} href="#" data-testid={`link-legal-${item.toLowerCase().replace(/\s+/g, '-')}`} className="block text-sm transition-colors hover:text-gray-300" style={{ color: "#555" }}>{item}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "2rem" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GunIconSmall className="w-7 h-4 text-purple-500" />
                <span className="font-bold text-white text-base">guns.lol</span>
              </div>
              <div className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: "#111", border: "1px solid #222" }}>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs" style={{ color: "#888" }}>System Status</span>
              </div>
            </div>
            <p className="text-sm mb-5" style={{ color: "#444" }}>
              Create feature-rich, customizable and modern link-in-bio pages with guns.lol.
            </p>
            <div className="flex items-center gap-2 rounded-full px-4 py-2 w-fit cursor-pointer mb-8 transition-colors hover:bg-white/5" style={{ background: "#111", border: "1px solid #222" }}>
              <span className="text-sm">🇺🇸</span>
              <span className="text-sm" style={{ color: "#888" }}>English (US)</span>
              <ChevronDown size={13} style={{ color: "#555" }} className="ml-1" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs" style={{ color: "#333" }}>Copyright © 2026 guns.lol - All Rights Reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" data-testid="link-social-discord" className="transition-colors hover:text-white" style={{ color: "#444" }}><SiDiscord size={15} /></a>
                <a href="#" data-testid="link-social-tiktok" className="transition-colors hover:text-white" style={{ color: "#444" }}><SiTiktok size={15} /></a>
                <a href="#" data-testid="link-social-x" className="transition-colors hover:text-white" style={{ color: "#444" }}><SiX size={15} /></a>
                <a href="#" data-testid="link-social-telegram" className="transition-colors hover:text-white" style={{ color: "#444" }}><SiTelegram size={15} /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
